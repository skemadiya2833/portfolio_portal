import { SkillsType } from "@/types/SkillsType";
import { call, CallEffect, put, PutEffect } from "redux-saga/effects";
import { addSkillSuccess } from "../../slices/skillSlice";
import { CommonHeaders } from "@/util/headers";
import ApiRequest from "@/util/api";
import { setErrors } from "../../slices/errorSlice";

export default function* addSkillSaga(action: { type: string; payload: { data: SkillsType, token: string } }): Generator<CallEffect<Response> | PutEffect | Promise<string>, void, SkillsType> {
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
        const responseJson = yield call(ApiRequest, '/user/skill', requestData);
        yield put(addSkillSuccess(responseJson));
    } catch (error: unknown) {
        yield put(setErrors((error as Error).message));
    }
}