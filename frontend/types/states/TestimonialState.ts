import { TestimonialType } from "@/types/TestimonialType"

export type TestimonialState = {
    success: boolean,
    data: TestimonialType[] | null
}