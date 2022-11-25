import { EyeIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

import View from "../../../ui/view";

type PhotoProps = {
    photo?: string
    see: string
    title: string
}

export default function Photo({ photo, see, title }: PhotoProps) {
    return photo ? <div className="flex items-center space-x-2">
        <span>{see}</span>

        <span className="ml-auto">
            <View action={<EyeIcon className="w-5 text-green cursor-pointer" />}>
                <Image width={1920} height={1920} src={photo} className="w-full" alt={title} />
            </View>
        </span>
    </div> : <></>;
}