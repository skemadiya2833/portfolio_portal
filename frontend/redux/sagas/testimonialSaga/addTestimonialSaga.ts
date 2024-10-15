import { TestimonialType } from "@/types/TestimonialType";
import ApiRequest from "@/util/api";
import { CommonHeaders } from "@/util/headers";
import { call, CallEffect, put, PutEffect } from "redux-saga/effects";
import { addTestimonialSuccess } from "../../slices/testimonialSlice";
import { setErrors } from "../../slices/errorSlice";

export default function* addTestimonialSaga(action: { type: string; payload: { data: TestimonialType, token: string } }): Generator<CallEffect<Response> | PutEffect | Promise<string>, void, TestimonialType> {
    const requestData: RequestInit = {
        method: 'POST',
        headers: {
            ...CommonHeaders(),
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${action.payload.token}`,
        },
        body: JSON.stringify(action.payload.data),
    }
    try {
        const responseJson = yield call(ApiRequest, '/user/testimonial', requestData);
        yield put(addTestimonialSuccess(responseJson));
    } catch (error: unknown) {
        yield put(setErrors((error as Error).message));
    }
}