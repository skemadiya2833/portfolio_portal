import { RegisterUserPayload } from '@/types/RegisterUserPayload';
import { RegisterUserState } from '@/types/states/RegisterUserState';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: RegisterUserState = {
    success: false,
};

const registerSlice = createSlice({
    name: 'register',
    initialState,
    reducers: {
        registerUserRequest(state, action: PayloadAction<RegisterUserPayload>) {
            state.success = false;
        },
        registerUserSuccess(state) {
            state.success = true;
        },
        registerUserFailure(state) {
            state.success = false;
        },
    },
});

export const { registerUserRequest, registerUserSuccess, registerUserFailure } = registerSlice.actions;
export default registerSlice.reducer;