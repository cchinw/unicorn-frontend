import Axios from 'axios'

//Universal API call for the entire Auth on the app
let apiUrl = 'http://localhost:8000'

const Client = Axios.create({ baseURL: apiUrl })

Client.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers['authorization'] = `Token ${token}`
  }
  return config
})

export default Client
