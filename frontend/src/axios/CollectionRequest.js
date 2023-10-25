import Axios from './Axios'

const getCollectionList = () => {
    return Axios.get('/v1/collection/')
}

const postCreateCollection = (body) => {
    return Axios.post(`/v1/collection/`, body)
}



export { getCollectionList, postCreateCollection }