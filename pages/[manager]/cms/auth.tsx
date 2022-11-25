import { ReactElement } from 'react'

import { NextPageWithLayout } from '../../_app'

import Layout from '../../../components/backend/navigation/layout'
import CmsPage from '../../../components/backend/ui/page/cms/page'

const ManagerCmsAuthPage: NextPageWithLayout = () => <CmsPage name='auth' />

ManagerCmsAuthPage.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>
}

export default ManagerCmsAuthPage