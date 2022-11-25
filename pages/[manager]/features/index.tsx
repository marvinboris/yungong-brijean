import { CogIcon } from '@heroicons/react/24/outline'
import { ReactElement, useMemo } from 'react'

import { useContentContext } from '../../../app/contexts/content'
import { convertDate, updateObject } from '../../../app/helpers/utils'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { FeatureInterface } from '../../../app/models/feature'

import Layout from '../../../components/backend/navigation/layout'
import Action from '../../../components/backend/ui/list/action'
import ManageRead from '../../../components/backend/ui/page/read'

import { selectAuth } from '../../../features/auth/authSlice'
import { selectBackend, _delete } from '../../../features/backend/backendSlice'

import { NextPageWithLayout } from '../../_app'

const ManagerFeaturesPage: NextPageWithLayout = () => {
    const dispatch = useAppDispatch()

    const { role } = useAppSelector(selectAuth)
    const { data: backend } = useAppSelector(selectBackend)

    const { content } = useContentContext()
    const { cms: { backend: { components: { list: { action } }, pages: { features: { form } } } } } = content!

    const resource = 'features'
    const props = { delete: (id: string) => dispatch(_delete({ role: role!, resource, id })) }

    const data = (backend && backend.features ? (backend.features as FeatureInterface[]) : []).map(feature => updateObject(feature, {
        created_at: convertDate(feature.createdAt!),
        action: <Action props={props} resource='features' item={feature} />,
    }));

    const fields = [
        { name: form.name, key: 'name' },
        { name: form.prefix, key: 'prefix' },
        { name: form.created_at, key: 'created_at' },
        { name: action, key: 'action', fixed: true }
    ]

    return <ManageRead data={data} fields={fields} icon={CogIcon} resource={resource} />
}

ManagerFeaturesPage.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>
}

export default ManagerFeaturesPage