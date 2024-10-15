import { ImageType } from "./ImageType"

export type AboutMeType = {
    id: string,
    name: string,
    description: string,
    skills: string,
    image: ImageType | File | null
}