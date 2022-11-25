import Image from 'next/image';
import { ComponentProps, useEffect, useState } from 'react';

import { classNames } from '../../../app/helpers/utils';

type LoadingProps = ComponentProps<'div'> & {
    isAuthenticated?: boolean
    loading?: boolean
    waiting?: boolean
}

export default function Loading({ children, loading }: LoadingProps) {
    const [fadedOut, setFadedOut] = useState(false)

    useEffect(() => {
      if (!fadedOut && !loading) setFadedOut(true)
    }, [fadedOut, loading])

    return <>
        <div className={classNames('absolute inset-0 flex items-center justify-center bg-white z-50 after:absolute after:inset-0 after:bg-grid-primary/[0.05] after:z-40 transition-all duration-1000', fadedOut ? "opacity-0 scale-0" : "opacity-100 scale-0")}>
            <div className='relative w-[150px] h-[150px] flex items-center'>
                <div className='absolute border-[5px] border-primary border-t-transparent rounded-full animate-spin aspect-square w-[150px]' />

                <Image width={1920} height={1920} src={'/images/logo.png'} alt="Logo" className='w-full scale-75' />
            </div>
        </div>

        {fadedOut && children}
    </>
}