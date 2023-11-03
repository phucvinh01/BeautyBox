import Axios from './Axios'


export const getrevenueData = () => {
    return Axios.get('/v1/product/sale/eachMonth')
}

export const getSumQuantitySaleProduct = () => {
    return Axios.get('/v1/product/sale/count-quantity')
}

export const getSaleEachProduct = () => {
    return Axios.get('/v1/product/sales/product')
}


export const getSale = (month, year) => {
    let body = {
        "month": month,
        "year": year
    }
    return Axios.get('/v1/product/sale/dailyMonth', body)
}