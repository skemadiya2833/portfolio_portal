import { RegisterUserPayload } from "@/types/RegisterUserPayload";
import { registerUserFailure, registerUserSuccess } from "../../slices/registerSlice";
import { call, CallEffect, put, PutEffect } from "redux-saga/effects";
import ApiRequest from "@/util/api";
import { CommonHeaders } from "@/util/headers";
import { setErrors } from "../../slices/errorSlice";

export default function* registerUserSaga(action: { type: string; payload: RegisterUserPayload }): Generator<CallEffect<Response> | PutEffect | Promise<string>, void, Response> {
    const requestData: RequestInit = {
        method: 'POST',
        headers: {
            ...CommonHeaders(),
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(action.payload),
    }
    try {
        yield call(ApiRequest, '/auth/register', requestData);
        yield put(registerUserSuccess());
    } catch (error: unknown) {
        yield put(setErrors((error as Error).message));
    }
}