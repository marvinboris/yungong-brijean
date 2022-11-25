import { NextApiRequest, NextApiResponse, PageConfig } from "next";

import { getCms, handleError, methodNotAllowed } from "../../../../../lib/utils";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<unknown | { error: string }>
) {
    // const type = req.query.manager as string
    try {
        const cms = getCms()
        const cmsExample = getCms(true)
        // const manager = await getAccount(req)

        if (req.method === 'GET') return res.json({ cms, cmsExample })
        else methodNotAllowed(req, res)
    } catch (error) {
        handleError(res, error)
    }
}