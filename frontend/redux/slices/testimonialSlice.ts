import { TestimonialState } from "@/types/states/TestimonialState";
import { TestimonialType } from "@/types/TestimonialType";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: TestimonialState = {
    success: false,
    data: null
}

const testimonialSlice = createSlice({
    name: 'testimonial',
    initialState,
    reducers: {
        updateTestimonialState(state, action: PayloadAction<TestimonialType[] | null>) {
            state.success = false;
            state.data = action.payload;
        },
        addTestimonialRequest(state, action: PayloadAction<{ data: TestimonialType, token: string | null }>) {
            state.success = false;
        },
        addTestimonialSuccess(state, action: PayloadAction<TestimonialType>) {
            state.success = true;
            state.data?.unshift(action.payload);
        },
        updateTestimonialRequest(state, action: PayloadAction<{ data: TestimonialType, testimonialId: string, token: string | null }>) {
            state.success = false;
        },
        updateTestimonialSuccess(state, action: PayloadAction<TestimonialType>) {
            state.success = true;
            const testimonialIndex = state.data!.findIndex((testimonial) => testimonial.id === action.payload.id);
            state.data![testimonialIndex] = action.payload;
        },
        removeTestimonialRequest(state, action: PayloadAction<{ testimonialId: string, token: string | null }>) {
            state.success = false;
        },
        removeTestimonialSuccess(state, action: PayloadAction<{ id: string }>) {
            state.success = true;
            const testimonialIndex = state.data!.findIndex((testimonial) => testimonial.id === action.payload.id);
            state.data!.splice(testimonialIndex, 1);
        },
        resetTestimonialSuccess(state) {
            state.success = false;
        }
    }
})

export const { updateTestimonialState, addTestimonialRequest, addTestimonialSuccess, updateTestimonialRequest, updateTestimonialSuccess, removeTestimonialRequest, removeTestimonialSuccess, resetTestimonialSuccess } = testimonialSlice.actions;
export default testimonialSlice.reducer;