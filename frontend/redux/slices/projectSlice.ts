import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProjectsType } from "@/types/ProjectsType";
import { ProjectState } from "@/types/states/ProjectState";

const initialState: ProjectState = {
    success: false,
    data: null
}

const projectSlice = createSlice({
    name: 'project',
    initialState,
    reducers: {
        updateProjectState(state, action: PayloadAction<ProjectsType[] | null>) {
            state.success = false;
            state.data = action.payload;
        },
        addProjectRequest(state, action: PayloadAction<{ data: ProjectsType, token: string | null, image: File }>) {
            state.success = false;
        },
        addProjectSuccess(state, action: PayloadAction<ProjectsType>) {
            state.success = true;
            state.data!.unshift(action.payload);
        },
        updateProjectRequest(state, action: PayloadAction<{ data: ProjectsType, projectId: string, token: string | null, image: File }>) {
            state.success = false;
        },
        updateProjectSuccess(state, action: PayloadAction<ProjectsType>) {
            state.success = true;
            const projectIndex = state.data!.findIndex((project) => project.id === action.payload.id);
            state.data![projectIndex] = action.payload;
        },
        removeProjectRequest(state, action: PayloadAction<{ projectId: string, token: string | null }>) {
            state.success = false;
        },
        removeProjectSuccess(state, action: PayloadAction<{ id: string }>) {
            state.success = true;
            const projectIndex = state.data!.findIndex((project) => project.id === action.payload.id);
            state.data!.splice(projectIndex, 1);
        },
        resetProjectSuccess(state) {
            state.success = false;
        }
    }
})

export const { updateProjectState, addProjectRequest, addProjectSuccess, updateProjectRequest, updateProjectSuccess, removeProjectRequest, removeProjectSuccess, resetProjectSuccess } = projectSlice.actions;
export default projectSlice.reducer;