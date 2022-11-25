import { EnvelopeIcon, LockClosedIcon, PencilSquareIcon, TagIcon, UserGroupIcon, UserIcon } from "@heroicons/react/24/outline"
import Image from "next/image"
import { ChangeEvent, useState } from "react"

import { useContentContext } from "../../../../../app/contexts/content"
import { useAppSelector } from "../../../../../app/hooks"
import { RoleInterface } from "../../../../../app/models/role"
import ManagerResourceManageStateType from "../../../../../app/types/account/manager/add-or-edit/state"

import { selectBackend } from "../../../../../features/backend/backendSlice"
import Alert from "../../../../frontend/ui/alert"

import Input from "../../../../frontend/ui/form/input"
import Select from "../../../../frontend/ui/form/select"

import * as utility from '../../utils'

import ManagerAddOrEdit from "../add-or-edit"

type Props = { edit?: boolean }

const initialState = {
    name: '',
    phone: '',
    photo: '',
    email: '',
    password: '',
    password_confirmation: '',
    role: '',

    add: false,
}

export default function ManageAddOrEditUsers({ edit }: Props) {
    const { status, data: backend, message } = useAppSelector(selectBackend)

    const { content } = useContentContext()
    const { cms: { backend: { pages: { users: { form } } } } } = content!

    const [state, setState] = useState<ManagerResourceManageStateType>({ ...initialState })

    const inputChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => utility.add.component.inputChangeHandler(setState)(e)
    const fileUpload = (id: string) => utility.add.component.fileUpload(id)

    const roles = backend && backend.roles ? (backend.roles as (RoleInterface & { _id: string })[]) : []
    const rolesOptions = roles.map(role => <option key={JSON.stringify(role)} value={role._id}>{role.name}</option>);

    return <ManagerAddOrEdit icon={UserGroupIcon} edit={edit} resource='users' singular='user' initialState={initialState} state={state} setState={setState} staticChild={<>
        <input type="file" id="photo" name="photo" className="hidden" onChange={inputChangeHandler} accept=".png,.jpg,.jpeg" />
    </>}>
        <div className='grid md:grid-cols-3'>
            <div className="md:col-span-2">
                <div className="flex-1 grid gap-y-2 gap-x-4 grid-cols-1 md:grid-cols-2 overflow-auto">
                    <Input inputSize='sm' type="text" icon={UserIcon} onChange={inputChangeHandler} value={state.name as string} name="name" required label={form.name} />
                    <Input inputSize='sm' type="tel" addon={!edit && <span className="text-sm">+237</span>} onChange={inputChangeHandler} value={state.phone as string} name="phone" required label={form.phone} />
                    <Input inputSize='sm' type="password" icon={LockClosedIcon} onChange={inputChangeHandler} value={state.password as string} name="password" label={form.password} />
                    <Input inputSize='sm' type="password" icon={LockClosedIcon} onChange={inputChangeHandler} value={state.password_confirmation as string} name="password_confirmation" label={form.password_confirmation} />
                    <Input inputSize='sm' type="email" icon={EnvelopeIcon} onChange={inputChangeHandler} value={state.email as string} name="email" label={form.email} />
                    <Select inputSize='sm' icon={TagIcon} name="role" label={form.role} onChange={inputChangeHandler} required value={state.role as string}>
                        <option>{form.select_role}</option>
                        {rolesOptions}
                    </Select>
                </div>
            </div>

            <div className='md:flex items-center justify-center'>
                <div onClick={() => fileUpload('photo')} className="aspect-[5/2] md:w-40 md:aspect-square cursor-pointer mt-[14px] md:mt-0 rounded-[15px] md:rounded-3xl relative flex flex-col items-center justify-center overflow-hidden text-white">
                    {state.photo && <Image width={1920} height={1920} src={state.photo as string} alt="User profile pic" className="absolute z-0 inset-0 image-cover" />}
                    <div className="absolute z-10 inset-0 bg-black/40" />
                    <div className="relative z-20 w-9 md:w-14 h-9 md:h-14 mb-1 md:mb-1.5 rounded-full flex items-center justify-center bg-black/30"><PencilSquareIcon className='w-4 md:w-6' /></div>
                    <div className="relative z-20 font-medium md:font-bold text-[14.81px]">Change</div>
                </div>
            </div>
        </div>
    </ManagerAddOrEdit>
}