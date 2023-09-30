import Axios from './Axios'

const getCategory = () => {
    return Axios.get('/v1/category/')
}



export { getCategory }