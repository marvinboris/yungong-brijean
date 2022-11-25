import { NextApiRequest, NextApiResponse } from "next";

import { message } from "../../../app/helpers/utils";
import ApiMessageType from "../../../app/types/api/message";

import sendMail from "../../../lib/nodemailer";
import { getCms, handleError } from "../../../lib/utils";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<unknown | ApiMessageType>
) {
    try {
        const cms = getCms()
        const { first_name, last_name, email, phone, address, service, date, comment } = req.body

        await sendMail({
            to: 'jaris.ultio.21@gmail.com',
            subject: 'Nouvelle demande de devis',
            html: `
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@xz/fonts@1/serve/plus-jakarta-display.min.css" />
                <main style="font-family: 'Plus Jakarta Display', sans-serif; color: #5A657D;">
                    <h2>Nouvelle demande de devis</h2>
                    <p>En voici les détails:</p>
                    <ul>
                    <li>Nom: <strong>${first_name} ${last_name}</strong></li>
                    <li>Adresse mail: <strong>${email}</strong></li>
                    <li>Téléphone: <strong>237${phone}</strong></li>
                    <li>Adresse: <strong>${address}</strong></li>
                    <li>Date: <strong>${date}</strong></li>
                    <li>Détails: <strong>${comment}</strong></li>
                    </ul>
                </main>
            `
        })

        res.json({ message: message('cms.frontend.messages.quote.success', 'success') })
    } catch (error) {
        handleError(res, error)
    }
}