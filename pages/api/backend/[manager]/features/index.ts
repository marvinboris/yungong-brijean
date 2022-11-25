import { NextApiRequest, NextApiResponse, PageConfig } from "next";

import { Feature } from "../../../../../app/models";

import { getCms, handleError, methodNotAllowed } from "../../../../../lib/utils";
import { manageResource } from "../../../../../lib/utils/resource";

export const data = async (req: NextApiRequest) => {
    const { page = 1, show = 10, search = '' } = req.query
    let total = 0

    const regex = new RegExp(search as string, 'i')

    const data = await Feature
        .find({
            $or: [
                { name: regex },
                { prefix: regex },
            ]
        })
    total = data.length

    const features = (show === 'All' ? data :
        data.filter((_, index) => (+page - 1) * +show <= index && index < +page * +show)
    ).map(feature => ({ ...feature.toObject() }))

    return { features, total }
}

export const resource = 'features'
export const resourceConfig = {
    singular: 'feature',
    fields: ['name', 'prefix'],
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<unknown | { error: string }>
) {
    // const type = req.query.manager as string
    try {
        const cms = getCms()
        // const manager = await getAccount(req)
        const manage = manageResource(req, res, {
            data,
            model: Feature,
            cms, resource,
            ...resourceConfig,
        })

        if (req.method === 'GET') return manage.get()
        else if (req.method === 'POST') return manage.post({
            validate: {
                name: { minLength: 3 }
            }
        })
        else methodNotAllowed(req, res)
    } catch (error) {
        handleError(res, error)
    }
}

export const config: PageConfig = {
    api: {
        bodyParser: false,
    }
}