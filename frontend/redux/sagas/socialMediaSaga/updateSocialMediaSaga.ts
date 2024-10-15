import { SocialMediaType } from "@/types/SocialMediaType";
import ApiRequest from "@/util/api";
import { CommonHeaders } from "@/util/headers";
import { call, CallEffect, put, PutEffect } from "redux-saga/effects";
import { updateSocialMediaSuccess } from "../../slices/socialMediaSlice";
import { setErrors } from "../../slices/errorSlice";

export default function* updateSocialMediaSaga(action: { type: string; payload: { data: SocialMediaType, socialMediaId: string, token: string } }): Generator<CallEffect<Response> | PutEffect | Promise<string>, void, SocialMediaType> {
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
        const responseJson = yield call(ApiRequest, `/user/socialMedia/${action.payload.socialMediaId}`, requestData);
        yield put(updateSocialMediaSuccess(responseJson));
    } catch (error: unknown) {
        yield put(setErrors((error as Error).message));
    }
}