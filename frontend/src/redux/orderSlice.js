import { createSlice } from "@reduxjs/toolkit";
const orderSlice = createSlice({
    name: "order",
    initialState: {
        order: {
            data: null,
            isLoading: false,
            error: false
        },
    },
    reducers: {
        getOrderStart: (state) => {
            state.order.isLoading = true
        },
        getOrderSuccess: (state, action) => {
            state.order.isLoading = false;
            state.order.data = action.payload;
        },
        getOrderFailed: (state) => {
            state.order.isLoading = false;
            state.order.error = true;
        },
    }
})


export const {
    getOrderStart, getOrderSuccess, getOrderFailed,
} = orderSlice.actions

export default orderSlice.reducer