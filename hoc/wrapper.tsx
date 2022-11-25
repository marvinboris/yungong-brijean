import Head from 'next/head'
import Image from 'next/image'
import { ReactNode, useEffect, useState } from 'react'

import ContentContext from '../app/contexts/content'
import CountriesContext from '../app/contexts/countries'
import LanguageContext from '../app/contexts/language'
import ThemeContext from '../app/contexts/theme'

import { setAuthToken } from '../app/helpers/utils'

import { useAppDispatch, useAppSelector } from '../app/hooks'

import { getContent } from '../app/resources/content'
import { getCountries } from '../app/resources/countries'
import { getLanguages } from '../app/resources/languages'

import ContentType from '../app/types/content'
import CountryType from '../app/types/country'
import Status from '../app/types/enums/status'
import Theme from '../app/types/enums/theme'
import LanguageType from '../app/types/language'

import { check, selectAuth } from '../features/auth/authSlice'

import tailwindConfig from '../tailwind.config'

interface WrapperProps {
  children: ReactNode
}

export default function Wrapper({ children }: WrapperProps) {
  const [content, setContent] = useState<ContentType | null>(null)
  const [countries, setCountries] = useState<CountryType[] | null>(null)
  const [language, setJustLanguage] = useState<LanguageType | null>(null)
  const [languages, setLanguages] = useState<LanguageType[] | null>(null)
  const [loaded, setLoaded] = useState(false)
  const [theme, setTheme] = useState<Theme | null>(null)

  const dispatch = useAppDispatch()
  const { token, status } = useAppSelector(selectAuth)

  const setLanguage = (language: LanguageType | null) => {
    setJustLanguage(language)
    if (language) localStorage.setItem('frontend_lang', language.abbr)
    else localStorage.removeItem('frontend_lang')
  }

  useEffect(() => {
    if (status === Status.IDLE) {
      const isAuth = localStorage.getItem('token') !== null
      if (!token && isAuth) dispatch(check())
      else if (token) setAuthToken(token)

      if ((token && isAuth) || !isAuth) setLoaded(true)
    }
  }, [token, dispatch, status])

  useEffect(() => {
    if (theme === null) {
      const initialTheme: Theme = localStorage.getItem('dark') ? Theme.DARK : Theme.LIGHT
      setTheme(initialTheme)
    }
  }, [theme])

  useEffect(() => {
    const root = document.querySelector('html')!
    if (theme === Theme.DARK) root.classList.add('dark')
    else root.classList.remove('dark')
  }, [theme])

  useEffect(() => {
    if (countries === null) getCountries()
      .then(countries => setCountries(countries))
  }, [countries])

  useEffect(() => {
    if (languages === null) getLanguages()
      .then(languages => setLanguages(languages))
  }, [languages])

  useEffect(() => {
    if (content === null) getContent()
      .then(content => setContent(content))
  }, [content])

  return loaded && languages && content ? (status === Status.LOADING ? <div className='fixed inset-0 flex items-center justify-center'>
    <Image width={1920} height={1920} src="/images/bg-screen.svg" alt="BG Screen" className="absolute inset-0 image-cover -z-10" />

    <div className="w-24 h-24 rounded-full border-[7px] border-primary border-t-primary/20 animate-spin" />
  </div> : <ThemeContext.Provider value={{ theme, setTheme }}>
    <LanguageContext.Provider value={{ language, setLanguage, languages, setLanguages }}>
      <CountriesContext.Provider value={{ countries, setCountries }}>
        <ContentContext.Provider value={{ content, setContent }}>
          <Head>
            <link rel="icon" href="/images/favicon.png" />

            <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />

            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-status-bar-style" content="black" />
            <meta name="apple-mobile-web-app-title" content="Safrilen" />
            <meta name="application-name" content="Safrilen" />

            <meta name="msapplication-TileColor" content={tailwindConfig.theme.extend.colors.primary} />

            <base href="/" />

            <meta property="og:locale" content="fr_FR" />
            <meta property="og:type" content="article" />
            <meta property="og:site_name" content="Safrilen" />

            <meta name="twitter:card" content="summary" />
            <meta name="theme-color" content={theme === Theme.DARK ? tailwindConfig.theme.extend.colors.secondary[900] : "#ffffff"} />
          </Head>

          {theme != null && children}
        </ContentContext.Provider>
      </CountriesContext.Provider>
    </LanguageContext.Provider>
  </ThemeContext.Provider>) : <></>
}