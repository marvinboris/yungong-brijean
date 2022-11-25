import bcrypt from 'bcryptjs'
import { NextApiRequest, NextApiResponse } from "next";

import { message } from '../../../../../app/helpers/utils';
import { User } from '../../../../../app/models';
import ApiMessageType from '../../../../../app/types/api/message';

import { handleError } from '../../../../../lib/utils';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ApiMessageType>
) {
    const { password } = req.body
    const { slug } = req.query
    const [id, code] = slug as string[]
    try {
        const user = await User.findById(id)
        if (!user) return res.status(401).json({ message: message('Lien invalide', 'danger') })

        const hashedPassword = await bcrypt.hash(password, 12)
        user.password = hashedPassword
        await user.save()

        res.json({ message: message('Mot de passe réinitialisé avec succès.', 'success') })
    } catch (error) {
        handleError(res, error)
    }
}