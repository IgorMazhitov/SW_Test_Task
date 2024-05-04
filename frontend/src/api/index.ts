import axios from "axios";

export const API_URL = 'http://localhost:3300'

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL
})

$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    config.headers.userEmail = `${localStorage.getItem('userEmail')}`
    return config
})

export default $api