import { ProjectsType } from "@/types/ProjectsType"

export type ProjectState = {
    success: boolean,
    data: ProjectsType[] | null
}