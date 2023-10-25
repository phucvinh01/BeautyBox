import Axios from './Axios'

const getDistributorList = () => {
    return Axios.get('/v1/distributor/')
}

const postCreateDistributor = (body) => {
    return Axios.post(`/v1/distributor/`, body)
}



export { getDistributorList, postCreateDistributor }