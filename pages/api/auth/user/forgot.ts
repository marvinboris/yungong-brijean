import { NextApiRequest, NextApiResponse } from "next";

import { message } from "../../../../app/helpers/utils";
import { User } from "../../../../app/models";
import ApiMessageType from "../../../../app/types/api/message";

import { handleError } from "../../../../lib/utils";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ApiMessageType>
) {
    const { email } = req.body
    try {
        const user = await User.findOne({ where: { email } })
        if (!user) return res.status(401).json({ message: message('Adresse mail invalide') })

        res.json({ message: message('Lien de réinitialisation de mot de passe envoyé avec succès.', 'success') })
    } catch (error) {
        handleError(res, error)
    }
}