import axios from 'axios'

import ContentType from '../types/content'

export const getContent = async () => {
    const res = await axios.get<ContentType>('/api/content')
    return res.data
} 