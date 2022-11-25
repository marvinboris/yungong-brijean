import { NextApiRequest, NextApiResponse } from "next";

import { Project, User } from "../../../../app/models";

import { getAccount, getCms, handleError } from "../../../../lib/utils";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<unknown | { error: string }>
) {
    try {
        const cms = getCms()
        const manager = await getAccount(req)

        const users = await User.count()
        const projects = await Project.count()

        res.json({
            blocks: { users, projects },
        })
    } catch (error) {
        handleError(res, error)
    }
}