import { ReactNode, useEffect } from 'react'
import NextHead from 'next/head'
import Link from 'next/link'

import Logo from '../../ui/logo'
import { useRouter } from 'next/router'
import { useAppSelector } from '../../../app/hooks'
import { selectAuth } from '../../../features/auth/authSlice'

interface LayoutProps {
    children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
    const router = useRouter()
    const { token, role } = useAppSelector(selectAuth)

    useEffect(() => {
        if (token) router.push(`/${role}/dashboard`)
    }, [token, router, role])

    return !token ? <div className="overflow-hidden bg-grid-primary/[0.05] relative z-0">
        <div className='bg-gradient-to-t from-primary/50 to-transparent absolute inset-0 -z-10' />

        <div className="container flex flex-col min-h-screen">
            <header className='pt-5'>
                <Link href='/'><Logo /></Link>
            </header>

            <div className="flex-1 flex flex-col justify-center items-center">
                <div className="max-w-4xl w-full relative rounded-[40.8836px] bg-white shadow-lg text-secondary-700 pt-[44px] md:pt-[51px] pb-[50px] md:pb-[66px]">
                    {children}
                </div>
            </div>
        </div>
    </div> : <></>
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