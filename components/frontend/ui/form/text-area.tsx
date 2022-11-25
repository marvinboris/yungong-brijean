import { InputHTMLAttributes, ReactNode } from 'react'
import { classNames } from '../../../../app/helpers/utils'

type InputProps = InputHTMLAttributes<HTMLTextAreaElement> & {
    inputSize?: 'sm' | 'lg'
    label?: ReactNode
}

export default function TextArea({ label, inputSize = 'lg', ...props }: InputProps) {
    return <div className={props.className}>
        {label && <label className='truncate block' htmlFor={props.id ? props.id : props.name}>{label}</label>}

        <div className={classNames(inputSize === 'sm' ? 'rounded-[24px]' : 'rounded-[30px]', "bg-secondary-100")}>
            <textarea {...props} className={classNames(inputSize === 'sm' ? 'text-sm min-h-[100px]' : 'text-lg min-h-[200px]', 'border-none text-lg bg-transparent outline-none text-inherit w-full p-5')} />
        </div>
    </div>
}