import { LoginResponseData } from "@/types/LoginResponseData";
import { LoginUserPayload } from "@/types/LoginUserPayload";
import { call, CallEffect, put, PutEffect } from "redux-saga/effects";
import { loginUserSuccess } from "../../slices/authSlice";
import { CommonHeaders } from "@/util/headers";
import ApiRequest from "@/util/api";
import { setErrors } from "../../slices/errorSlice";

export default function* loginUserSaga(action: { type: string; payload: LoginUserPayload }): Generator<CallEffect<Response> | PutEffect<{ type: string; payload: LoginResponseData | string; }> | Promise<string>, void, LoginResponseData> {
    const requestData: RequestInit = {
        method: 'POST',
        headers: {
            ...CommonHeaders(),
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(action.payload),
    }
    try {
        const responseJson = yield call(ApiRequest, '/auth/login', requestData);
        yield put(loginUserSuccess(responseJson));
    } catch (error: unknown) {
        yield put(setErrors((error as Error).message));
    }
}