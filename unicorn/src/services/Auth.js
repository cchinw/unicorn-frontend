import Client from './api'

// export const CheckSession = async () => {
//   try {
//     const res = await Client.get('/auth/session')
//     return res.data
//   } catch (error) {
//     throw error
//   }
// }

// Axios call to create a new user
export const RegisterUnicornUser = async (data) => {
  try {
    const res = await Client.post('/auth/register', data)
    return res.data
  } catch (error) {
    throw error
  }
}
