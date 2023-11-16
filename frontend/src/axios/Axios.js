import axios from 'axios'
//const apiUrl = process.env.REACT_APP_VERCEL_URL;
const instance = axios.create({
    baseURL: 'http://127.0.0.1:8000',
});
instance.interceptors.response.use(function (response) {
    return response.data ? response.data : { statusCode: response.status, headers: response.headers }
}, function (error) {
    let res = {}
    if (error.response) {
        res.data = error.response.data;
        res.status = error.response.status;
        res.headers = error.response.headers;
    } else if (error.request) {
        console.log(error.request);
    } else {
        console.log('Error', error.message);
    }
    return res;

});


export default instance