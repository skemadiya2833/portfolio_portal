import { LoginResponseData } from "../LoginResponseData"

export type LoginUserState = {
    success: boolean,
    data: LoginResponseData | null
}