import { SocialMediaType } from "@/types/SocialMediaType"

export type SocialMediaState = {
    success: boolean,
    data: SocialMediaType[] | null
}