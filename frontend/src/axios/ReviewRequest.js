import Axios from './Axios'
export const postCreateReview = (body) => {
    return Axios.post('/v1/product/create-review', body)
}

export const getReviewByProductId = (id) => {
    return Axios.get(`/v1/product/review/${id}`)
}
