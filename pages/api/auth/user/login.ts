// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import bcrypt from 'bcryptjs'
import { Types } from 'mongoose'
import type { NextApiRequest, NextApiResponse } from 'next'

import { message } from '../../../../app/helpers/utils'

import { User } from '../../../../app/models'
import type { FeatureInterface } from '../../../../app/models/feature'
import type { RoleInterface } from '../../../../app/models/role'

import type ApiAccountUserType from '../../../../app/types/api/account/user'
import type ApiMessageType from '../../../../app/types/api/message'

import { sign } from '../../../../lib/jose'
import { handleError } from '../../../../lib/utils'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<{ token: string, expiresAt: number, data: ApiAccountUserType } | ApiMessageType>
) {
    const { email, password } = req.body
    try {
        const user = await User.findOne({ where: { email } })
            .populate<{ role: RoleInterface & { features: { feature: FeatureInterface }[] } }>({
                path: 'role',
                populate: { path: 'features.feature', select: 'prefix _id' }
            })
        if (!user) return res.status(401).json({ message: message('Identifiants invalides.', 'danger') })

        const doMatch = await bcrypt.compare(password, user.password)
        if (!doMatch) return res.status(401).json({ message: message('Identifiants invalides.', 'danger') })

        const payload = { user: { _id: user._id, type: 'user' } }
        const { token, expiresAt } = await sign(payload)

        const features: { _id: Types.ObjectId, prefix: string, access: string[] }[] = []
        user.role.features.forEach(feature => {
            if (feature.feature == null || feature.feature instanceof Types.ObjectId) throw new Error('User.role.features.feature should be populated');
            else if ('prefix' in feature.feature) features.push({
                _id: feature.feature._id!,
                prefix: feature.feature.prefix,
                access: feature.access
            })
        });

        const data: any = { ...user.toObject(), role: { ...user.toObject().role, features } }

        res.json({ token, expiresAt, data })
    } catch (error) {
        handleError(res, error)
    }
}