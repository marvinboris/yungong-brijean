import { NextApiRequest, NextApiResponse, PageConfig } from "next";

import { message } from "../../../../../app/helpers/utils";

import handleRequest from "../../../../../lib/formidable";
import { getCms, handleError, methodNotAllowed } from "../../../../../lib/utils";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<unknown | { error: string }>
) {
    // const type = req.query.manager as string
    const slug = req.query.slug as string[]

    try {
        const cms = getCms()
        const cmsExample = getCms(true)
        // const manager = await getAccount(req)

        if (req.method === 'PATCH') {
            const { fields } = await handleRequest(req)
            console.log(fields)

            res.json({ cms, cmsExample, message: message(cms.backend.messages.cms.updated, 'success') })
        }
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