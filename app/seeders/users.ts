import bcrypt from 'bcryptjs'

import { Role, User } from '../models';
import type { UserInterface } from "../models/user";

const users: UserInterface[] = [
    { name: 'Boris Ndouma', email: 'jaris.ultio.21@gmail.com', password: '12345', phone: '237655588688' },
    { name: 'Survey', email: 'contact@survey.com', password: '12345', phone: '237655588688' },
]

export default async function usersSeed() {
    const role = await Role.findOne()
    const data = await Promise.all(users.map(async user => {
        const password = await bcrypt.hash(user.password, 12)
        const data = { ...user, password, role: role!._id }
        return data
    }))
    
    await User.insertMany(data)
}