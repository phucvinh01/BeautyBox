import Axios from './Axios'

const register = (user) => {
    return Axios.post('/v1/auth/', user)
}


export { register }