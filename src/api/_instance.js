import axios from 'axios'

const api = axios.create({
    baseURL: 'https://journeysite.site/api',
    withCredentials: true
})

export default api