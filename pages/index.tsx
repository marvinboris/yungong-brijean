import { DocumentTextIcon, EnvelopeIcon } from '@heroicons/react/24/outline'
import { ReactElement } from 'react'

import { useContentContext } from '../app/contexts/content'

import Layout, { Head } from '../components/frontend/navigation/layout'
import ProjectBlock from '../components/frontend/ui/blocks/project'
import Button from '../components/frontend/ui/form/button'

import { NextPageWithLayout } from './_app'

const Home: NextPageWithLayout = () => {
  const { content } = useContentContext()
  const { projects, cms: { global: { app_name, contact }, frontend: { pages: { home: cms } } } } = content!

  const projectsContent = projects.map(project => <ProjectBlock key={`project-block-${project.id}`} {...project} />)

  return <div className='min-h-screen'>
    <Head link='/' title={app_name} description={cms.description} />

    <section className="py-[97px]">
      <div className="container">
        <div className="grid grid-cols-3 gap-x-8 gap-y-[94px]">{projectsContent}</div>
      </div>
    </section>

    <section className="py-[60px]">
      <div className="container">
        <h2 className="font-bold text-[40px] mb-3">{cms.get_in_touch}</h2>

        <p className='mb-10'><a href={`mailto:${contact.email}`}><Button icon={EnvelopeIcon}>{contact.email}</Button></a></p>
      
        <div>
          <div className="flex items-center space-x-2">
            <div>
              <DocumentTextIcon className='text-primary w-10' />
            </div>
            <div className='divide-y-[2px] divide-secondary-400 font-body space-y-1'>
              <div className='font-bold'>Resume_Yungong.pdf</div>
              <div className='text-sm text-secondary-400'>138kb</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default Home