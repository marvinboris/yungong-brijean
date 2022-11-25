import Image from "next/image"

interface PageTitleProps {
    title: string
    subtitle: string
}

export default function PageTitle({ title, subtitle }: PageTitleProps) {
    return <div className='relative z-0 py-20'>
        <Image fill src='/images/frontend/sigmund-r6tyWx_Mm9g-unsplash.jpg' alt='Bannière' className='absolute inset-0 image-cover -z-20' />
        <div className='bg-grid-white/[0.05] absolute -z-10 after:absolute after:bottom-0 after:inset-0 after:bg-gradient-to-t after:from-primary/70 after:to-primary/30 after:-z-20 inset-0' />

        <div className="container text-center text-white">
            <h1 className='mx-auto max-w-4xl font-display text-4xl font-extrabold tracking-tight sm:text-6xl'>{title}</h1>

            <p className="mx-auto mt-6 max-w-2xl text-sm sm:text-base tracking-tight">{subtitle}</p>
        </div>
    </div>
}