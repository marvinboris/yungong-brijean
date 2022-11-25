import { AdjustmentsHorizontalIcon, ArrowDownOnSquareIcon, EnvelopeIcon, EyeIcon, FlagIcon, LockClosedIcon, PencilIcon, PencilSquareIcon, UserIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import { ChangeEvent, ReactElement, useState } from 'react'

import { NextPageWithLayout } from '../_app'

import Layout, { Head } from '../../components/backend/navigation/layout'

import Button from '../../components/backend/ui/form/button'
import PageTitle from '../../components/backend/ui/title/page'

import Input from '../../components/frontend/ui/form/input'
import { useAppSelector } from '../../app/hooks'
import { selectAuth } from '../../features/auth/authSlice'
import Select from '../../components/frontend/ui/form/select'

const params = {
    link: '/user/settings',
    title: "Settings | Valyou",
    description: "Your favorite e-commerce platform: your settings."
}

type ValueType = any

const readURL = (input: EventTarget & HTMLInputElement, setValue: (value: ValueType | ((value: ValueType) => ValueType)) => void) => {
    if (input.files && input.files[0]) {
        const file = input.files[0];
        const reader = new FileReader();

        reader.onload = function (e) {
            setValue((value: ValueType) => ({ ...value, photo: e.target!.result as string }));
        }

        reader.readAsDataURL(file); // convert to base64 string
    }
};

const SettingsPage: NextPageWithLayout = () => {
    const { data } = useAppSelector(selectAuth)

    const [editing, setEditing] = useState(false)
    const [value, setValue] = useState({
        ...data!,
        password: '',
        password_confirmation: '',
    })

    const onChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value: val } = e.target
        if ('files' in e.target && e.target.files) readURL(e.target, setValue)
        setValue(value => ({ ...value, [name]: ('files' in e.target && e.target.files) ? e.target.files[0] : val }))
    }

    const handlePhotoChange = () => document.getElementById('photo')?.click()

    return <>
        <Head {...params} />
        <main className='flex-1'>
            <PageTitle animated icon={AdjustmentsHorizontalIcon} title='Settings' subtitle='Manage your account details' />

            <div className="px-[33px] md:px-[42px] pt-[29px] md:pt-[47px] pb-[54px]">
                <div className="bg-white rounded-[30px] py-8 px-[38.36px] shadow-2xl mb-[25px] max-w-[700px]">
                    <div className="mb-[46.94px] flex flex-wrap md:flex-nowrap items-center justify-between">
                        <div className='order-2 md:order-1'>
                            <div className="font-bold md:font-medium mb-[4.63px] text-[25px] md:text-[22.21px]">User Account Settings</div>

                            <div className="text-[12.96px]">Edit or manage account</div>
                        </div>

                        <div className="flex items-center order-1 md:order-2 ml-auto md:ml-0 mb-8 md:mb-0">
                            <Button type={editing ? 'submit' : 'button'} onClick={() => setEditing(editing => !editing)} pill icon={editing ? ArrowDownOnSquareIcon : PencilIcon} color={editing ? 'green' : 'night'}>{editing ? 'Save' : 'Edit'} Settings</Button>
                        </div>
                    </div>

                    <form>
                        <div className="md:flex md:items-start md:space-x-11">
                            <div className="flex-1 grid gap-y-2 gap-x-4 grid-cols-1 md:grid-cols-2 overflow-auto">
                                <Input inputSize='sm' icon={UserIcon} name='name' placeholder='First Name' onChange={onChange} value={value.name} />
                                <Input inputSize='sm' icon={EnvelopeIcon} type='email' name='email' placeholder='E-mail Address' onChange={onChange} value={value.email} />
                                <Input inputSize='sm' type='tel' name='phone' placeholder='054 430 3333' onChange={onChange} value={value.phone} />
                                <Select inputSize='sm' name='locale' icon={FlagIcon} onChange={onChange} value={value.locale}>
                                    <option value="">Select locale</option>
                                </Select>
                                <Input inputSize='sm' icon={LockClosedIcon} append={<EyeIcon className='w-6 text-green cursor-pointer' />} type='password' name='password' placeholder='Password' onChange={onChange} value={value.password} />
                                <Input inputSize='sm' icon={LockClosedIcon} append={<EyeIcon className='w-6 text-green cursor-pointer' />} type='password' name='password_confirmation' placeholder='Retype Password' onChange={onChange} value={value.password_confirmation} />
                            </div>

                            <div onClick={handlePhotoChange} className="aspect-[5/2] md:w-40 md:aspect-square cursor-pointer mt-[14px] md:mt-0 rounded-[15px] md:rounded-3xl relative flex flex-col items-center justify-center overflow-hidden text-white">
                                {value.photo && <Image width={1920} height={1920} src={value.photo} alt="User profile pic" className="absolute z-0 inset-0 image-cover" />}
                                <div className="absolute z-10 inset-0 bg-black/40" />
                                <div className="relative z-20 w-9 md:w-14 h-9 md:h-14 mb-1 md:mb-1.5 rounded-full flex items-center justify-center bg-black/30"><PencilSquareIcon className='w-4 md:w-6' /></div>
                                <div className="relative z-20 font-medium md:font-bold text-[14.81px]">Change</div>
                            </div>
                        </div>

                        <input type="file" name="photo" id="photo" className='hidden' onChange={onChange} accept='image/*' />
                    </form>
                </div>
            </div>
        </main>
    </>
}

SettingsPage.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>
}

export default SettingsPage