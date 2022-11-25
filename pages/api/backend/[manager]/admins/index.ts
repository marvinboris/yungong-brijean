import path from 'path';

import bcrypt from 'bcryptjs'
import { NextApiRequest, NextApiResponse, PageConfig } from "next";

import { Admin } from '../../../../../app/models';

import { getCms, handleError, methodNotAllowed } from "../../../../../lib/utils";
import { manageResource } from '../../../../../lib/utils/resource';

export const data = async (req: NextApiRequest) => {
    const { page = 1, show = 10, search = '' } = req.query
    let total = 0

    const regex = new RegExp(search as string, 'i')

    const data = await Admin
        .find({
            $or: [
                { name: regex },
                { email: regex },
            ]
        })
        .select('-password')
    total = data.length

    const admins = (show === 'All' ? data :
        data.filter((_, index) => (+page - 1) * +show <= index && index < +page * +show)
    ).map(admin => ({
        ...admin.toObject(),
    }))

    return { admins, total }
}

export const resource = 'admins'
export const resourceConfig = {
    singular: 'admin',
    fields: ['name', 'email', 'phone', 'password', 'role'],
    file: {
        name: 'photo',
        uploadDir: path.join(process.cwd(), 'public', 'images', 'admins'),
    }
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
            model: Admin,
            cms, resource,
            ...resourceConfig,
        })

        if (req.method === 'GET') return manage.get()
        else if (req.method === 'POST') return manage.post({
            fields: {
                phone: fields => `237${fields.phone}`,
                password: async fields => await bcrypt.hash(fields.password as string, 12)
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