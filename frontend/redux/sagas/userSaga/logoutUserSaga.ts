import { LoginResponseData } from "@/types/LoginResponseData";
import { call, CallEffect, put, PutEffect } from "redux-saga/effects";
import { logoutUserSuccess } from "../../slices/authSlice";
import { CommonHeaders } from "@/util/headers";
import ApiRequest from "@/util/api";
import { setErrors } from "../../slices/errorSlice";

export default function* logoutUserSaga(action: { type: string; payload: { token: string } }): Generator<CallEffect<Response> | PutEffect | Promise<string>, void, LoginResponseData> {
    const requestData: RequestInit = {
        method: 'POST',
        headers: {
            ...CommonHeaders(),
            'Authorization': `Bearer ${action.payload.token}`,
        }
    }
    try {
        yield call(ApiRequest, '/user/logout', requestData);
        yield put(logoutUserSuccess());
    } catch (error: unknown) {
        yield put(setErrors((error as Error).message));
    }
}