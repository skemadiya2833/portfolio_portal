import { combineReducers } from "@reduxjs/toolkit"
import loginSlice from "./slices/authSlice"
import registerSlice from "./slices/registerSlice"
import loadingSlice from "./slices/loadingSlice"
import fetchUserSlice from "./slices/fetchUserSlice"
import aboutMeSlice from "./slices/aboutMeSlice"
import skillSlice from "./slices/skillSlice"
import projectSlice from "./slices/projectSlice"
import projectDataSlice from "./slices/projectDataSlice"
import errorSlice from "./slices/errorSlice"
import contactSlice from "./slices/contactSlice"
import socialMediaSlice from "./slices/socialMediaSlice"
import testimonialSlice from "./slices/testimonialSlice"
import resumeSlice from "./slices/resumeSlice"

const rootReducer = combineReducers({
    register: registerSlice,
    login: loginSlice,
    loading: loadingSlice,
    user: fetchUserSlice,
    aboutMe: aboutMeSlice,
    skill: skillSlice,
    project: projectSlice,
    projectData: projectDataSlice,
    testimonial: testimonialSlice,
    contact: contactSlice,
    socialMedia: socialMediaSlice,
    error: errorSlice,
    resume: resumeSlice
})

export default rootReducer;
