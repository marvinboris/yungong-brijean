import { ComponentProps } from "react";

import { classNames } from "../../../../app/helpers/utils";

export default function SectionBlock(props: ComponentProps<'section'>) {
    return <section {...props} className={classNames("py-12", props.className || '')} />
}