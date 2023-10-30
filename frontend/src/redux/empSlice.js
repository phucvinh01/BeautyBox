import { createSlice } from "@reduxjs/toolkit";
const empSlice = createSlice({
    name: "emp",
    initialState: {
        emp: {
            data: null,
            isLoading: false,
            error: false
        },
    },
    reducers: {
        getEmpStart: (state) => {
            state.emp.isLoading = true
        },
        getEmpSuccess: (state, action) => {
            state.emp.isLoading = false;
            state.emp.data = action.payload;
        },
        getEmpFailed: (state) => {
            state.emp.isLoading = false;
            state.emp.error = true;
        },
    }
})


export const {
    getEmpStart, getEmpSuccess, getEmpFailed,
} = empSlice.actions

export default empSlice.reducer