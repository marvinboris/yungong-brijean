import { ArrowDownOnSquareIcon, Cog8ToothIcon } from '@heroicons/react/24/outline'
import { ChangeEvent, FormEvent, ReactElement, useEffect, useState } from 'react'

import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { useContentContext } from '../../../app/contexts/content'
import ContentType from '../../../app/types/content'
import Status from '../../../app/types/enums/status'

import Layout, { Head } from '../../../components/backend/navigation/layout'
import Button from '../../../components/backend/ui/form/button'
import PageTitle from '../../../components/backend/ui/title/page'
import Input from '../../../components/frontend/ui/form/input'

import { selectAuth } from '../../../features/auth/authSlice'
import { get, patch, selectBackend } from '../../../features/backend/backendSlice'

import { NextPageWithLayout } from '../../_app'

const Separator = ({ sm }: { sm?: boolean }) => <div className={`md:col-span-2 xl:col-span-3 mb-${sm ? 2 : 3}`} />

const ManagerCmsGeneralPage: NextPageWithLayout = () => {
    const { content } = useContentContext()
    const { cms: { global: { app_name }, backend: { components: { form: { save } }, pages: { cms: { title, general, form } } } } } = content!

    const dispatch = useAppDispatch()
    const { role } = useAppSelector(selectAuth)
    const { status, data } = useAppSelector(selectBackend)

    const [value, setValue] = useState<any>(content!.cms.general)

    const [params] = useState({
        role: role!,
        resource: 'cms',
    })

    useEffect(() => {
        if (status === Status.IDLE && !(data && data.cms)) {
            dispatch(get(params))
        }
    }, [data, dispatch, params, role, status])

    useEffect(() => {
        if (data && data.cms && data.cms.general) setValue({ ...data.cms.general })
    }, [data])

    const onChange = (e: ChangeEvent<HTMLInputElement>, ...deepness: (string | number)[]) => {
        const valueCopy: any = { ...value };

        if (deepness.length === 1) {
            valueCopy[deepness[0]] = e.target.value;
            return setValue(valueCopy);
        }

        const subValues = [];
        let subValue: any = { ...value };
        for (let i = 0; i < deepness.length - 1; i++) {
            const element = deepness[i];
            subValue = subValue[element];
            subValues.push(subValue);
        }
        subValues[subValues.length - 1][deepness[deepness.length - 1]] = e.target.value;
        for (let i = 1; i < deepness.length - 1; i++) {
            const element = deepness[deepness.length - 1 - i];
            const index = subValues.length - 1 - i;
            subValues[index][element] = subValues[index + 1];
        }
        valueCopy[deepness[0]] = subValues[0];

        setValue(valueCopy);
    }

    const prefix = `general`;
    const prefixId = `general`;
    const global = ['Date', 'Time', 'Home'].map(item => <Input inputSize='sm' key={Math.random()} type="text" id={`${prefixId}-${item.toLowerCase()}`} name={`${prefix}[${item.toLowerCase()}]`} label={item} onChange={e => onChange(e, item.toLowerCase())} value={value[item.toLowerCase()]} />);
    const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map((item, index) => <Input inputSize='sm' key={Math.random()} type="text" id={`${prefixId}-date-${index}`} name={`${prefix}[days][]`} label={item} onChange={e => onChange(e, 'days', index)} value={value.days[index]} />);
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map((item, index) => <Input inputSize='sm' key={Math.random()} type="text" id={`${prefixId}-months-${index}`} name={`${prefix}[months][]`} label={item} onChange={e => onChange(e, 'months', index)} value={value.months[index]} />);

    const submitHandler = (e: FormEvent) => {
        e.preventDefault();
        dispatch(patch({ ...params, id: 'general', data: e.target }));
    }

    return <>
        <Head link={`/${role}/cms/general`} title={`${title} | ${app_name}`} description='' />
        <main className='flex-1'>
            <PageTitle icon={Cog8ToothIcon} title={title} subtitle={general} />

            <div className="px-[33px] md:px-[42px] pt-[29px] md:pt-[47px] pb-[54px]">
                <div className="bg-white rounded-[30px] py-8 px-[38.36px] shadow-2xl mb-[25px]">
                    <div className="mb-[46.94px] flex flex-wrap md:flex-nowrap items-center justify-between">
                        <div className='order-2 md:order-1'>
                            <div className="font-bold md:font-medium mb-[4.63px] text-[25px] md:text-[22.21px]">{general}</div>

                            <div className="w-[30.24px] h-[6.5732px] rounded-xl bg-yellow" />
                        </div>

                        <div className="flex items-center order-1 md:order-2 ml-auto md:ml-0 mb-8 md:mb-0">
                        </div>
                    </div>

                    <form onSubmit={submitHandler}>
                        <div className="grid gap-y-2 gap-x-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 overflow-auto">
                            {global}
                            <Separator />

                            <div className='md:col-span-2 xl:col-span-3'>
                                <h4 className='font-bold'>Week days</h4>
                            </div>
                            <Separator sm />
                            {weekDays}
                            <Separator />

                            <div className='md:col-span-2 xl:col-span-3'>
                                <h4 className='font-bold'>Months</h4>
                            </div>
                            <Separator sm />
                            {months}
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

ManagerCmsGeneralPage.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>
}

export default ManagerCmsGeneralPage