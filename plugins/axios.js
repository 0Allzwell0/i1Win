import axios from 'axios'
import environment from '../environment'

let baseURL
baseURL = environment.API_DOMAIN

const axiosInstance = axios.create({
    baseURL,
    headers: {
        Accept: 'application/json'
    }
})

export default axiosInstance