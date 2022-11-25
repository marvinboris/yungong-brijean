import { createContext, useContext } from 'react'

import LanguageType from '../types/language'

type Type = LanguageType | null
type Types = LanguageType[] | null

const LanguageContext = createContext<{
    language: Type
    setLanguage: (language: Type) => void
    languages: Types,
    setLanguages: (languages: Types) => void
}>({
    language: null,
    setLanguage: (language: Type) => { },
    languages: null,
    setLanguages: (languages: Types) => { }
})

export const useLanguageContext = () => useContext(LanguageContext);

export default LanguageContext