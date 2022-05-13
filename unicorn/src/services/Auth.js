import Client from './api'

// Axios call to create a new user
export const RegisterUnicornUser = async (data) => {
  try {
    const res = await Client.post('/register/user', data)
    return res.data
  } catch (error) {
    throw error
  }
}

export const LoginUnicornUser = async (data) => {
  try {
    const res = await Client.post('/login/user', data)
    localStorage.setItem('token', res.data.token)
    return res.data.email
  } catch (error) {
    throw error
  }
}
