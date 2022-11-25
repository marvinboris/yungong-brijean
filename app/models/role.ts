import { Document, Model, PopulatedDoc, Schema, Types } from "mongoose"

import { FeatureInterface } from './feature';

export interface RoleInterface {
    name: string
    description: string
    features: { feature?: PopulatedDoc<Document<Types.ObjectId> & FeatureInterface>, access: ('c' | 'u' | 'd')[] }[]
    createdAt?: Date
    updatedAt?: Date
}

export const RoleSchema = new Schema<RoleInterface, Model<RoleInterface>>({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    features: [
        {
            feature: {
                type: Types.ObjectId,
                required: true,
                ref: 'Feature'
            },
            access: {
                type: [
                    {
                        type: String,
                        enum: ['c', 'u', 'd']
                    }
                ],
                required: true
            }
        }
    ],
}, { timestamps: true })
