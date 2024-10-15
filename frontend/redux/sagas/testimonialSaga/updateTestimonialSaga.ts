import { TestimonialType } from "@/types/TestimonialType";
import ApiRequest from "@/util/api";
import { CommonHeaders } from "@/util/headers";
import { call, CallEffect, put, PutEffect } from "redux-saga/effects";
import { updateTestimonialSuccess } from "../../slices/testimonialSlice";
import { setErrors } from "../../slices/errorSlice";

export default function* updateTestimonialSaga(action: { type: string; payload: { data: TestimonialType, testimonialId: string, token: string } }): Generator<CallEffect<Response> | PutEffect, void, TestimonialType> {
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
        const responseJson = yield call(ApiRequest, `/user/testimonial/${action.payload.testimonialId}`, requestData);
        yield put(updateTestimonialSuccess(responseJson));
    } catch (error: unknown) {
        yield put(setErrors((error as Error).message));
    }
}