import { Model, Schema } from "mongoose"

const directory = '/images/projects/'

export interface ProjectInterface {
    id?: string
    name: string
    description: string
    link: string
    photo?: string
    createdAt?: Date
    updatedAt?: Date
}

export const ProjectSchema = new Schema<ProjectInterface, Model<ProjectInterface>>({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: true,
        get: (photo: string) => directory + photo
    },
}, { timestamps: true, toObject: { getters: true, virtuals: true } })