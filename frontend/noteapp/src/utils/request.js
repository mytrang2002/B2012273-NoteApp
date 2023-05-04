import axios from 'axios'

const request = axios.create({
    baseURL: 'http://localhost:3000/api/'
})

request.interceptors.response.use(res => {
    return res.data
}, error => {
    throw error.response?.data?.message || error.toString()
})

export default request