import { ProjectDataType } from "../ProjectDataType";

export type ProjectDataState = {
    success: boolean,
    data: ProjectDataType[],
    projectName: string
}