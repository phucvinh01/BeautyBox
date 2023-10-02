import { createSlice } from "@reduxjs/toolkit";


const authSlice = createSlice({
    name: "auth",
    initialState: {
        login: {
            currentUser: null,
            isLoading: false,
            error: false
        },
        logout: {
            isLoading: false,
            error: false
        }
    },
    reducers: {
        loginStart: (state) => {
            state.login.isLoading = true
        },
        loginSuccess: (state, action) => {
            state.login.isLoading = false;
            state.login.currentUser = action.payload;
        },
        loginFailed: (state) => {
            state.login.isLoading = false;
            state.login.error = true;
        },
        logoutStart: (state) => {
            state.logout.isLoading = true
        },
        logoutSuccess: (state) => {
            state.logout.isLoading = false;
            state.login.currentUser = null;
        },
        logoutFailed: (state) => {
            state.logout.isLoading = false;
            state.logout.error = true;
        }
    }
})


export const {
    loginStart, loginFailed, loginSuccess, logoutStart, logoutFailed, logoutSuccess
} = authSlice.actions

export default authSlice.reducer