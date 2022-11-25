import React, { ComponentProps, ReactNode } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

import { classNames } from '../../../../app/helpers/utils'

interface NavItemProps {
    exact?: boolean
    href: string
    children: ReactNode
    icon?: (props: ComponentProps<'svg'>) => JSX.Element
}

export default function NavItem({ href, icon: Icon, exact, children }: NavItemProps) {
    const router = useRouter()
    const active = exact ? router.pathname === href : router.pathname.startsWith(href)

    const content = <>
        {Icon && <span className='mr-[6.65px]'><Icon className="w-4 opacity-30" /></span>}
        
        <span className={active ? 'relative mt-1 pb-1 before:absolute before:w-4 before:h-[2px] before:bg-secondary-800 dark:before:bg-white before:top-6' : ''}>{children}</span>
    </>

    return href.startsWith('#') ? <a href={href} className={classNames(active ? 'text-secondary-700 dark:text-secondary-200 font-bold' : 'text-secondary-400 hover:text-secondary-700 dark:text-secondary-500 dark:hover:text-secondary-200', "truncate inline-flex items-center transition-all duration-200")}>
        {content}
    </a> : <Link href={href} className={classNames(active ? 'text-secondary-700 dark:text-secondary-200 font-bold' : 'text-secondary-400 hover:text-secondary-700 dark:text-secondary-500 dark:hover:text-secondary-200', "truncate inline-flex items-center transition-all duration-200")}>
        {content}
    </Link>
}