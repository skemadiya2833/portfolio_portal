import { SocialMediaType } from "@/types/SocialMediaType";
import ApiRequest from "@/util/api";
import { CommonHeaders } from "@/util/headers";
import { call, CallEffect, put, PutEffect } from "redux-saga/effects";
import { addSocialMediaSuccess } from "../../slices/socialMediaSlice";
import { setErrors } from "../../slices/errorSlice";

export default function* addSocialMediaSaga(action: { type: string; payload: { data: SocialMediaType, token: string } }): Generator<CallEffect<Response> | PutEffect | Promise<string>, void, SocialMediaType> {
    const requestData: RequestInit = {
        method: 'POST',
        headers: {
            ...CommonHeaders(),
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${action.payload.token}`,
        },
        body: JSON.stringify(action.payload.data),
    }
    try {
        const responseJson = yield call(ApiRequest, '/user/socialMedia', requestData);
        yield put(addSocialMediaSuccess(responseJson));
    } catch (error: unknown) {
        yield put(setErrors((error as Error).message));
    }
}