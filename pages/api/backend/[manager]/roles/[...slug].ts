import { Types } from "mongoose";
import { NextApiRequest, NextApiResponse, PageConfig } from "next";

import { data, resource, resourceConfig } from '.'

import { message } from "../../../../../app/helpers/utils";
import { Feature, Role } from "../../../../../app/models";
import { FeatureInterface } from "../../../../../app/models/feature";

import { getCms, methodNotAllowed } from "../../../../../lib/utils";
import { manageResource } from "../../../../../lib/utils/resource";

const information = async () => {
    const features = await Feature.find()
    return { features }
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<unknown | { error: string }>
) {
    // const type = req.query.manager as string
    const slug = req.query.slug as string[]

    const cms = getCms()
    // const manager = await getAccount(req)
    const manage = manageResource(req, res, {
        data, information,
        model: Role,
        cms, slug, resource,
        ...resourceConfig,
    })

    if (req.method === 'GET') {
        if (slug[0] === 'info') return manage.info()
        else {
            const role = await Role.findById(slug[0])
                .populate<{ feature: FeatureInterface }>('features.feature')
            if (!role) return res.json({ message: message(cms.backend.messages.roles.not_found, 'danger') })

            const features: { _id: Types.ObjectId, permissions: string[] }[] = []
            role!.features.forEach(feature => {
                if (feature.feature == null || feature.feature instanceof Types.ObjectId) {
                    throw new Error('Role.features.feature should be populated');
                } else if ('prefix' in feature.feature) features.push({
                    _id: feature.feature._id!,
                    permissions: feature.access
                })
            });

            return res.json({ role: { ...role.toObject(), features }, ...(await information()) })
        }
    } else if (req.method === 'PATCH') return manage.patch({
        fields: {
            features: fields => {
                const allFields = Object.keys(fields).filter(field => field.includes('features')).map(field => field.split('[').filter((_c, i) => i > 0).join('').split(']'))
                const features = allFields.filter(([_id, type]) => type === 'id').map(([featureId]) => {
                    const access = allFields.filter(([permissionId, type]) => featureId === permissionId && type === 'permissions').map(([, , access]) => access)
                    return { feature: featureId, access }
                })

                return features
            }
        }
    })
    else if (req.method === 'DELETE') return manage.delete()
    else methodNotAllowed(req, res)
}

export const config: PageConfig = {
    api: {
        bodyParser: false,
    }
}