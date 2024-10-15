import { UserResponseType } from "../UserResponseType"

export type UserPortfolioState = {
    success: boolean,
    user: UserResponseType | null,
    token: string | null
}