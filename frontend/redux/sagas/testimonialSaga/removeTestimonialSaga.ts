import ApiRequest from "@/util/api";
import { CommonHeaders } from "@/util/headers";
import { call, CallEffect, put, PutEffect } from "redux-saga/effects";
import { removeTestimonialSuccess } from "../../slices/testimonialSlice";
import { setErrors } from "../../slices/errorSlice";

export default function* removeTestimonialSaga(action: { type: string; payload: { testimonialId: string, token: string } }): Generator<CallEffect<Response> | PutEffect | Promise<string>, void, { id: string }> {
    const requestData: RequestInit = {
        method: 'DELETE',
        headers: {
            ...CommonHeaders(),
            'Authorization': `Bearer ${action.payload.token}`,
        }
    }
    try {
        const responseJson = yield call(ApiRequest, `/user/testimonial/${action.payload.testimonialId}`, requestData);
        yield put(removeTestimonialSuccess(responseJson));
    } catch (error: unknown) {
        yield put(setErrors((error as Error).message));
    }
}