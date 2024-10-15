import { call, CallEffect, put, PutEffect } from "redux-saga/effects";
import { removeSkillSuccess } from "../../slices/skillSlice";
import { CommonHeaders } from "@/util/headers";
import ApiRequest from "@/util/api";
import { setErrors } from "../../slices/errorSlice";

export default function* removeSkillSaga(action: { type: string; payload: { skillId: string, token: string } }): Generator<CallEffect<Response> | PutEffect | Promise<string>, void, { id: string }> {
    const requestData: RequestInit = {
        method: 'DELETE',
        headers: {
            ...CommonHeaders(),
            'Authorization': `Bearer ${action.payload.token}`,
        }
    }
    try {
        const responseJson = yield call(ApiRequest, `/user/skill/${action.payload.skillId}`, requestData);
        yield put(removeSkillSuccess(responseJson));
    } catch (error: unknown) {
        yield put(setErrors((error as Error).message));
    }
}