import Axios from './Axios'

const postNewOrder = (cart, userId, shippingInfor, note, totalPrice, methodShip) => {
    return Axios.post('/v1/order/add-new-order', { cart, userId, shippingInfor, note, totalPrice, methodShip })
}

const getOrderByUser = (userId) => {
    return Axios.get(`/v1/order/${userId}`)
}



export { postNewOrder, getOrderByUser }