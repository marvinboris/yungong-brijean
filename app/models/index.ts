import { Model, model, models } from 'mongoose'

import { AdminInterface, AdminSchema } from './admin'
import { FeatureInterface, FeatureSchema } from './feature'
import { RoleInterface, RoleSchema } from './role'
import { ProjectInterface, ProjectSchema } from './project'
import { UserInterface, UserSchema } from './user'

export const Admin = models.Admin as Model<AdminInterface> || model<AdminInterface>("Admin", AdminSchema)
export const Feature = models.Feature as Model<FeatureInterface> || model<FeatureInterface>("Feature", FeatureSchema)
export const Role = models.Role as Model<RoleInterface> || model<RoleInterface>("Role", RoleSchema)
export const Project = models.Project as Model<ProjectInterface> || model<ProjectInterface>("Project", ProjectSchema)
export const User = models.User as Model<UserInterface> || model<UserInterface>("User", UserSchema)
