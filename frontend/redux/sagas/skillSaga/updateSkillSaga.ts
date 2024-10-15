import { SkillsType } from "@/types/SkillsType";
import { call, CallEffect, put, PutEffect } from "redux-saga/effects";
import { updateSkillSuccess } from "../../slices/skillSlice";
import { CommonHeaders } from "@/util/headers";
import ApiRequest from "@/util/api";
import { setErrors } from "../../slices/errorSlice";

export default function* updateSkillSaga(action: { type: string; payload: { data: SkillsType, skillId: string, token: string } }): Generator<CallEffect<Response> | PutEffect | Promise<string>, void, SkillsType> {
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
        const responseJson = yield call(ApiRequest, `/user/skill/${action.payload.skillId}`, requestData);
        yield put(updateSkillSuccess(responseJson));
    } catch (error: unknown) {
        yield put(setErrors((error as Error).message));
    }
}