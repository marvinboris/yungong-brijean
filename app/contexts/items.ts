import { createContext, Dispatch, SetStateAction, useContext } from 'react'

export type ItemsType = { id: string, frequency?: string, range?: string }[]

const ItemsContext = createContext<{ items: ItemsType, setItems: Dispatch<SetStateAction<ItemsType>> }>({ items: [], setItems: () => { } })

export const useItemsContext = () => useContext(ItemsContext);

export default ItemsContext