import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SocialMediaState } from "@/types/states/SocialMediaState";
import { SocialMediaType } from "@/types/SocialMediaType";

const initialState: SocialMediaState = {
    success: false,
    data: null
}

const socialMediaSlice = createSlice({
    name: 'socialMedia',
    initialState,
    reducers: {
        updateSocialMediaState(state, action: PayloadAction<SocialMediaType[] | null>) {
            state.success = false;
            state.data = action.payload;
        },
        addSocialMediaRequest(state, action: PayloadAction<{ data: SocialMediaType, token: string | null }>) {
            state.success = false;
        },
        addSocialMediaSuccess(state, action: PayloadAction<SocialMediaType>) {
            state.success = true;
            state.data?.unshift(action.payload);
        },
        updateSocialMediaRequest(state, action: PayloadAction<{ data: SocialMediaType, socialMediaId: string, token: string | null }>) {
            state.success = false;
        },
        updateSocialMediaSuccess(state, action: PayloadAction<SocialMediaType>) {
            state.success = true;
            const socialMediaIndex = state.data!.findIndex((socialMedia) => socialMedia.id === action.payload.id);
            state.data![socialMediaIndex] = action.payload;
        },
        removeSocialMediaRequest(state, action: PayloadAction<{ socialMediaId: string, token: string | null }>) {
            state.success = false;
        },
        removeSocialMediaSuccess(state, action: PayloadAction<{ id: string }>) {
            state.success = true;
            const socialMediaIndex = state.data!.findIndex((socialMedia) => socialMedia.id === action.payload.id);
            state.data!.splice(socialMediaIndex, 1);
        },
        resetSocialMediaSuccess(state) {
            state.success = false;
        }
    }
})

export const { updateSocialMediaState, addSocialMediaRequest, addSocialMediaSuccess, updateSocialMediaRequest, updateSocialMediaSuccess, removeSocialMediaRequest, removeSocialMediaSuccess, resetSocialMediaSuccess } = socialMediaSlice.actions;
export default socialMediaSlice.reducer;