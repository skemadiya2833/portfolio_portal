import ApiRequest from "@/util/api";
import { CommonHeaders } from "@/util/headers";
import { call, CallEffect, put, PutEffect } from "redux-saga/effects";
import { removeSocialMediaSuccess } from "../../slices/socialMediaSlice";
import { setErrors } from "../../slices/errorSlice";

export default function* removeSocialMediaSaga(action: { type: string; payload: { socialMediaId: string, token: string } }): Generator<CallEffect<Response> | PutEffect | Promise<string>, void, { id: string }> {
    const requestData: RequestInit = {
        method: 'DELETE',
        headers: {
            ...CommonHeaders(),
            'Authorization': `Bearer ${action.payload.token}`,
        }
    }
    try {
        const responseJson = yield call(ApiRequest, `/user/socialMedia/${action.payload.socialMediaId}`, requestData);
        yield put(removeSocialMediaSuccess(responseJson));
    } catch (error: unknown) {
        yield put(setErrors((error as Error).message));
    }
}