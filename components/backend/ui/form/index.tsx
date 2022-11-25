import { ListBulletIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { ComponentProps, ReactNode } from "react";

import { classNames } from "../../../../app/helpers/utils";

import Button from "./button";

type FormProps = ComponentProps<'form'> & {
    title: ReactNode
    subtitle?: ReactNode
    list: string
    link: string
    icon: (props: ComponentProps<'svg'>) => JSX.Element
    disabled?: boolean
}

const Form = ({ onSubmit, icon: Icon, title, subtitle, className = '', children, style, id, list, link, disabled }: FormProps) => <div className={classNames()}>
    <div className="bg-white rounded-[30px] py-8 px-[38.36px] shadow-2xl mb-[25px]">
        <div className="mb-[46.94px] flex flex-wrap md:flex-nowrap items-center justify-between">
            <div className='order-2 md:order-1 space-y-[4.63px]'>
                <div className="font-bold md:font-medium text-[25px] md:text-[22.21px]">{title}</div>

                {subtitle && <div className="text-[12.96px]">{subtitle}</div>}

                <div className="w-[30.24px] h-[6.5732px] rounded-xl bg-yellow" />
            </div>

            <div className="flex items-center order-1 md:order-2 ml-auto md:ml-0 mb-8 md:mb-0">
                {list && <Link href={link}>
                    <Button icon={ListBulletIcon}><span className="hidden md:inline">{list}</span><Icon className="w-8 md:hidden inline-block" /></Button>
                </Link>}
            </div>
        </div>

        <div className={className} style={style}>
            {disabled ? <div id={id}>
                {children}
            </div> : <form onSubmit={onSubmit} id={id} encType="multipart/form-data">
                {children}
            </form>}
        </div>
    </div>
</div>;

export default Form;