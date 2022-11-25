import { ComponentProps, ReactNode } from "react"
import { classNames } from "../../../../app/helpers/utils"

type SectionTitleProps = ComponentProps<'div'> & {
    head?: ReactNode
    title: ReactNode
    centered?: boolean
    white?: boolean
}

export default function SectionTitle({ head, title, centered, white }: SectionTitleProps) {
    return <div className={classNames(centered ? "text-center max-w-md mx-auto" : "", "mb-5")}>
        {head && <div className="font-semibold mb-1 text-yellow">{head}</div>}

        <h2 className={classNames(white ? 'text-white' : 'text-primary', 'text-3xl sm:text-4xl font-extrabold tracking-tight')}>
            {title}
        </h2>
    </div>
}