import { TagIcon } from '@heroicons/react/24/outline'
import { ReactElement } from 'react'

import { useContentContext } from '../../../app/contexts/content'
import { convertDate, updateObject } from '../../../app/helpers/utils'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { RoleInterface } from '../../../app/models/role'

import Layout from '../../../components/backend/navigation/layout'
import Action from '../../../components/backend/ui/list/action'
import ManageRead from '../../../components/backend/ui/page/read'

import { selectAuth } from '../../../features/auth/authSlice'
import { selectBackend, _delete } from '../../../features/backend/backendSlice'

import { NextPageWithLayout } from '../../_app'

const ManageRolesPage: NextPageWithLayout = () => {
    const dispatch = useAppDispatch()

    const { role } = useAppSelector(selectAuth)
    const { data: backend } = useAppSelector(selectBackend)

    const { content } = useContentContext()
    const { cms: { backend: { components: { list: { action, see } }, pages: { roles: { form } } } } } = content!

    const resource = 'roles'
    const props = { delete: (id: string) => dispatch(_delete({ role: role!, resource, id })) }

    const data = (backend && backend.roles ? (backend.roles as RoleInterface[]) : []).map(role => updateObject(role, {
        created_at: convertDate(role.createdAt!),
        action: <Action props={props} resource='roles' item={role} />,
    }));

    const fields = [
        { name: form.name, key: 'name' },
        { name: form.description, key: 'description' },
        { name: form.created_at, key: 'created_at' },
        { name: action, key: 'action', fixed: true }
    ]

    return <ManageRead data={data} fields={fields} icon={TagIcon} resource={resource} />
}

ManageRolesPage.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>
}

export default ManageRolesPage