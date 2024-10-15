import { call, put, CallEffect, PutEffect } from "redux-saga/effects";
import { fetchProjectDataSuccess } from "../../slices/projectDataSlice";
import { ProjectDataType } from "@/types/ProjectDataType";
import ApiRequest from "@/util/api";
import { CommonHeaders } from "@/util/headers";
import { setErrors } from "../../slices/errorSlice";

export default function* fetchProjectDataSaga(action: { type: string; payload: { username?: string, projectId: string, token?: string } }): Generator<CallEffect<Response> | PutEffect | Promise<string>, void, { projectName: string, projectData: ProjectDataType[] }> {
    const requestData: RequestInit = {
        method: 'GET',
        headers: {
            ...CommonHeaders(),
            ...(action.payload.token && { 'Authorization': `Bearer ${action.payload.token}` })
        },
    }
    try {
        const responseJson = yield call(ApiRequest,
            action.payload.token ?
                `/user/projectData/${action.payload.projectId}`
                : `/user/portfolio/${action.payload.username}/${action.payload.projectId}`,
            requestData
        )
        yield put(fetchProjectDataSuccess(responseJson));
    } catch (error: unknown) {
        yield put(setErrors((error as Error).message));
    }
}