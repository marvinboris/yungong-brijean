import { NextApiRequest, NextApiResponse } from "next";

import { Project } from "../../app/models";
import ApiMessageType from "../../app/types/api/message";
import ContentType from "../../app/types/content";

import { getCms, handleError } from "../../lib/utils";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ContentType | ApiMessageType>
) {
    try {
        const cms = getCms()
        const projects = await Project.find()

        res.json({ cms, projects: projects.map(item => item.toObject()) })
    } catch (error) {
        handleError(res, error)
    }
}