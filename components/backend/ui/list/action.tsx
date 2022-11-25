import { EyeIcon, LinkIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

import { useAppSelector } from "../../../../app/hooks";
import ApiAccountUserType from "../../../../app/types/api/account/user";

import { selectAuth } from "../../../../features/auth/authSlice";

import Delete from "./delete";

type ActionProps = {
    item: { _id?: string, link?: string } & any
    props: { delete: (_id: string) => void }
    resource: string
}

export default function Action({ item, resource, props }: ActionProps) {
    const { role, data } = useAppSelector(selectAuth)

    if (props) {
        resource = resource.split('_').join('-');

        let additionalContent;
        if (role === 'user') {
            const feature = (data as ApiAccountUserType).role.features.find(f => f.prefix === resource);

            additionalContent = <>
                {(feature && feature.access.includes('u')) && <Link href={`/${role}/${resource}/${item._id}/edit`} className="mx-1">
                    <PencilIcon className="text-sky w-5" />
                </Link>}
                {(feature && feature.access.includes('d')) && <span className="mx-1"><Delete deleteAction={() => props.delete(item._id!)}><TrashIcon className="w-5 text-red cursor-pointer" /></Delete></span>}
            </>;
        }
        else if (role === 'admin') additionalContent = <>
            <Link href={`/${role}/${resource}/${item._id}/edit`} className="mx-1">
                <PencilIcon className="text-sky w-5" />
            </Link>
            <span className="mx-1"><Delete deleteAction={() => props.delete(item._id!)}><TrashIcon className="w-5 text-red cursor-pointer" /></Delete></span>
        </>;

        return <div className="text-center flex items-center">
            {item.link && <a href={item.link} target="_blank" rel="noreferrer" className='mx-1'>
                <LinkIcon className="w-5 text-blue" />
            </a>}

            <Link href={`/${role}/${resource}/${item._id}`} className="mx-1">
                <EyeIcon className="text-green w-5" />
            </Link>

            {additionalContent}
        </div>
    }
    return null;
}