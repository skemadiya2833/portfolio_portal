import { setErrors } from "@/redux/slices/errorSlice";
import { reorderProjectDataSuccess } from "@/redux/slices/projectDataSlice";
import { EntityReorderType } from "@/types/EntityReorderType";
import ApiRequest from "@/util/api";
import { CommonHeaders } from "@/util/headers";
import { call, CallEffect, put, PutEffect } from "redux-saga/effects";

export default function* reorderProjectDataSaga(action: { type: string; payload: { data: EntityReorderType, token: string } }): Generator<CallEffect<Response> | PutEffect | Promise<string>, void, void> {
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
        yield call(ApiRequest, '/user/projectData/reorder', requestData);
        yield put(reorderProjectDataSuccess());
    } catch (error: unknown) {
        yield put(setErrors((error as Error).message));
    }
}