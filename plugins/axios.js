import axios from 'axios'
import environment from '../environment'

const baseURL = environment.API_DOMAIN

const axiosInstance = axios.create({
    baseURL,
    headers: {
        Accept: 'application/json'
    }
})

export default axiosInstance