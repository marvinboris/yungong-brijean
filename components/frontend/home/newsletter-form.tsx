import { PaperAirplaneIcon } from "@heroicons/react/24/outline"
import { FormEvent } from 'react'

import Button from "../ui/form/button"

interface NewsletterFormProps {
    onSubmit: (e: FormEvent) => void
}

export default function NewsletterForm({ onSubmit }: NewsletterFormProps) {
    return <form onSubmit={onSubmit}>
        <div className="relative h-[60px] flex items-center bg-white rounded-[300px] py-[7px] pr-[11px] pl-[45px]">
            <div className="flex-grow">
                <input type="email" name='email' className='border-none text-lg bg-transparent outline-none text-inherit w-full' placeholder='E-mail Address' />
            </div>

            <div>
                <Button size='sm' icon={PaperAirplaneIcon}>Submit</Button>
            </div>
        </div>
    </form>
}