import { createSlice } from "@reduxjs/toolkit";
const proSlice = createSlice({
    name: "products",
    initialState: {
        products: {
            data: null,
            isLoading: false,
            error: false
        },
    },
    reducers: {
        getProductStart: (state) => {
            state.products.isLoading = true
        },
        getProductSuccess: (state, action) => {
            state.products.isLoading = false;
            state.products.data = action.payload;
        },
        getProductFailed: (state) => {
            state.products.isLoading = false;
            state.products.error = true;
        },
    }
})


export const {
    getProductStart, getProductSuccess, getProductFailed,
} = proSlice.actions

export default proSlice.reducer