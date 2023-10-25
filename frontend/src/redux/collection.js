import { createSlice } from "@reduxjs/toolkit";
const collectionSlice = createSlice({
    name: "collection",
    initialState: {
        collection: {
            data: null,
            isLoading: false,
            error: false
        },
    },
    reducers: {
        getCollectionStart: (state) => {
            state.collection.isLoading = true
        },
        getCollectionSuccess: (state, action) => {
            state.collection.isLoading = false;
            state.collection.data = action.payload;
        },
        getCollectionFailed: (state) => {
            state.collection.isLoading = false;
            state.collection.error = true;
        },
    }
})


export const {
    getCollectionStart, getCollectionSuccess, getCollectionFailed,
} = collectionSlice.actions

export default collectionSlice.reducer