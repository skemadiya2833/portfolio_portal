import { CallEffect, PutEffect, call, put } from "redux-saga/effects";
import { CommonHeaders } from "@/util/headers";
import ApiRequest from "@/util/api";
import { setErrors } from "../../slices/errorSlice";
import { removeProjectDataSuccess } from "../../slices/projectDataSlice";

export default function* removeProjectDataSaga(action: { type: string; payload: { projectDataId: string, token: string } }): Generator<CallEffect<Response> | PutEffect | Promise<string>, void, { id: string }> {
    const requestData = {
        method: 'DELETE',
        headers: {
            ...CommonHeaders(),
            'Authorization': `Bearer ${action.payload.token}`,
        }
    }
    try {
        const responseJson = yield call(ApiRequest, `/user/projectData/${action.payload.projectDataId}`, requestData);
        yield put(removeProjectDataSuccess(responseJson));
    } catch (error: unknown) {
        yield put(setErrors((error as Error).message));
    }
}