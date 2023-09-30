import Axios from './Axios'

const Add = (productId, userId, quantity) => {
    return Axios.post('/v1/cart/add-to-cart', {
        userId: userId,
        itemId: productId,
        quantity: quantity
    })
}

const Get = (userId) => {
    return Axios.get(`/v1/cart/${userId}`)
}

const Decrement = (productId, userId) => {
    return Axios.put(`/v1/cart/`, { userId: userId, productId: productId })
}

const Delete = (productId, userId) => {
    return Axios.put(`/v1/cart/remove`, { userId: userId, productId: productId })
}


export { Add, Get, Decrement, Delete }