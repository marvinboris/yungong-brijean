import { ShoppingBagIcon } from '@heroicons/react/24/outline'
import { ReactElement } from 'react'

import { useContentContext } from '../../../app/contexts/content'
import { convertDate, updateObject } from '../../../app/helpers/utils'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { ProjectInterface } from '../../../app/models/project'

import Layout from '../../../components/backend/navigation/layout'
import Photo from '../../../components/backend/ui/list/photo'
import Action from '../../../components/backend/ui/list/action'
import ManageRead from '../../../components/backend/ui/page/read'

import { selectAuth } from '../../../features/auth/authSlice'
import { selectBackend, _delete } from '../../../features/backend/backendSlice'

import { NextPageWithLayout } from '../../_app'

const ManageProjectsPage: NextPageWithLayout = () => {
    const dispatch = useAppDispatch()

    const { role } = useAppSelector(selectAuth)
    const { data: backend } = useAppSelector(selectBackend)

    const { content } = useContentContext()
    const { cms: { backend: { components: { list: { action, see } }, pages: { projects: { form } } } } } = content!

    const resource = 'projects'
    const props = { delete: (id: string) => dispatch(_delete({ role: role!, resource, id })) }

    const data = (backend && backend.projects ? (backend.projects as ProjectInterface[]) : []).map(project => {
        return updateObject(project, {
            created_at: convertDate(project.createdAt!),
            photo: <Photo photo={project.photo} see={see} title={`${form.project_photo}: ${project.name}`} />,
            action: <Action props={props} resource='projects' item={project} />,
        });
    });

    const fields = [
        { name: form.name, key: 'name' },
        { name: form.description, key: 'description' },
        { name: form.link, key: 'link' },
        { name: form.photo, key: 'photo' },
        { name: action, key: 'action', fixed: true }
    ]

    return <ManageRead data={data} fields={fields} icon={ShoppingBagIcon} resource={resource} />
}

ManageProjectsPage.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>
}

export default ManageProjectsPage