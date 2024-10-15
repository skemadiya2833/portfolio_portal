import { SkillsType } from "@/types/SkillsType";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SkillState } from "@/types/states/SkillState";

const initialState: SkillState = {
    success: false,
    data: null
}

const skillSlice = createSlice({
    name: 'skill',
    initialState,
    reducers: {
        updateSkillState(state, action: PayloadAction<SkillsType[] | null>) {
            state.success = false;
            state.data = action.payload;
        },
        addSkillRequest(state, action: PayloadAction<{ data: SkillsType, token: string | null }>) {
            state.success = false;
        },
        addSkillSuccess(state, action: PayloadAction<SkillsType>) {
            state.success = true;
            state.data?.unshift(action.payload);
        },
        updateSkillRequest(state, action: PayloadAction<{ data: SkillsType, skillId: string, token: string | null }>) {
            state.success = false;
        },
        updateSkillSuccess(state, action: PayloadAction<SkillsType>) {
            state.success = true;
            const skillIndex = state.data!.findIndex((skill) => skill.id === action.payload.id);
            state.data![skillIndex] = action.payload;
        },
        removeSkillRequest(state, action: PayloadAction<{ skillId: string, token: string | null }>) {
            state.success = false;
        },
        removeSkillSuccess(state, action: PayloadAction<{ id: string }>) {
            state.success = true;
            const skillIndex = state.data!.findIndex((skill) => skill.id === action.payload.id);
            state.data!.splice(skillIndex, 1);
        },
        resetSkillSuccess(state) {
            state.success = false;
        }
    }
})

export const { updateSkillState, addSkillRequest, addSkillSuccess, updateSkillRequest, updateSkillSuccess, removeSkillRequest, removeSkillSuccess, resetSkillSuccess } = skillSlice.actions;
export default skillSlice.reducer;