import { Model, Schema, Types } from "mongoose"

const directory = '/images/users/'

export interface UserInterface {
    name: string
    email: string
    password: string
    photo?: string
    phone: string
    role?: Types.ObjectId
    locale?: string
    createdAt?: Date
    updatedAt?: Date
}

export const UserSchema = new Schema<UserInterface, Model<UserInterface>>({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        get: (photo: string) => photo === 'backend/user-pic.svg' ? `/images/${photo}` : directory + photo,
        default: 'backend/user-pic.svg'
    },
    phone: {
        type: String,
        required: true
    },
    role: {
        type: Types.ObjectId,
        required: true,
        ref: 'Role'
    },
    locale: {
        type: String,
        enum: ['fr'],
        required: true,
        default: 'fr'
    },
}, { timestamps: true, toObject: { getters: true } })