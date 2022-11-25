import { Popover, Transition } from '@headlessui/react'
import { Bars3BottomRightIcon, HomeIcon, IdentificationIcon, MoonIcon, PhoneIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ComponentProps, Fragment } from 'react'

import { useContentContext } from '../../../../app/contexts/content'
import { useThemeContext } from '../../../../app/contexts/theme'
import Theme from '../../../../app/types/enums/theme'

import NavItem from './nav-item'

const RenderMobileNavItem = (item: { name: string, href: string, icon: (props: ComponentProps<'svg'>) => JSX.Element }, close: () => void) => {
    const router = useRouter()

    const content = <>
        <item.icon className="h-6 w-6 flex-shrink-0 text-primary" aria-hidden="true" />
        <span className="ml-3 text-base font-medium text-secondary-900 dark:text-white">{item.name}</span>
    </>

    return item.href.startsWith('#') && router.pathname === '/' ? <a key={item.name} href={item.href} onClick={close} className="-m-3 flex items-center rounded-md p-3 hover:bg-secondary-50 dark:hover:bg-secondary-800">
        {content}
    </a> : <Link key={item.name} href={item.href.startsWith('#') ? `/${item.href}` : item.href} onClick={close} className="-m-3 flex items-center rounded-md p-3 hover:bg-secondary-50 dark:hover:bg-secondary-800">
        {content}
    </Link>
}

export default function Toolbar() {
    const { content } = useContentContext()
    const { theme, setTheme } = useThemeContext()

    const { cms: { global: { app_name }, frontend: { header: { menu }, pages: { home: { description } } } } } = content!

    const mobileNavItems = [
        { name: menu.about, href: '/about', icon: IdentificationIcon },
        { name: menu.contact, href: '/contact', icon: PhoneIcon },
    ]

    const toggleDark = () => {
        const dark = localStorage.getItem('dark');
        if (dark) {
            setTheme(Theme.LIGHT)
            localStorage.removeItem('dark');
        } else {
            setTheme(Theme.DARK)
            localStorage.setItem('dark', 'enabled');
        }
    }

    return (
        <Popover className="w-full">
            {({ close }) => <>
                <div className="container">
                    <div className="flex pt-[41px] h-[164px]">
                        <div className="pt-[9px] space-y-[13px]">
                            <div className='text-[50px] font-display'>{app_name}</div>
                            <div className="max-w-[415px] font-body">{description}</div>
                        </div>

                        <div className='ml-auto flex items-center relative'>
                            <div className="flex items-center">
                                <Popover.Group as="nav" className="hidden space-x-5 lg:space-x-4 lg:flex">
                                    <NavItem href="/" icon={HomeIcon}>{menu.home}</NavItem>
                                    <NavItem href="/about">{menu.about}</NavItem>
                                    <NavItem href="/contact">{menu.contact}</NavItem>
                                </Popover.Group>
                            </div>

                            <div className="pl-1 ml-4">
                                <button onClick={toggleDark} className="h-[44px] rounded-full ring-[1px] ring-offset-2 ring-offset-white dark:ring-offset-secondary-800 ring-secondary-700/30 bg-secondary-700 dark:bg-white/10 py-[5px] space-x-[7px] pr-4 pl-[7px] inline-flex items-center">
                                    <div className="flex-none h-[34px] w-[34px] flex items-center justify-center rounded-full bg-white/10 dark:bg-white text-white dark:text-orange"><MoonIcon className='w-4' /></div>
                                    <div className='font-semibold text-sm text-secondary-300'>{theme === Theme.LIGHT ? "Dark" : "Light"} Mode</div>
                                </button>
                            </div>

                            <div className="lg:hidden ml-auto">
                                <Popover.Button className="flex h-10 items-center justify-center rounded-md p-2 text-primary bg-primary/10 -m-2 focus:outline-none">
                                    <span className="sr-only">Ouvrir le menu</span>
                                    <Bars3BottomRightIcon className="w-6" aria-hidden="true" />
                                </Popover.Button>
                            </div>
                        </div>
                    </div>
                </div>

                <Popover.Overlay className="md:hidden fixed top-0 inset-x-0 h-screen z-40 bg-black/20 dark:bg-secondary-900/80 backdrop-filter backdrop-blur-sm" />
                <Transition as={Fragment} enter="duration-200 ease-out" enterFrom="opacity-0" enterTo="opacity-100" leave="duration-200 ease-in" leaveFrom="opacity-100" leaveTo="opacity-0">
                    <Popover.Panel focus className="fixed inset-x-0 top-0 z-50 md:hidden">
                        <div className="absolute top-0 left-0 w-full pt-4">
                            <div className="container flex justify-end">
                                <Popover.Button className="flex h-10 items-center justify-center rounded-md p-2 -mr-2 focus:outline-none">
                                    <span className="sr-only">Fermer le menu</span>
                                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                </Popover.Button>
                            </div>
                        </div>

                        <div className="mt-[72px] container">
                            <div className="divide-y-2 divide-secondary-50 dark:divide-secondary-200/10 rounded-lg bg-white dark:bg-secondary-800 shadow-lg ring-1 ring-black/5 dark:ring-white/5">
                                <div className="px-5 py-8">
                                    <nav className="grid gap-y-8">
                                        {mobileNavItems.map(item => RenderMobileNavItem(item, close))}
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </Popover.Panel>
                </Transition>
            </>}
        </Popover>
    )
}
