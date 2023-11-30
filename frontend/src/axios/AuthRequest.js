import Axios from './Axios'

const register = (user) => {
    return Axios.post('/v1/auth/', user)
}

const updateInfoCustomer = (id, body) => {
    return Axios.put(`/v1/user/${id}`, body)
}

const getCheckCode = (email, otp) => {
    return Axios.get('/v1/user/check-code/', {
        params: {
            email,
            otp
        }
    })
}

const updateCodeReset = (body) => {
    return Axios.put(`/v1/user/reset/code/`, body)
}

const updatePassword = (body) => {
    return Axios.put(`/v1/user/update/password/`, body)
}


export { register, updateInfoCustomer, updateCodeReset, getCheckCode, updatePassword }