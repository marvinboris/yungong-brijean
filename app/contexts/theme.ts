import { createContext, useContext } from 'react'

import Theme from '../types/enums/theme'

type Type = Theme | null

const ThemeContext = createContext<{ theme: Type, setTheme: (theme: Type) => void }>({ theme: null, setTheme: (theme: Type) => { } })

export const useThemeContext = () => useContext(ThemeContext);

export default ThemeContext