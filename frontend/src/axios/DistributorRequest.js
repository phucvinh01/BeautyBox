import Axios from './Axios'

const getDistributorList = () => {
    return Axios.get('/v1/distributor/')
}

const postCreateDistributor = (body) => {
    return Axios.post(`/v1/distributor/`, body)
}

const deleteDistributor = (id) => {
    return Axios.delete(`/v1/distributor/${id}`)
}



export { getDistributorList, postCreateDistributor, deleteDistributor }