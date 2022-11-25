import { Feature, Role } from "../models";
import { RoleInterface } from "../models/role";

const roles: RoleInterface[] = [
    { name: 'Manager', description: 'Maximum access level', features: [] },
]

export default async function rolesSeed() {
    const features = await Feature.find()
    await Role.insertMany(roles.map(role => ({ ...role, features: features.map(f => ({ feature: f._id, access: ['c', 'u', 'd'] })) })))
}