import { useEffect, useState } from 'react'
import { API_BASE_URL } from '../constants/apiConstants'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const VerifyEmail = ({}) => {
  let navigate = useNavigate()
  const [message, setMessage] = useState('')
  let { key } = useParams()

  const VerifyEmailMMessage = () => {
    const payload = {
      key: key
    }
    console.log(payload)
    axios({
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      method: 'post',
      data: payload,
      url: API_BASE_URL + '/rest-auth/account-confirm-email/',
      withCredentials: true
    })
      .then(async (response) => {
        if (response.status === 200) {
          console.log(response)
          setMessage(response.data.detail)
          setTimeout(() => {
            navigate('/login')
          }, 2000)
        }
      })
      .catch(async (error) => {
        if (error.response) {
          setMessage(error.response.data.detail)
          //Get popup library for alerts
          console.log('Error', error.response.data.detail)
        }
      })
  }

  useEffect(() => {
    VerifyEmailMMessage()
  }, [])

  return (
    <div className="verify-email-header">
      <div>
        <h1>{message}</h1>
      </div>
    </div>
  )
}

export default VerifyEmail
