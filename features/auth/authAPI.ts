import axios from "axios"

import ApiAccountAdminType from "../../app/types/api/account/admin"
import ApiAccountUserType from "../../app/types/api/account/user"
import ApiMessageType from "../../app/types/api/message"

export const getCheck = async () => {
    const res = await axios.get<{ role: string, data: ApiAccountAdminType | ApiAccountUserType | ApiMessageType }>('/api/account')
    return res.data
}

// Login
export const postUserLogin = async (data: { email: string, password: string }) => {
    const res = await axios.post<{ token: string, expiresAt: number, data: ApiAccountUserType | ApiMessageType }>('/api/auth/user/login', data)
    return res.data
}