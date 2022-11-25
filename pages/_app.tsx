import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { ReactElement, ReactNode } from 'react'
import { Provider } from 'react-redux'

import store from '../app/store'

import Wrapper from '../hoc/wrapper'

import '../styles/globals.css'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return <Provider store={store}>
    <Wrapper>
      {getLayout(<Component {...pageProps} />)}
    </Wrapper>
  </Provider>
}