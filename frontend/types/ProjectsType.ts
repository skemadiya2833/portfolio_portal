import { ImageType } from "./ImageType"

export type ProjectsType = {
    id: string,
    name: string,
    briefDetail: string,
    image: ImageType | File,
}