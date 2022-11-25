import path from 'path';

import bcrypt from 'bcryptjs'
import { NextApiRequest, NextApiResponse, PageConfig } from "next";

import { User } from '../../../../../app/models';
import { RoleInterface } from '../../../../../app/models/role';

import { getCms, handleError, methodNotAllowed } from "../../../../../lib/utils";
import { manageResource } from '../../../../../lib/utils/resource';

export const data = async (req: NextApiRequest) => {
    const { page = 1, show = 10, search = '' } = req.query
    let total = 0

    const regex = new RegExp(search as string, 'i')

    const data = await User
        .find({
            $or: [
                { name: regex },
                { email: regex },
                { 'role.name': regex },
            ]
        })
        .populate<{ role: RoleInterface }>('role')
        .select('-password')
    total = data.length

    const users = (show === 'All' ? data :
        data.filter((_, index) => (+page - 1) * +show <= index && index < +page * +show)
    ).map(user => ({
        ...user.toObject(),
        role: user.role.name
    }))

    return { users, total }
}

export const resource = 'users'
export const resourceConfig = {
    singular: 'user',
    fields: ['name', 'email', 'phone', 'password', 'role'],
    file: {
        name: 'photo',
        uploadDir: path.join(process.cwd(), 'public', 'images', 'users'),
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
            model: User,
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