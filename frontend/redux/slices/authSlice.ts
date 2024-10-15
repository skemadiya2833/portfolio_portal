import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LoginUserPayload } from "@/types/LoginUserPayload";
import { LoginResponseData } from "@/types/LoginResponseData";
import { LoginUserState } from "@/types/states/LoginUserState";

const initialState: LoginUserState = {
    success: false,
    data: null,
};

const loginSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginUserRequest(state, action: PayloadAction<LoginUserPayload>) {
            state.success = false;
        },
        loginUserSuccess(state, action: PayloadAction<LoginResponseData>) {
            state.success = true;
            state.data = action.payload;
        },
        logoutUserRequest(state, action: PayloadAction<{ token: string }>) {
            state.success = false;
        },
        logoutUserSuccess(state) {
            state.success = true;
            state.data = null;
        },
        authUserFailure(state) {
            state.success = false;
            state.data = null;
        },
    },
});

export const { loginUserRequest, loginUserSuccess, authUserFailure, logoutUserRequest, logoutUserSuccess } = loginSlice.actions;
export default loginSlice.reducer;