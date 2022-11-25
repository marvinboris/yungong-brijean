import { createContext, useContext } from 'react'

type Type = boolean

const SideDrawerContext = createContext<{ open: Type, setOpen: (open: Type) => void }>({ open: false, setOpen: (open: Type) => { } })

export const useSideDrawerContext = () => useContext(SideDrawerContext);

export default SideDrawerContext