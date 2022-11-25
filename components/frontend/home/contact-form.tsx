import { EnvelopeIcon, PaperAirplaneIcon, PhoneIcon, UserIcon } from "@heroicons/react/24/outline";
import { FormEvent } from 'react'

import Button from "../ui/form/button";
import Input from "../ui/form/input";
import TextArea from "../ui/form/text-area";

interface ContactFormProps {
    onSubmit: (e: FormEvent) => void
}

export default function ContactForm({ onSubmit }: ContactFormProps) {
    return <form onSubmit={onSubmit}>
        <div className='grid gap-6 md:grid-cols-2'>
            <Input icon={UserIcon} name='first_name' placeholder='First Name' />
            <Input icon={UserIcon} name='last_name' placeholder='Last Name' />
            <Input icon={EnvelopeIcon} type="email" name='email' placeholder='E-mail Address' />
            <Input icon={PhoneIcon} type="tel" name='phone' placeholder='Phone Number' />
            <TextArea className='col-span-2' name='message' placeholder='Your Message goes here' />
        </div>

        <div className="mt-6 lg:mt-20">
            <Button icon={PaperAirplaneIcon}>Submit</Button>
        </div>
    </form>
}