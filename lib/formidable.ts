import formidable from 'formidable'
import { NextApiRequest } from 'next'
import { Writable } from 'stream'

const formidableConfig = {
    keepExtensions: true,
    maxFileSize: 10_000_000,
    maxFieldsSize: 10_000_000,
    maxFields: 20000,
    allowEmptyFiles: true,
    multiples: false
}

const formidablePromise = (
    req: NextApiRequest,
    opts?: Parameters<typeof formidable>[0]
): Promise<{ fields: formidable.Fields, files: formidable.Files }> => new Promise((accept, reject) => {
    const form = formidable(opts)

    form.parse(req, (err, fields, files) => err ? reject(err) : accept({ fields, files }))
})

export default async function handleRequest(req: NextApiRequest, opts?: formidable.Options) {
    const chunks: never[] = []

    const { fields, files } = await formidablePromise(req, {
        ...formidableConfig,
        ...opts,
    })

    return { fields, files }
}