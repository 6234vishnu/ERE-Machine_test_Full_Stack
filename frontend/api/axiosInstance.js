import axios from 'axios'

const backendUri=import.meta.VITE_BACKEND_URI

const api=axios.create({  // axios integration
    baseURL:backendUri
})
api.defaults.withCredentials=true

export default api