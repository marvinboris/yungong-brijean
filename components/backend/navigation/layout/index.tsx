import { ReactNode, useEffect, useState } from 'react'
import NextHead from 'next/head'
import { useRouter } from 'next/router'

import SideDrawerContext from '../../../../app/contexts/sideDrawer'
import { useAppSelector } from '../../../../app/hooks'
import { selectAuth } from '../../../../features/auth/authSlice'

import Footer from '../footer'
import Toolbar from '../toolbar'

import SideDrawer from './side-drawer'

interface LayoutProps {
    children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
    const router = useRouter()
    const [open, setOpen] = useState(false)
    const { token } = useAppSelector(selectAuth)

    useEffect(() => {
        const isAuth = localStorage.getItem('token') !== null
        if ((!token && isAuth) || !isAuth) router.push('/')
    }, [token, router])

    return token ? <SideDrawerContext.Provider value={{ open, setOpen }}>
        <div className='h-screen flex relative overflow-hidden font-body'>
            <SideDrawer />

            <div className='flex-1 h-screen flex flex-col bg-secondary-100 overflow-y-auto'>
                <Toolbar />
                <div className="relative flex flex-col flex-1">
                    {children}
                </div>
                <Footer />
            </div>
        </div>
    </SideDrawerContext.Provider> : <></>
}

export interface PageParams {
    link: string
    title: string
    description: string
}

export const Head = ({ link, title, description }: PageParams) => <NextHead>
    <title>{title}</title>
    <meta name="description" content={description} />
    <link rel="canonical" href={link} />

    <meta property='og:title' content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:url" content={link} />

    <meta property='twitter:title' content={title} />
    <meta property="twitter:description" content={description} />
</NextHead>