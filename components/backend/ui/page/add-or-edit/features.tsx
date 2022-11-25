import { CogIcon, PencilIcon } from "@heroicons/react/24/outline"
import { ChangeEvent, useState } from "react"

import { useContentContext } from "../../../../../app/contexts/content"
import { useAppSelector } from "../../../../../app/hooks"
import ManagerResourceManageStateType from "../../../../../app/types/account/manager/add-or-edit/state"

import { selectBackend } from "../../../../../features/backend/backendSlice"

import Input from "../../../../frontend/ui/form/input"

import * as utility from '../../utils'

import ManagerAddOrEdit from "../add-or-edit"

type Props = { edit?: boolean }
type FeatureType = { _id: string, permissions: string[] }

const initialState = {
    name: '',
    prefix: '',

    add: false,
}

export default function ManageAddOrEditRoles({ edit }: Props) {
    const { status, data: backend, message } = useAppSelector(selectBackend)

    const { content } = useContentContext()
    const { cms: { backend: { pages: { features: { form } } } } } = content!

    const [state, setState] = useState<ManagerResourceManageStateType>({ ...initialState })

    const inputChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => utility.add.component.inputChangeHandler(setState)(e)

    return <ManagerAddOrEdit icon={CogIcon} edit={edit} resource='features' singular='feature' initialState={initialState} state={state} setState={setState}>
        <div className='grid md:grid-cols-3'>
            <div className="md:col-span-2">
                <div className="flex-1 grid gap-y-2 gap-x-4 grid-cols-1 md:grid-cols-2 overflow-auto">
                    <Input inputSize='sm' type="text" icon={CogIcon} onChange={inputChangeHandler} value={state.name as string} name="name" required label={form.name} />
                    <Input inputSize="sm" type="text" icon={PencilIcon} onChange={inputChangeHandler} value={state.prefix as string} name="prefix" required label={form.prefix} />
                </div>
            </div>
        </div>
    </ManagerAddOrEdit>
}