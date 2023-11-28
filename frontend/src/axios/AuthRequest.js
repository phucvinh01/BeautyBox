import Axios from './Axios'

const register = (user) => {
    return Axios.post('/v1/auth/', user)
}

const updateInfoCustomer = (id, body) => {
    return Axios.put(`/v1/user/${id}`, body)
}

const updateCodeReset = (body) => {
    return Axios.put(`/v1/user/reset/code/`, body)
}


export { register, updateInfoCustomer, updateCodeReset }