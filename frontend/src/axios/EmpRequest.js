import Axios from './Axios'

const postCreateEmp = (body) => {
    return Axios.post('/v1/emp/create-emp', body)
}

const postEditEmp = (id, body) => {
    return Axios.post(`/v1/emp/edit-emp/${id}`, body)
}

const postEditActiveEmp = (id, body) => {
    return Axios.post(`/v1/emp/edit-active/${id}`, body)
}

const getAllEmp = (body) => {
    return Axios.get('/v1/emp/')
}


export { postCreateEmp, getAllEmp, postEditEmp, postEditActiveEmp }