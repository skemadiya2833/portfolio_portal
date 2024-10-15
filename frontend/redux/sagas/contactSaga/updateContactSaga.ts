import { ContactType } from "@/types/ContactType";
import ApiRequest from "@/util/api";
import { CommonHeaders } from "@/util/headers";
import { call, CallEffect, put, PutEffect } from "redux-saga/effects";
import { contactSuccess } from "../../slices/contactSlice";
import { setErrors } from "../../slices/errorSlice";

export default function* updateContactSaga(action: { type: string; payload: { data: ContactType, contactId: string, token: string } }): Generator<CallEffect<Response> | PutEffect | Promise<string>, void, ContactType> {
    const requestData: RequestInit = {
        method: 'PUT',
        headers: {
            ...CommonHeaders(),
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${action.payload.token}`,
        },
        body: JSON.stringify(action.payload.data),
    }
    try {
        const responseJson = yield call(ApiRequest, `/user/contact/${action.payload.contactId}`, requestData);
        yield put(contactSuccess(responseJson));
    } catch (error: unknown) {
        yield put(setErrors((error as Error).message));
    }
}