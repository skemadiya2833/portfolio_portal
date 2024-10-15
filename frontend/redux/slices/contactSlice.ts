import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { userInitialState } from "../rootInitialState";
import { ContactType } from "@/types/ContactType";
import { UserResponseType } from "@/types/UserResponseType";
import { ContactState } from "@/types/states/ContactState";

const initialState : ContactState = {
    data: null,
    success: false
}

const contactSlice = createSlice({
    name: 'contact',
    initialState,
    reducers: {
        updateContactState(state, action: PayloadAction<ContactType | null>) {
            state.success = false;
            state.data = action.payload;
        },
        saveContactRequest(state, action: PayloadAction<{ data: ContactType, token: string }>) {
            state.success = false;
        },
        updateContactRequest(state, action: PayloadAction<{ data: ContactType, contactId: string, token: string }>) {
            state.success = false;
        },
        contactSuccess(state, action: PayloadAction<ContactType>) {
            state.success = true;
            state.data = action.payload;
        },
        resetContactSuccess(state) {
            state.success = false;
        }
    }
});

export const { updateContactState, saveContactRequest, updateContactRequest, contactSuccess, resetContactSuccess } = contactSlice.actions;
export default contactSlice.reducer;
