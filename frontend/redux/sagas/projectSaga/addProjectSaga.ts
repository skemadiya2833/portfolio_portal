import { ProjectsType } from "@/types/ProjectsType";
import { call, CallEffect, put, PutEffect } from "redux-saga/effects";
import { addProjectSuccess } from "../../slices/projectSlice";
import { CommonHeaders } from "@/util/headers";
import ApiRequest from "@/util/api";
import { setErrors } from "../../slices/errorSlice";

export default function* addProjectSaga(action: { type: string; payload: { data: ProjectsType, token: string, image: File } }): Generator<CallEffect<Response> | PutEffect | Promise<string>, void, ProjectsType> {
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
        const responseJson = yield call(ApiRequest, '/user/project', requestData);
        yield put(addProjectSuccess(responseJson));
    } catch (error: unknown) {
        yield put(setErrors((error as Error).message));
    }
}