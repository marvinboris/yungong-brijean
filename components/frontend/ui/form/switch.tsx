import { ReactNode } from 'react'
import { Switch as HSwitch } from '@headlessui/react'
import { classNames } from '../../../../app/helpers/utils'

type SwitchProps = {
    checked?: boolean
    className?: string
    id?: string
    label: ReactNode
    name?: string
    onChange: (props?: any) => void
}

export default function Switch({ checked, className, id, label, name, onChange }: SwitchProps) {
    return (
        <div className="flex">
            <div className="mr-[13px]">
                <HSwitch id={id} checked={checked} onChange={onChange} name={name} className={classNames(checked ? 'bg-primary' : 'bg-secondary-100', `relative inline-flex h-[24px] w-[46px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`, className || "")}>
                    <span className="sr-only">{label}</span>
                    <span aria-hidden="true" className={`${checked ? 'translate-x-[22px]' : 'translate-x-0'} pointer-events-none inline-block h-[20px] w-[20px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`} />
                </HSwitch>
            </div>

            <div className="text-xs md:w-1/2">{label}</div>
        </div>
    )
}
