import NextHead from 'next/head'
import Image from 'next/image'
import { ReactNode } from 'react'

import Toolbar from './toolbar'

interface LayoutProps {
    children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
    return <div className='min-h-screen flex flex-col relative z-0'>
        <Image fill src='/images/bg-dark.svg' alt="BG dark" className="opacity-0 dark:opacity-100 bg-dark img-cover absolute inset-0 -z-10 transition-all duration-200" />

        <Toolbar />

        <div className="main-wrapper">
            {children}
        </div>
    </div>
}

interface PageParams {
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