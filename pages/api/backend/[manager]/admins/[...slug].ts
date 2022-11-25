import bcrypt from 'bcryptjs'
import { NextApiRequest, NextApiResponse, PageConfig } from "next";

import { data, resource, resourceConfig } from '.';

import { Admin } from '../../../../../app/models';

import { getCms, handleError, methodNotAllowed } from "../../../../../lib/utils";
import { manageResource } from '../../../../../lib/utils/resource';

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
            model: Admin,
            cms, slug, resource,
            ...resourceConfig,
        })

        if (req.method === 'GET') {
            if (slug[0] === 'info') return manage.info()
            else return manage.show({
                keys: {
                    password: () => ''
                }
            })
        } else if (req.method === 'PATCH') return manage.patch({
            fields: {
                phone: fields => fields.phone,
                password: async fields => fields.password ? await bcrypt.hash(fields.password as string, 12) : undefined
            }
        })
        else if (req.method === 'DELETE') return manage.delete()
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