import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cart: {
            data: null,
            isLoading: false,
            error: false
        },

    },
    reducers: {
        getCartStart: (state) => {
            state.cart.isLoading = true
        },
        getCartSuccess: (state, action) => {
            state.cart.isLoading = false;
            state.cart.data = action.payload;
        },
        getCartFailed: (state) => {
            state.cart.isLoading = false;
            state.cart.error = true;
        },
        addToCartStart: (state) => {
            state.cart.isLoading = true
        },
        addToCartSuccess: (state, action) => {
            state.cart.isLoading = false;
            state.cart.data = action.payload;
        },
        addToCartFailed: (state) => {
            state.cart.isLoading = false;
            state.cart.data = null;
            state.cart.error = true;
        },
        decrementQuantityStart: (state) => {
            state.cart.isLoading = true
        },
        decrementQuantitySuccess: (state, action) => {
            state.cart.isLoading = false;
            state.cart.data = action.payload;
        },
        decrementQuantityFailed: (state) => {
            state.cart.isLoading = false;
            state.cart.error = true;
        },
        removeItemStart: (state) => {
            state.cart.isLoading = true
        },
        removeItemSuccess: (state, action) => {
            state.cart.isLoading = false;
            state.cart.data = action.payload;
        },
        removeItemFailed: (state) => {
            state.cart.isLoading = false;
            state.cart.error = true;
        },
    },
});



export const {
    addToCartStart,
    addToCartSuccess,
    addToCartFailed,
    decrementQuantityStart,
    decrementQuantitySuccess,
    decrementQuantityFailed,
    removeItemStart,
    removeItemSuccess,
    removeItemFailed,
    getCartStart,
    getCartSuccess,
    getCartFailed,
} = cartSlice.actions;

export default cartSlice.reducer
