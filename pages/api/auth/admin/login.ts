// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import bcrypt from 'bcryptjs'
import type { NextApiRequest, NextApiResponse } from 'next'

import { message } from '../../../../app/helpers/utils'

import { Admin } from '../../../../app/models'
import type ApiAccountAdminType from '../../../../app/types/api/account/admin'
import type ApiMessageType from '../../../../app/types/api/message'

import { sign } from '../../../../lib/jose'
import { handleError } from '../../../../lib/utils'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<{ token: string, expiresAt: number, data: ApiAccountAdminType } | ApiMessageType>
) {
    const { email, password } = req.body
    try {
        const admin = await Admin.findOne({ where: { email } })
        if (!admin) return res.status(401).json({ message: message('Identifiants invalides.', 'danger') })

        const doMatch = await bcrypt.compare(password, admin.password)
        if (!doMatch) return res.status(401).json({ message: message('Identifiants invalides.', 'danger') })

        const payload = { admin: { _id: admin._id, type: 'admin' } }
        const { token, expiresAt } = await sign(payload)

        res.json({ token, expiresAt, data: { ...admin.toObject() } })
    } catch (error) {
        handleError(res, error)
    }
}