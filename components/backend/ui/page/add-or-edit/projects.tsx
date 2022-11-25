import { DocumentChartBarIcon, PencilSquareIcon } from "@heroicons/react/24/outline"
import Image from "next/image"
import { ChangeEvent, useState } from "react"

import { useContentContext } from "../../../../../app/contexts/content"
import ManagerResourceManageStateType from "../../../../../app/types/account/manager/add-or-edit/state"

import Input from "../../../../frontend/ui/form/input"

import * as utility from '../../utils'

import ManagerAddOrEdit from "."
import TextArea from "../../../../frontend/ui/form/text-area"

type Props = { edit?: boolean }

const initialState = {
    name: '',
    description: '',
    link: '',
    photo: '',

    add: false,
}

export default function ManageAddOrEditProjects({ edit }: Props) {
    const { content } = useContentContext()
    const { cms: { backend: { components: { }, pages: { projects: { form } } } } } = content!

    const [state, setState] = useState<ManagerResourceManageStateType>({ ...initialState })

    const inputChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => utility.add.component.inputChangeHandler(setState)(e)
    const fileUpload = (id: string) => utility.add.component.fileUpload(id)

    return <ManagerAddOrEdit icon={DocumentChartBarIcon} edit={edit} resource='projects' singular='project' initialState={initialState} state={state} setState={setState} staticChild={<>
        <input type="file" id="photo" name="photo" className="hidden" onChange={inputChangeHandler} accept=".png,.jpg,.jpeg" />
    </>}>
        <div className='grid md:grid-cols-3'>
            <div className="md:col-span-2">
                <div className="flex-1 grid gap-y-2 gap-x-4 grid-cols-1 md:grid-cols-2 overflow-auto">
                    <Input inputSize='sm' type="text" icon={DocumentChartBarIcon} onChange={inputChangeHandler} value={state.name as string} name="name" required label={form.name} />
                    <Input inputSize='sm' type="text" icon={DocumentChartBarIcon} onChange={inputChangeHandler} value={state.link as string} name="link" required label={form.link} />
                    <TextArea inputSize='sm' type="text" onChange={inputChangeHandler} value={state.description as string} name="description" required label={form.description} />
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