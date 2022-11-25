import { UserGroupIcon } from '@heroicons/react/24/outline'
import { ReactElement } from 'react'

import { useContentContext } from '../../../app/contexts/content'
import { convertDate, updateObject } from '../../../app/helpers/utils'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { UserInterface } from '../../../app/models/user'

import Layout from '../../../components/backend/navigation/layout'
import Photo from '../../../components/backend/ui/list/photo'
import Action from '../../../components/backend/ui/list/action'
import ManageRead from '../../../components/backend/ui/page/read'

import { selectAuth } from '../../../features/auth/authSlice'
import { selectBackend, _delete } from '../../../features/backend/backendSlice'

import { NextPageWithLayout } from '../../_app'

const ManagerUsersPage: NextPageWithLayout = () => {
    const dispatch = useAppDispatch()

    const { role } = useAppSelector(selectAuth)
    const { data: backend } = useAppSelector(selectBackend)

    const { content } = useContentContext()
    const { cms: { backend: { components: { list: { action, see } }, pages: { users: { form } } } } } = content!

    const resource = 'users'
    const props = { delete: (id: string) => dispatch(_delete({ role: role!, resource, id })) }

    const data = (backend && backend.users ? (backend.users as UserInterface[]) : []).map(user => {
        return updateObject(user, {
            created_at: convertDate(user.createdAt!),
            photo: <Photo photo={user.photo} see={see} title={`${form.user_photo}: ${user.name}`} />,
            action: <Action props={props} resource={resource} item={user} />,
        });
    });

    const fields = [
        { name: form.full_name, key: 'name' },
        { name: form.email, key: 'email' },
        { name: form.phone, key: 'phone' },
        { name: form.role, key: 'role' },
        { name: form.photo, key: 'photo' },
        { name: action, key: 'action', fixed: true }
    ]

    return <ManageRead data={data} fields={fields} icon={UserGroupIcon} resource={resource} />
}

ManagerUsersPage.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>
}

export default ManagerUsersPage