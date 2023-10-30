import Axios from './Axios'

const postCreateEmp = (body) => {
    return Axios.post('/v1/emp/create-emp', body)
}

const getAllEmp = (body) => {
    return Axios.get('/v1/emp/')
}


export { postCreateEmp, getAllEmp }