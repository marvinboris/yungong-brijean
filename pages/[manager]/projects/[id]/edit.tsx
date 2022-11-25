import { ReactElement } from 'react'

import Layout from '../../../../components/backend/navigation/layout'

import { _delete } from '../../../../features/backend/backendSlice'
import ManageAddOrEditProjects from '../../../../components/backend/ui/page/add-or-edit/projects'

import { NextPageWithLayout } from '../../../_app'

const ManagerProjectsEditPage: NextPageWithLayout = () => <ManageAddOrEditProjects edit />

ManagerProjectsEditPage.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>
}

export default ManagerProjectsEditPage