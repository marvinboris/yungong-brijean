import { ArrowDownOnSquareIcon, Cog8ToothIcon } from "@heroicons/react/24/outline"
import { FormEvent, useEffect, useState } from "react"

import { WithPages } from '.'

import { useContentContext } from "../../../../../app/contexts/content"
import { useAppDispatch, useAppSelector } from "../../../../../app/hooks"
import Status from "../../../../../app/types/enums/status"

import { selectAuth } from "../../../../../features/auth/authSlice"
import { get, patch, selectBackend } from "../../../../../features/backend/backendSlice"

import { Head } from "../../../navigation/layout"

import Button from "../../form/button"
import PageTitle from "../../title/page"

interface CmsPageProps {
    name: 'auth' | 'backend' | 'frontend'
}

export default function CmsPage({ name }: CmsPageProps) {
    const { content } = useContentContext()
    const { cms: { global: { app_name }, backend: { components: { form: { save } }, pages: { cms: { title, [name]: pageTitle, form } } } } } = content!

    const dispatch = useAppDispatch()
    const { role } = useAppSelector(selectAuth)
    const { status, data } = useAppSelector(selectBackend)

    const [params] = useState({
        role: role!,
        resource: 'cms',
    })

    useEffect(() => {
        if (status === Status.IDLE && !(data && data.cms)) {
            dispatch(get(params))
        }
    }, [data, dispatch, params, role, status])

    const submitHandler = (e: FormEvent) => {
        e.preventDefault();
        dispatch(patch({ ...params, id: name, data: e.target }));
    }

    let mainContent
    if (data && data.cms && data.cms[name]) {
        const _data = data.cms[name]
        const cmsValue = { ..._data.pages };
        Object.keys(_data).filter(key => key !== 'pages').forEach(key => cmsValue[key] = _data[key]);

        mainContent = <WithPages cmsExample={data.cmsExample[name]} cmsValue={cmsValue} part={name} />
    }

    return <>
        <Head link={`/${role}/cms/${name}`} title={`${title} | ${app_name}`} description='' />
        <main className='flex-1'>
            <PageTitle icon={Cog8ToothIcon} title={title} subtitle={pageTitle} />

            <div className="px-[33px] md:px-[42px] pt-[29px] md:pt-[47px] pb-[54px]">
                <div className="bg-white rounded-[30px] py-8 px-[38.36px] shadow-2xl mb-[25px]">
                    <div className="mb-[46.94px] flex flex-wrap md:flex-nowrap items-center justify-between">
                        <div className='order-2 md:order-1'>
                            <div className="font-bold md:font-medium mb-[4.63px] text-[25px] md:text-[22.21px]">{pageTitle}</div>

                            <div className="w-[30.24px] h-[6.5732px] rounded-xl bg-yellow" />
                        </div>

                        <div className="flex items-center order-1 md:order-2 ml-auto md:ml-0 mb-8 md:mb-0">
                        </div>
                    </div>

                    <form onSubmit={submitHandler}>
                        <div className="grid gap-y-2 gap-x-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 overflow-auto">
                            {mainContent}
                        </div>

                        <div className='mt-5'>
                            <Button pill icon={ArrowDownOnSquareIcon} color='green'>{save}</Button>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    </>
}