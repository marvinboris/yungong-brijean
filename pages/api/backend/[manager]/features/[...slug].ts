import { NextApiRequest, NextApiResponse } from "next";

import { data, resource, resourceConfig } from '.'

import { Feature } from "../../../../../app/models";

import { getCms, handleError, methodNotAllowed } from "../../../../../lib/utils";
import { manageResource } from "../../../../../lib/utils/resource";

const information = async () => {
    return {}
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<unknown | { error: string }>
) {
    // const type = req.query.manager as string
    const slug = req.query.slug as string[]

    try {
        const cms = getCms()
        // const manager = await getAccount(req)
        const manage = manageResource(req, res, {
            data, information,
            model: Feature,
            cms, slug, resource,
            ...resourceConfig,
        })

        if (req.method === 'GET') {
            if (slug[0] === 'info') return manage.info()
            else return manage.show()
        } else if (req.method === 'PATCH') return manage.patch()
        else if (req.method === 'DELETE') return manage.delete()
        else methodNotAllowed(req, res)
    } catch (error) {
        handleError(res, error)
    }
}