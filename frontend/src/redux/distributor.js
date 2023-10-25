import { createSlice } from "@reduxjs/toolkit";
const distributorSlice = createSlice({
    name: "distributor",
    initialState: {
        distributor: {
            data: null,
            isLoading: false,
            error: false
        },
    },
    reducers: {
        getDistributorStart: (state) => {
            state.distributor.isLoading = true
        },
        getDistributorSuccess: (state, action) => {
            state.distributor.isLoading = false;
            state.distributor.data = action.payload;
        },
        getDistributorFailed: (state) => {
            state.distributor.isLoading = false;
            state.distributor.error = true;
        },
    }
})


export const {
    getDistributorStart, getDistributorSuccess, getDistributorFailed,
} = distributorSlice.actions

export default distributorSlice.reducer