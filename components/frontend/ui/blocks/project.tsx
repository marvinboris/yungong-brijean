import { ArrowTopRightOnSquareIcon, EyeIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

import { useContentContext } from "../../../../app/contexts/content";
import { ProjectInterface } from "../../../../app/models/project";

export default function ProjectBlock({ description, link, name, photo }: ProjectInterface) {
    const { content } = useContentContext()
    const { cms: { frontend: { components: { project_block: { more, view } } } } } = content!

    return <div>
        <div className="aspect-[6/5] relative w-full group">
            <Image width={375} height={375} src={photo!} alt={name} className="image-cover rounded-[2px]" />
            <div className="absolute opacity-0 group-hover:opacity-100 inset-0 transition-all duration-200 bg-black/40 flex items-center justify-center">
                <button className="rounded-sm bg-black/[0.36] backdrop-filter backdrop-blur-sm h-[49px] text-sm inline-flex items-center px-[22px] space-x-2 text-white font-medium">
                    <div>{view}</div><EyeIcon className="w-5" />
                </button>
            </div>
        </div>

        <div className="py-3 space-x-3.5 flex items-center">
            <span className="font-bold font-body text-[25px]">{name}</span>
        </div>

        <p className="text-sm mb-6">{description}</p>

        <a href={link} target="_blank" className="font-semibold overflow-hidden inline-block after:h-[2px] after:bg-secondary-600 dark:after:bg-white after:block after:relative after:-left-[34px] after:-top-1" rel="noreferrer">
            {more}{' '}
            <ArrowTopRightOnSquareIcon className="w-4 inline-block text-secondary-500 dark:text-secondary-600" />
        </a>
    </div>
}