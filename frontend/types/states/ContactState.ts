import { ContactType } from "../ContactType"

export type ContactState = {
    success: boolean,
    data: ContactType | null
}