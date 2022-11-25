import React, { type ReactNode } from 'react'

import { classNames } from '../../../../app/helpers/utils'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    color?: string
    size?: '' | 'sm' | 'lg' | 'xl'
    justify?: 'start' | 'center'
    pill?: boolean
    icon?: (props: React.ComponentProps<'svg'>) => JSX.Element
    children: ReactNode,
    onClick?: () => void
}

export default function Button({ color = 'primary', size = '', justify = 'start', pill, icon: Icon, children, onClick, ...rest }: ButtonProps) {
    return <button {...rest} onClick={onClick} className={classNames(size === 'sm' ? 'h-9' : 'h-12', justify === 'center' ? 'center' : 'pr-9', `inline-flex truncate items-center text-sm focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 transition-all duration-200 justify-start px-[15px] group`, pill ? "rounded-[300px]" : "rounded-lg",
        color === 'green' ? 'text-white hover:text-secondary-100 bg-green active:text-green/10 focus-visible:outline-green' :
            color === 'night' ? 'text-white hover:text-secondary-100 bg-night active:text-night/10 focus-visible:outline-night' :
                color === 'red' ? 'text-white hover:text-secondary-100 bg-red active:text-red/10 focus-visible:outline-red' :
                    color === 'yellow' ? 'text-white hover:text-secondary-100 bg-yellow active:text-yellow/10 focus-visible:outline-yellow' :
                        color === 'white' ? 'focus-visible:outline-white' : 'text-white hover:text-secondary-100 bg-primary active:text-primary/10 focus-visible:outline-primary', rest.className!)}>
        {Icon && <Icon className={classNames(color === 'white' ? "text-green/40 group-hover:text-green" : "text-white/40 group-hover:text-white", 'w-5 mr-[14px] transition-all duration-200')} />}
        <span className={size === 'sm' ? '' : 'font-medium'}>{children}</span>
    </button>
}