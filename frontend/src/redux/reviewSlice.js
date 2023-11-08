import { createSlice } from "@reduxjs/toolkit";
const reviewSlice = createSlice({
    name: "review",
    initialState: {
        review: {
            data: null,
            isLoading: false,
            error: false
        },
    },
    reducers: {
        getReviewStart: (state) => {
            state.review.isLoading = true
        },
        getReviewSuccess: (state, action) => {
            state.review.isLoading = false;
            state.review.data = action.payload;
        },
        getReviewFailed: (state) => {
            state.review.isLoading = false;
            state.review.error = true;
        },
    }
})


export const {
    getReviewStart, getReviewSuccess, getReviewFailed,
} = reviewSlice.actions

export default reviewSlice.reducer