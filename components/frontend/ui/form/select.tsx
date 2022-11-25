import { ComponentProps, ReactNode } from "react";
import { classNames } from "../../../../app/helpers/utils";

type SelectProps = ComponentProps<'select'> & {
    inputSize?: 'sm' | 'lg'
    icon?: (props: React.ComponentProps<'svg'>) => JSX.Element
    label?: ReactNode
    addon?: ReactNode
    append?: ReactNode
}

export default function Select({ icon: Icon, label, addon, append, inputSize = 'lg', className, ...props }: SelectProps) {
    return <div className={className}>
        {label && <label htmlFor={props.id ? props.id : props.name}>{label}</label>}

        <div className={classNames(inputSize === 'sm' ? "h-12" : "h-[77px]", "rounded-[18px] relative bg-secondary-100 flex items-center")}>
            <div>
                {Icon && <div className={classNames(inputSize === 'sm' ? "w-12" : "w-12 md:w-[84px]", "flex relative z-10 justify-center")}>
                    {<Icon className={classNames(inputSize === 'sm' ? "w-4 text-secondary-600" : 'w-6 text-secondary-600 md:text-secondary-600/20')} />}
                    {inputSize === 'sm' && <div className='rounded-full w-1 h-1 bg-secondary-700/20 absolute right-1.5 top-1/2 -translate-y-1/2' />}
                </div>}
                {addon && <div className='relative z-20 min-w-[48px] md:min-w-[64px] text-center flex items-center justify-center'>{addon}</div>}
            </div>

            <div className={classNames(inputSize === 'sm' ? Icon || addon ? 'pr-5' : 'px-5' : Icon || addon ? 'pr-8' : 'px-8', 'flex-1 relative z-0')}>
                <select {...props} className={classNames(inputSize === 'sm' ? 'text-sm' : 'text-lg', 'min-h-[48px] pr-9 border-none bg-transparent outline-none text-inherit w-full placeholder:opacity-30')} />
            </div>

            {append && <div className='pr-4'>{append}</div>}
        </div>
    </div>
}