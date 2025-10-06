import { User } from "src/User/entity/User.entity"

export interface RefreshTokenBody {
    id: string
    role: string,
    user : User
}