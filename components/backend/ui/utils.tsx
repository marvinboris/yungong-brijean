import { NextRouter, useRouter } from 'next/router';
import React, { ChangeEvent, ComponentProps, FormEvent, ReactNode } from 'react';

import { classNames } from '../../../app/helpers/utils';
import { useAppSelector } from '../../../app/hooks';

import ManagerResourceManageStateType from '../../../app/types/account/manager/add-or-edit/state';
import ApiAccountUserType from '../../../app/types/api/account/user';
import ApiBackendDataType from '../../../app/types/api/backend/data';
import ContentType from '../../../app/types/content';
import Status from '../../../app/types/enums/status';
import ResourceType from '../../../app/types/resource';

import { selectAuth } from '../../../features/auth/authSlice';
import { BackendState } from '../../../features/backend/backendSlice';

import Alert from '../../frontend/ui/alert';
import Loading from '../../ui/preloaders/loading';

import Form from './form';
import List from './list';

const readURL = (input: EventTarget & HTMLInputElement, setState: SetStateType) => {
    if (input.files && input.files[0]) {
        const file = input.files[0];
        const reader = new FileReader();

        reader.onload = function (e) {
            // const embed = document.getElementById(`embed-${input.name}`)! as HTMLImageElement
            // embed.src = e.target!.result as string;
            setState(state => ({ ...state, [input.name]: e.target!.result as string }))
            // embed.querySelector(".file-selected")!.innerHTML = file.name;
        }

        reader.readAsDataURL(file); // convert to base64 string
    }
};

type PropsType = {
    auth: { role: string }
    backend: BackendState
    content: ContentType
    edit?: boolean
    id?: string
    history?: NextRouter

    get?: (page?: number, show?: number | string, search?: string) => void
    info?: () => void
    show?: (id: string) => void
    patch?: (id: string, target: EventTarget) => void
    post?: (target: EventTarget) => void
    reset: () => void
}

type SetStateType = (state: ManagerResourceManageStateType | ((state: ManagerResourceManageStateType) => ManagerResourceManageStateType), cb?: () => void) => void

type AddRenderProps = {
    className?: string
    props: PropsType
    icon: (props: ComponentProps<'svg'>) => JSX.Element
    isMounted: boolean
    resource: ResourceType
    children?: ReactNode
}

type IndexRenderProps = {
    className?: string
    props: PropsType
    icon: (props: ComponentProps<'svg'>) => JSX.Element
    isMounted: boolean
    resource: ResourceType
    data: ApiBackendDataType[]
    fields: { key: string, name: string, className?: string, fixed?: boolean }[]
}

const saveHandler = (props: PropsType) => (e: FormEvent) => {
    e.preventDefault();
    if (props.edit) props.patch!(props.id!, e.target);
    else props.post!(e.target);
};

const Redirection = ({ props, resource }: { props: PropsType, resource: ResourceType }) => {
    const router = useRouter()
    const { role, data } = useAppSelector(selectAuth)

    if (role === 'user') {
        const feature = (data as ApiAccountUserType).role.features.find(f => f.prefix === resource.split('_').join('-'));
        if (!(feature && feature.access.includes(props.edit ? 'u' : 'c'))) router.push('/user/dashboard')
        return <></>;
    }

    return <></>;
};

export const add = {
    component: {
        saveAddHandler: (setState: SetStateType, props: PropsType) => () => setState((state) => ({ ...state, add: true }), () => props.post!(document.querySelector('form')!)),
        inputChangeHandler: (setState: SetStateType) => (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
            e.persist()
            const { type, name, value } = e.target;
            if (type === 'file') readURL(e.target as HTMLInputElement, setState);
            else setState(state => ({ ...state, [name]: value }));
        },
        fileUpload: (id: string) => document.getElementById(id)!.click(),
    },
    lifecycle: {
        componentDidMount: (props: PropsType, setIsMounted: (isMounted: boolean) => void) => {
            props.reset();
            if (props.edit) props.show!(props.id!);
            else if (props.info) props.info();
            setIsMounted(true)
        },
        componentDidUpdate: (resource: ResourceType, singular: string) => (props: PropsType, state: ManagerResourceManageStateType, setState: SetStateType, resetState: () => void) => {
            if (props.backend.message && props.backend.message.type === 'success' && !props.edit) {
                if (state.add) resetState();
                else {
                    const pathname = `/${props.auth.role}/${resource.split('_').join('-')}`
                    props.history?.push({
                        pathname,
                        query: { ...props.backend.message }
                    }, pathname).then(() => props.reset());
                }
            }
            if (props.backend.data && props.backend.data[singular] || (props.edit && props.backend.message && props.backend.message.type === 'success')) {
                const { backend: { data: { [singular]: item } } } = props;
                setState(state => ({ ...state, ...item }));
            }
        },
        render: ({ className, props, icon, isMounted, resource, children }: AddRenderProps) => {
            const {
                content: {
                    cms: {
                        backend: { pages: { [resource]: cms } }
                    }
                },
                backend: { status, data: backend, message },
                auth: { role }
            } = props;

            const loading = status === Status.LOADING

            let content
            if (backend) {
                content = <div className="px-[33px] md:px-[42px] pt-[29px] md:pt-[47px] pb-[54px]">
                    <Redirection props={props} resource={resource} />
                    {message && <Alert className="mb-4" color={message.type}>{message.content}</Alert>}
                    <Form onSubmit={saveHandler(props)} icon={icon} title={props.edit ? cms.edit : cms.add} list={cms.index} link={`/${role}/${resource.split('_').join('-')}`}>
                        {children}
                    </Form>
                </div>
            }

            return <div className={className}>
                <Loading loading={isMounted && loading} isAuthenticated>
                    {content}
                </Loading>
            </div>
        }
    }
};

export const index = {
    lifecycle: {
        render: ({ className, props, icon, isMounted, resource, data, fields }: IndexRenderProps) => {
            const {
                content: {
                    cms: {
                        backend: { pages: { [resource]: cms } }
                    }
                },
                backend: { status, data: backend, message },
                auth: { role }
            } = props;

            const loading = status === Status.LOADING

            let content
            if (backend) {
                const { [resource]: items = [], total } = backend
                content = <div className="px-[33px] md:px-[42px] pt-[29px] md:pt-[47px] pb-[54px]">
                    {!message && props.history && props.history.query && props.history.query.type && <Alert className="mb-4" color={props.history.query.type as "info" | "danger" | "success" | "warning"}>{props.history.query.content as string}</Alert>}
                    {message && <Alert className="mb-4" color={message.type}>{message.content}</Alert>}
                    <List icon={icon} array={data} loading={loading} data={JSON.stringify(items)} get={props.get!} total={total} add={cms.add} link={`/${role}/${resource.split('_').join('-')}/add`} title={cms.index} fields={fields} />
                </div>
            }

            return <div className={classNames('relative flex-1', className || '')}>
                <Loading loading={isMounted && loading} isAuthenticated>
                    {content}
                </Loading>
            </div>;
        }
    }
}