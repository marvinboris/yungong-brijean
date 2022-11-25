import { NextApiRequest, NextApiResponse, PageConfig } from "next";

import { Role } from "../../../../../app/models";

import { getCms, methodNotAllowed } from "../../../../../lib/utils";
import { manageResource } from "../../../../../lib/utils/resource";

export const data = async (req: NextApiRequest) => {
    const { page = 1, show = 10, search = '' } = req.query
    let total = 0

    const regex = new RegExp(search as string, 'i')

    const data = await Role
        .find({
            $or: [
                { name: regex },
                { description: regex },
            ]
        })
    total = data.length

    const roles = (show === 'All' ? data :
        data.filter((_, index) => (+page - 1) * +show <= index && index < +page * +show)
    ).map(role => ({ ...role.toObject() }))

    return { roles, total }
}

export const resource = 'roles'
export const resourceConfig = {
    singular: 'role',
    fields: ['name', 'description', 'features'],
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<unknown | { error: string }>
) {
    // const type = req.query.manager as string

    const cms = getCms()
    // const manager = await getAccount(req)
    const manage = manageResource(req, res, {
        data,
        model: Role,
        cms, resource,
        ...resourceConfig,
    })

    if (req.method === 'GET') return manage.get()
    else if (req.method === 'POST') return manage.post({
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
    else methodNotAllowed(req, res)
}

export const config: PageConfig = {
    api: {
        bodyParser: false,
    }
}