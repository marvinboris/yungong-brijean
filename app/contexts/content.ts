import { createContext, useContext } from 'react'

import ContentType from '../types/content';

type Type = ContentType | null

const ContentContext = createContext<{ content: Type, setContent: (content: Type) => void }>({ content: null, setContent: (content: Type) => { } })

export const useContentContext = () => useContext(ContentContext);

export default ContentContext