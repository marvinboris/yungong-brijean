import Image, { ImageProps } from "next/image";

export default function Logo({ ...props }: Omit<ImageProps, "height" | "src" | "alt">) {
    return <Image height={500} width={500} {...props} src="/images/logo.png" alt="Logo" className="h-7 md:h-10 w-auto" />
    // return <span className="text-primary font-bold text-3xl flex items-center space-x-1"><span>HIALA</span><TvIcon className="w-8" /></span>
}