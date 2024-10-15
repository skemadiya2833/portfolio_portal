import { ImageType } from "./ImageType"

export type ProjectDataType = {
    id: string,
    heading: string,
    description: string,
    image: File | ImageType,
    project: {
        id: string
    }
}