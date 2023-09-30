import Axios from './Axios'

const ListProvinces = () => {
    return Axios.get('https://provinces.open-api.vn/api/p/')
}

const ListDistricts = (p) => {
    return Axios.get('https://provinces.open-api.vn/api/p/')
}



export { ListProvinces }