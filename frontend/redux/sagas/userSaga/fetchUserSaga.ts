import { UserResponseType } from "@/types/UserResponseType";
import { CallEffect, PutEffect, put, call } from "redux-saga/effects";
import { fetchUserSuccess } from "../../slices/fetchUserSlice";
import { CommonHeaders } from "@/util/headers";
import ApiRequest from "@/util/api";
import { setErrors } from "../../slices/errorSlice";

export default function* fetchUserSaga(action: { type: string; payload: { token: string | null, username: string | null } }): Generator<CallEffect<Response> | PutEffect | Promise<string>, void, UserResponseType> {
    const requestData: RequestInit = {
        method: 'GET',
        headers: {
            ...CommonHeaders(),
            ...(action.payload.token && { 'Authorization': `Bearer ${action.payload.token}` }),
        },
    }
    try {
        const responseJson = yield call(ApiRequest,
            action.payload.token ?
                `/user`
                : `/user/portfolio/${action.payload.username}`,
            requestData
        );
        yield put(fetchUserSuccess(responseJson));
    } catch (error: unknown) {
        yield put(setErrors((error as Error).message));
    }
}