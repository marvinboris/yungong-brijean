interface SectionTitleProps {
    title: string
    description: string
    icon?: (props: React.ComponentProps<'svg'>) => JSX.Element
    children?: React.ReactNode
}

export default function SectionTitle({ title, description, icon: Icon, children }: SectionTitleProps) {
    return <div className="md:pl-8 md:pr-2.5 min-h-[69px] md:bg-white rounded-[15px] md:flex items-center justify-between mb-[44px] md:mb-[27px]">
        <div className='md:flex items-center mb-9 md:mb-0'>
            {Icon && <div className='hidden md:block'><Icon className='w-7 text-primary' /></div>}
            <div className='hidden md:block ml-[11px] mr-[19px]'><div className="w-[6px] h-[6px] rounded-full bg-primary" /></div>
            <div className="text-[25px] md:text-lg font-bold md:font-medium">{title}</div>
            <div className="md:hidden text-sm">{description}</div>
        </div>

        {children}
    </div>
}