import axios from "axios";

const axiosClient = axios.create({
    baseURL: '/api',
    headers: {
        'Content-Type': 'application/json'
    }
})

axiosClient.interceptors.response.use(function (response){
    return response.data;
}, function (error) {
    return Promise.reject(error)
})

export default axiosClient;