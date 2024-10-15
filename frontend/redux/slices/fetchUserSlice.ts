import { UserResponseType } from "@/types/UserResponseType";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { userInitialState } from "../rootInitialState";
const fetchUserSlice = createSlice({
    name: 'user',
    initialState: userInitialState,
    reducers: {
        updateUserData(state, action: PayloadAction<UserResponseType | null>) {
            state.success = false;
            state.user = action.payload;
        },
        fetchUserData(state, action: PayloadAction<{ token: string | null, username: string | null }>) {
            state.success = false;
            state.token = action.payload.token;
        },
        fetchUserSuccess(state, action: PayloadAction<UserResponseType>) {
            state.success = true;
            state.user = action.payload;
        },
        fetchUserFailure(state) {
            state.success = false;
            state.user = null;
        }
    }
});

export const { updateUserData, fetchUserData, fetchUserSuccess, fetchUserFailure } = fetchUserSlice.actions;
export default fetchUserSlice.reducer;