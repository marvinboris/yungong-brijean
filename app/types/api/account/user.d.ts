import { UserInterface } from "../../../models/user"

type ApiAccountUserType = UserInterface & { role: { features: { _id: Types.ObjectId, prefix: string, access: string[] }[] } }

export default ApiAccountUserType