import axios from 'axios'
import { API_DOMAIN } from '~/environment'

const axiosInstance = axios.create({
    baseURL: API_DOMAIN,
    headers: {
        'Accept': 'application/json'
    }
})

export default axiosInstance