import dotenv from 'dotenv'
import mongoose from "mongoose";

import { Feature, Project, Role, User } from './app/models';

import featuresSeed from "./app/seeders/features";
import projectsSeed from './app/seeders/projects';
import rolesSeed from "./app/seeders/roles";
import usersSeed from "./app/seeders/users";

dotenv.config({ path: './.env.local' })

mongoose.connect(process.env.MONGODB_URI!)
    .catch(error => {
        console.log(error.message)
        process.exit(1)
    })
    .then(async () => {
        console.log('Connected for seeding DB.')

        if (process.argv[2] === '-d') await destroyData()
        else await importData()

        mongoose.disconnect()
    })

const importData = async () => {
    try {
        await Feature.deleteMany()
        await Role.deleteMany()
        await Project.deleteMany()
        await User.deleteMany()

        await featuresSeed()
        await rolesSeed()
        await projectsSeed()
        await usersSeed()

        console.log("DB seeded")
        process.exit(0)
    } catch (error) {
        console.log("DB not seeded", error)
        process.exit(1)
    }
}

const destroyData = async () => {
    try {
        await Feature.deleteMany()
        await Role.deleteMany()
        await Project.deleteMany()
        await User.deleteMany()

        console.log("Data destroyed")
        process.exit(0)
    } catch (error) {
        console.log("Data not destroyed", error)
        process.exit(1)
    }
}