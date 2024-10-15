import { CallEffect, PutEffect, call, put } from "redux-saga/effects";
import { removeProjectSuccess } from "../../slices/projectSlice";
import { CommonHeaders } from "@/util/headers";
import ApiRequest from "@/util/api";
import { setErrors } from "../../slices/errorSlice";

export default function* removeProjectSaga(action: { type: string; payload: { projectId: string, token: string } }): Generator<CallEffect<Response> | PutEffect | Promise<string>, void, { id: string }> {
    const requestData = {
        method: 'DELETE',
        headers: {
            ...CommonHeaders(),
            'Authorization': `Bearer ${action.payload.token}`,
        }
    }
    try {
        const responseJson = yield call(ApiRequest, `/user/project/${action.payload.projectId}`, requestData);
        yield put(removeProjectSuccess(responseJson));
    } catch (error: unknown) {
        yield put(setErrors((error as Error).message));
    }
}