import { ProjectDataState } from "@/types/states/ProjectDataState"
import { ProjectDataType } from "@/types/ProjectDataType";
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { EntityReorderType } from "@/types/EntityReorderType";

const initialState: ProjectDataState = {
    success: false,
    data: [],
    projectName: ''
}

const projectDataSlice = createSlice({
    name: 'projectData',
    initialState,
    reducers: {
        updateProjectDataState(state, action: PayloadAction<ProjectDataType[]>) {
            state.success = false;
            state.data = action.payload;
        },
        fetchProjectDataRequest(state, action: PayloadAction<{ username?: string, projectId: string, token: string | null }>) {
            state.success = false;
        },
        fetchProjectDataSuccess(state, action: PayloadAction<{ projectName: string, projectData: ProjectDataType[] }>) {
            state.success = true;
            state.data = action.payload.projectData;
            state.projectName = action.payload.projectName;
        },
        addProjectDataRequest(state, action: PayloadAction<{ data: ProjectDataType, token: string | null, image: File }>) {
            state.success = false;
        },
        addProjectDataSuccess(state, action: PayloadAction<ProjectDataType>) {
            state.success = true;
            state.data.push(action.payload);
        },
        updateProjectDataRequest(state, action: PayloadAction<{ data: ProjectDataType, projectDataId: string, token: string | null, image: File }>) {
            state.success = false;
        },
        updateProjectDataSuccess(state, action: PayloadAction<ProjectDataType>) {
            state.success = true;
            const projectDataIndex = state.data.findIndex((projectData) => projectData.id === action.payload.id);
            state.data![projectDataIndex] = action.payload;
        },
        removeProjectDataRequest(state, action: PayloadAction<{ projectDataId: string, token: string | null }>) {
            state.success = false;
        },
        reorderProjectDataRequest(state, action: PayloadAction<{ data: EntityReorderType, token: string }>) {
            state.success = false;
        },
        reorderProjectDataSuccess(state) {
            state.success = true;
        },
        removeProjectDataSuccess(state, action: PayloadAction<{ id: string }>) {
            state.success = true;
            const projectDataIndex = state.data.findIndex((projectData) => projectData.id === action.payload.id);
            state.data.splice(projectDataIndex, 1);
        },
        resetProjectDataSuccess(state) {
            state.success = false;
        }
    }
})

export const { updateProjectDataState, fetchProjectDataRequest, fetchProjectDataSuccess, addProjectDataRequest, addProjectDataSuccess, updateProjectDataRequest, updateProjectDataSuccess, reorderProjectDataRequest, reorderProjectDataSuccess, removeProjectDataRequest, removeProjectDataSuccess, resetProjectDataSuccess } = projectDataSlice.actions;
export default projectDataSlice.reducer;