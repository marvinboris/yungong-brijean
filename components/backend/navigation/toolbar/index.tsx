import { AdjustmentsHorizontalIcon, ArrowRightOnRectangleIcon, Bars3BottomLeftIcon, BellIcon, ChatBubbleOvalLeftEllipsisIcon, WalletIcon } from "@heroicons/react/24/outline"
import Image from "next/image"
import Link from "next/link"

import { useSideDrawerContext } from "../../../../app/contexts/sideDrawer"

import { useAppDispatch, useAppSelector } from "../../../../app/hooks"
import { logout, selectAuth } from "../../../../features/auth/authSlice"

import LanguageSelect from "./language-select"

export default function Toolbar() {
    const { open, setOpen } = useSideDrawerContext()

    const dispatch = useAppDispatch()
    const { role, data } = useAppSelector(selectAuth)

    const account = data!

    const handleLogout = () => dispatch(logout())

    return <header className="bg-white flex items-center sticky top-0 z-30">
        <div className="flex-1 flex items-center pl-[33px] pr-4 md:px-[42px]">
            <div className="cursor-pointer" onClick={() => setOpen(!open)}><Bars3BottomLeftIcon className='w-10 text-primary' /></div>

            <div className="flex ml-auto">
                <div className="mr-5 md:mr-[51.69px]"><LanguageSelect /></div>
                <div className="cursor-pointer relative z-0 group after:block after:absolute after:w-[12.72px] after:h-[12.72px] after:rounded-full after:bg-yellow after:top-0 after:right-0 mr-3">
                    <BellIcon className="w-[31px]" />

                    <div className="absolute scale-0 group-hover:scale-100 opacity-0 group-hover:opacity-100 pt-1 top-full right-0 origin-top-right transition-all duration-200">
                        <div className="bg-white shadow-sm rounded-[14px] p-3 text-xs truncate">
                            <div className="space-y-2.5">
                                <div className="flex cursor-pointer items-center space-x-1.5">
                                    <span><BellIcon className="w-3 text-yellow" /></span><span>You got a winning ticket</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="cursor-pointer relative z-0 after:block after:absolute after:w-[12.72px] after:h-[12.72px] after:rounded-full after:bg-yellow after:top-0 after:right-0"><ChatBubbleOvalLeftEllipsisIcon className="w-[31px]" /></div>
            </div>
        </div>

        <div className="md:w-[300px] md:border-l border-secondary-700/10 h-[111px] md:h-[86px] flex items-center justify-between md:pl-3 pr-9">
            <div className="hidden md:block">
                <div className="text-lg font-medium mb-1">{account.name}</div>
            </div>

            <div className="relative group">
                <Image width={1920} height={1920} src="/images/backend/user-pic-wrapper.svg" alt="User pic wrapper" className="w-16" />

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -ml-[1px] w-11 h-11 rounded-full overflow-hidden">
                    {account.photo && <Image width={1920} height={1920} src={account.photo} alt="User pic" className="absolute inset-0 scale-[2] image-cover" />}
                </div>

                <div className="absolute scale-0 group-hover:scale-100 opacity-0 group-hover:opacity-100 pt-1.5 top-full right-0 origin-top-right transition-all duration-200">
                    <div className="w-40 bg-white shadow-sm rounded-[14px] px-[7px] pt-[7px] pb-6 text-sm">
                        <div className="space-y-2.5 px-[13px]">
                            <Link href={`/${role}/settings`} className="flex cursor-pointer items-center space-x-[7px]">
                                <span><AdjustmentsHorizontalIcon className="w-4 opacity-20" /></span><span>Settings</span>
                            </Link>
                            <div onClick={handleLogout} className="flex cursor-pointer items-center space-x-[7px] text-red">
                                <span><ArrowRightOnRectangleIcon className="w-4" /></span><span className="font-bold">Logout</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>
}