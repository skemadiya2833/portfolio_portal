import { AboutMeType } from "@/types/AboutMeType";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { userInitialState } from "../rootInitialState";
import { UserResponseType } from "@/types/UserResponseType";
import { AboutMeState } from "@/types/states/AboutMeState";

const initialState : AboutMeState = {
    data : null,
    success: false
}

const aboutMeSlice = createSlice({
    name: 'aboutMe',
    initialState,
    reducers: {
        updateAboutMeState(state, action: PayloadAction<AboutMeType | null>) {
            state.success = false;
            state.data = action.payload;
        },
        saveAboutMeRequest(state, action: PayloadAction<{ data: AboutMeType, token: string, image: File }>) {
            state.success = false;
        },
        updateAboutMeRequest(state, action: PayloadAction<{ data: AboutMeType, aboutMeId: string, token: string, image: File }>) {
            state.success = false;
        },
        aboutMeSuccess(state, action: PayloadAction<AboutMeType>) {
            state.success = true;
            state.data = action.payload;
        },
        resetAboutMeSuccess(state) {
            state.success = false;
        }
    }
});

export const { updateAboutMeState, saveAboutMeRequest, updateAboutMeRequest, aboutMeSuccess, resetAboutMeSuccess } = aboutMeSlice.actions;
export default aboutMeSlice.reducer;