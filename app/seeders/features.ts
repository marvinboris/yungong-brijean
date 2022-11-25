import { Feature } from "../models";
import { FeatureInterface } from "../models/feature";

const features: FeatureInterface[] = [
    { name: 'CMS', prefix: 'cms' },
    { name: 'Users', prefix: 'users' },
    { name: 'Roles', prefix: 'roles' },
    { name: 'Images', prefix: 'images' },
    { name: 'Features', prefix: 'features' },
    { name: 'Services', prefix: 'services' },
    { name: 'Products', prefix: 'products' },
    { name: 'Testimonials', prefix: 'testimonials' },
]

export default async function featuresSeed() {
    await Feature.insertMany(features)
}