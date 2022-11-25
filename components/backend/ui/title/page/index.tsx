import { ComponentProps, ReactNode, useEffect, useState } from 'react'

interface PageTitleProps {
    title: ReactNode
    subtitle: ReactNode
    animated?: boolean
    animationSubtitle?: ReactNode
    icon: (props: ComponentProps<'svg'>) => JSX.Element
}

export default function PageTitle({ title, subtitle: defaultSubtitle, animated, animationSubtitle, icon: Icon }: PageTitleProps) {
    const [hightlighted, setHightlighted] = useState(animated)
    const subtitle = (hightlighted && animationSubtitle) ? animationSubtitle : defaultSubtitle

    useEffect(() => {
        if (animated) setTimeout(() => {
            setHightlighted(false)
        }, 5000);
    }, [animated])

    return <div className="relative z-0 bg-white pt-[11px] pb-[14px] pl-[30px] pr-[85px] md:px-[33px] flex md:items-center space-x-[11px] md:space-x-[14px] before:absolute before:inset-y-0 before:left-0 before:w-[9px] after:absolute after:inset-0 after:-z-10 transition-all duration-200 before:bg-yellow after:bg-yellow/[0.07]">
        <div>
            <Icon className='w-[56px] md:w-[34px] transition-all duration-200 text-yellow' />
        </div>

        <div>
            <div className="text-lg font-medium font-display">{title}</div>
            <div className='transition-all duration-200 text-yellow'>{subtitle}</div>
        </div>
    </div>
}