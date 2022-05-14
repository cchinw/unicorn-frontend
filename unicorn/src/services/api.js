import Axios from 'axios'

//Universal API call for the entire Auth on the app
let apiUrl = 'http://localhost:8000/unicorn/api'

const Client = Axios.create({ baseURL: apiUrl })

// Intercepts every request axios makes
Client.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['authorization'] = `Token ${token}`
      // 'Content-Type': multipart ? 'multipart/form-data' : 'application/json',
      config.headers['Content-Type'] = 'multipart/form-data'
    }
    return config
  },
  (error) => Promise.reject(error)
)

export default Client
