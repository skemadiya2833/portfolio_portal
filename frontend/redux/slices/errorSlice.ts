import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: Record<string, string> = {};

const errorSlice = createSlice({
    name: 'error',
    initialState,
    reducers: {
        setErrors(state, action: PayloadAction<string>) {
            return JSON.parse(action.payload);
        },
        addError(state, action: PayloadAction<Record<string, string>>) {
            return {
                ...state,
                ...action.payload
            }
        },
        clearError(state, action: PayloadAction<string>) {
            delete state[action.payload];
        },
        clearAllErrors(state) {
            return initialState
        }
    }
})

export const { setErrors, addError, clearError, clearAllErrors } = errorSlice.actions
export default errorSlice.reducer