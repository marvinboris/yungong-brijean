import { Types } from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";

import { message } from "../../app/helpers/utils";

import { Admin, User } from "../../app/models";
import type { FeatureInterface } from "../../app/models/feature";
import type { RoleInterface } from "../../app/models/role";

import type ApiAccountAdminType from "../../app/types/api/account/admin";
import type ApiAccountUserType from "../../app/types/api/account/user";
import type ApiMessageType from "../../app/types/api/message";

import { decryptPayload, handleError } from "../../lib/utils";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<{ role: string, data: ApiAccountAdminType | ApiAccountUserType } | ApiMessageType>
) {
    try {
        const decrypted = decryptPayload(req)
        if (!decrypted) return res.status(401).json({ message: message('Not authorized.', 'danger') })

        const { _id, type } = decrypted
        let account, data
        if (type === 'user') {
            account = await User.findById(_id)
                .populate<{ role: RoleInterface & { features: { feature: FeatureInterface }[] } }>({
                    path: 'role',
                    populate: { path: 'features.feature' }
                })
            if (!account) return res.status(401).json({ message: message('Invalid token.', 'danger') })

            const features: { _id: Types.ObjectId, prefix: string, access: string[] }[] = []
            account.role.features.forEach(feature => {
                if (feature.feature == null || feature.feature instanceof Types.ObjectId) {
                    throw new Error('User.role.features.feature should be populated');
                } else if ('prefix' in feature.feature) features.push({
                    _id: feature.feature._id!,
                    prefix: feature.feature.prefix,
                    access: feature.access
                })
            });

            data = { ...account.toObject(), role: { ...account.toObject().role, features } }
        } else if (type === 'admin') {
            account = await Admin.findById(_id)
            if (!account) return res.status(401).json({ message: message('Invalid token.', 'danger') })

            data = { ...account.toObject() }
        }
        res.json({ data, role: type })
    } catch (error) {
        handleError(res, error)
    }
}