import { AboutMeType } from "@/types/AboutMeType";
import { ContactType } from "@/types/ContactType";
import { ProjectsType } from "@/types/ProjectsType";
import { ResumeType } from "@/types/ResumeType";
import { SkillsType } from "@/types/SkillsType";
import { TestimonialType } from "@/types/TestimonialType";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: ResumeType = {
    aboutMe: null,
    contact: null,
    projects: [],
    testimonials: [],
    skills: []
}

const resumeSlice = createSlice({
    name: 'resume',
    initialState,
    reducers: {
        updateResumeState(state, action: PayloadAction<ResumeType>) {
            return action.payload;
        },
        updateResumeData(state, action: PayloadAction<{ key: string, value: AboutMeType | ContactType | ProjectsType[] | TestimonialType[] | SkillsType[] | null }>) {
            return { ...state, [action.payload.key]: action.payload.value };
        }
    }
})

export const { updateResumeState, updateResumeData } = resumeSlice.actions;
export default resumeSlice.reducer;