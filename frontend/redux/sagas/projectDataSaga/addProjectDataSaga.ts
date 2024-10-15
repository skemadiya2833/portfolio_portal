import { call, CallEffect, put, PutEffect } from "redux-saga/effects";
import { CommonHeaders } from "@/util/headers";
import ApiRequest from "@/util/api";
import { setErrors } from "../../slices/errorSlice";
import { ProjectDataType } from "@/types/ProjectDataType";
import { addProjectDataSuccess } from "../../slices/projectDataSlice";

export default function* addProjectDataSaga(action: { type: string; payload: { data: ProjectDataType, token: string, image: File } }): Generator<CallEffect<Response> | PutEffect | Promise<string>, void, ProjectDataType> {
    const formData = new FormData();
    formData.append('projectData', JSON.stringify(action.payload.data));
    formData.append('image', action.payload.image);
    const requestData: RequestInit = {
        method: 'POST',
        headers: {
            ...CommonHeaders(),
            'Authorization': `Bearer ${action.payload.token}`,
        },
        body: formData,
    }
    try {
        const responseJson = yield call(ApiRequest, '/user/projectData', requestData);
        yield put(addProjectDataSuccess(responseJson));
    } catch (error: unknown) {
        yield put(setErrors((error as Error).message));
    }
}