import axios from 'axios'

import LanguageType from "../types/language"

export const getLanguages = async () => {
    return [
        { name: 'English', abbr: 'en', flag: 'gb' },
        { name: 'Français', abbr: 'fr', flag: 'fr' },
    ]
    const res = await axios.get<LanguageType[]>('/languages')
    return res.data
} 