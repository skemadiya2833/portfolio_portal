import { ProjectsType } from "@/types/ProjectsType";
import { updateProjectSuccess } from "../../slices/projectSlice";
import { CallEffect, PutEffect, call, put } from "redux-saga/effects";
import { CommonHeaders } from "@/util/headers";
import ApiRequest from "@/util/api";
import { setErrors } from "../../slices/errorSlice";

export default function* updateProjectSaga(action: { type: string; payload: { data: ProjectsType, projectId: string, token: string, image: File } }): Generator<CallEffect<Response> | PutEffect | Promise<string>, void, ProjectsType> {
    const formData = new FormData();
    formData.append('projectData', JSON.stringify(action.payload.data));
    formData.append('image', action.payload.image);
    const requestData: RequestInit = {
        method: 'PUT',
        headers: {
            ...CommonHeaders(),
            'Authorization': `Bearer ${action.payload.token}`,
        },
        body: formData,
    }
    try {
        const responseJson = yield call(ApiRequest, `/user/project/${action.payload.projectId}`, requestData);
        yield put(updateProjectSuccess(responseJson));
    } catch (error: unknown) {
        yield put(setErrors((error as Error).message));
    }
}