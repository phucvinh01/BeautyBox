import Axios from './Axios'

const getProducts = (user) => {
    return Axios.get('/v1/product/')
}

const getOneProducts = (id) => {
    return Axios.get(`/v1/product/${id}`)
}

const insertProduct = (product) => {
    return Axios.post('/v1/product/', product)
}

const deleteProduct = (id) => {
    return Axios.delete(`/v1/product/${id}`)

}

const getProductByCategory = (path) => {
    return Axios.get(`/v1/category/${path}`)

}

const getListNewProduct = () => {
    return Axios.get('/v1/product/${10}')
}

const postSearchByName = (name) => {
    return Axios.post(`/v1/product/search/${name} `)
}

const putUpdateStatus = (id) => {
    return Axios.put(`/v1/product/updateActive/${id}`)
}

const putUpdateDiscount = (id, body) => {
    return Axios.put(`/v1/product/updateDiscount/${id}`, body)
}

export { putUpdateDiscount, putUpdateStatus, getProducts, insertProduct, deleteProduct, getProductByCategory, getListNewProduct, getOneProducts, postSearchByName }