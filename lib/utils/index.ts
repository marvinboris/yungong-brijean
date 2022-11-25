import fs from "fs"
import path from "path"

import formidable from "formidable";
import { NextApiRequest, NextApiResponse } from "next";

import { message } from "../../app/helpers/utils";

import { Admin, User } from "../../app/models";
import ContentType from "../../app/types/content";

export const getCms = (example?: boolean) => {
    const jsonString = fs.readFileSync(path.join(process.cwd(), 'data', example ? 'cms.example.json' : 'cms.json'), {
        encoding: 'utf-8'
    })
    return JSON.parse(jsonString) as ContentType["cms"];
}

export const getAccount = async (req: NextApiRequest) => {
    const { _id, type } = decryptPayload(req)

    let account
    if (type === 'User') account = await User.findById(_id)
    else if (type === 'Admin') account = await Admin.findById(_id)

    return account
}

export const decryptPayload = (req: NextApiRequest) => {
    const str = req.cookies.user as string
    const withoutJ = str.split('').filter((char, i) => i > 1).join('')

    return JSON.parse(withoutJ)
}

export const handleError = (res: NextApiResponse, error: any | { message: string }) => {
    console.log(error)
    res.status(500).send({ message: message(error.message, 'danger') })
}

export const methodNotAllowed = (req: NextApiRequest, res: NextApiResponse) => res.status(405).json({ message: message(`Method ${req.method} not allowed`, 'danger') })

export const updateImage = (photo: formidable.File, instance: any) => {
    if (photo.size > 0) {
        if (instance.photo && instance.photo !== 'backend/user-pic.svg') deleteImage(instance.toObject().photo!)
        return photo.newFilename
    } else {
        fs.unlinkSync(photo.filepath)
        return instance.photo
    }
}

export const deleteImage = (image: string) => {
    const file = path.join(process.cwd(), 'public', image)
    if (fs.existsSync(file) && image !== '/images/backend/user-pic.svg') fs.unlinkSync(file)
}