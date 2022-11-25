import { ChatBubbleOvalLeftEllipsisIcon, WrenchIcon, HomeIcon, PhotoIcon, UserGroupIcon } from '@heroicons/react/24/outline'
import { ReactElement, ReactNode, useEffect } from 'react'
import { useContentContext } from '../../app/contexts/content'

import { classNames } from '../../app/helpers/utils'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import Status from '../../app/types/enums/status'

import Layout, { Head } from '../../components/backend/navigation/layout'
import PageTitle from '../../components/backend/ui/title/page'
import Alert from '../../components/frontend/ui/alert'

import { selectAuth } from '../../features/auth/authSlice'
import { dashboard, selectBackend } from '../../features/backend/backendSlice'

import { NextPageWithLayout } from '../_app'

interface StatCardProps {
    color: 'sky' | 'blue' | 'yellow' | 'orange'
    title: string
    children: ReactNode
}

const StatCard = ({ color, title, children }: StatCardProps) => <div className={classNames(color === 'blue' ? "bg-blue/[.15]" : color === 'sky' ? "bg-sky/[.15]" : color === 'orange' ? 'bg-orange/20' : "bg-yellow text-white", 'flex font-display flex-col rounded-[25px] md:rounded-[12.625px] h-[156.88px] md:h-[100.92px] py-[23px] md:py-[13.25px] pl-[26px] md:pl-[20.18px] pr-[22px] md:pr-[10.72px] relative z-0')}>
    <div className="text-lg md:text-sm font-medium">{title}</div>

    <div className='pt-[14px] md:pt-[8.6px]'>
        <div className={classNames(color === 'yellow' ? 'bg-white/30' : 'bg-secondary-500/10', "block h-[3.15385px] w-[55px] md:w-[17px] rounded-xl")} />
    </div>

    <div>{children}</div>
</div>

const ManagerDashboardPage: NextPageWithLayout = () => {
    const dispatch = useAppDispatch()

    const { role } = useAppSelector(selectAuth)
    const { status, data, message } = useAppSelector(selectBackend)

    const { content } = useContentContext()

    useEffect(() => {
        if (status === Status.IDLE && !(data && data.blocks)) dispatch(dashboard(role!))
    }, [data, dispatch, role, status])

    const { cms: { global: { app_name }, backend: { pages: { dashboard: { [role as 'admin' | 'user']: { title, subtitle, blocks } } } } } } = content!

    return <>
        <Head link={`/${role}/dashboard`} title={`${title} | ${app_name}`} description={`${app_name}: Votre tableau de bord personnel.`} />
        <main className='flex-1'>
            <PageTitle icon={HomeIcon} title={title} subtitle={subtitle} />

            <div className="px-[33px] xl:px-[42px] pt-[29px] xl:pt-[47px] pb-[54px]">
                {message && <Alert color={message.type} className='mb-4'>{message.content}</Alert>}
                <div className="grid gap-2.5 md:grid-cols-2 xl:grid-cols-4 mb-[51px] lg:mb-[35.08px]">
                    <StatCard color='orange' title={blocks.users}>
                        <div className="flex items-end justify-between">
                            <div className='pb-[7px] md:pb-[5px]'>
                                <span className="font-bold text-3xl md:text-lg">{data && data.blocks && data.blocks.users}</span>
                            </div>

                            <div><UserGroupIcon className='w-20 md:w-11 text-orange/20' /></div>
                        </div>
                    </StatCard>

                    <StatCard color='blue' title={blocks.projects}>
                        <div className="flex items-end justify-between">
                            <div className='pb-[7px] md:pb-[5px]'>
                                <span className="font-bold text-3xl md:text-lg">{data && data.blocks && data.blocks.projects}</span>
                            </div>

                            <div><WrenchIcon className='w-20 md:w-11 text-blue/20' /></div>
                        </div>
                    </StatCard>
                </div>
            </div>
        </main>
    </>
}

ManagerDashboardPage.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>
}

export default ManagerDashboardPage