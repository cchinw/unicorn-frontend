import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { API_BASE_URL } from '../constants/apiConstants'
import axios from 'axios'

const Login = ({ setUnicornUser, toggleAuthenticated, token }) => {
  let navigate = useNavigate()
  const [formValues, setFormValues] = useState({ email: '', password: '' })

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault({
      email: formValues.email,
      password: formValues.password
    })

    await axios({
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      method: 'post',
      url: API_BASE_URL + '/rest-auth/unicorn/login/',
      withCredentials: true,
      data: formValues
    })
      .then((response) => {
        console.log(response, 'BEFORE')
        if (response.status === 200) {
          console.log(response.data, 'LOGIN WORKS')
          navigate('/feed')
          localStorage.setItem('token', response.data.key)
          localStorage.setItem('username', response.data.username)
          localStorage.setItem('userId', response.data.user_id)
        }
      })
      .catch((error) => {
        console.log(error, 'AFTER')
        if (error.response) {
          //Get popup library for alerts
          console.log('Error', error.message)
        }
      })
  }

  return (
    <div className="register-col">
      <div className="card-overlay centered">
        <h1>Login!</h1>
        <div className="input-wrapper">
          <label htmlFor="email">Email </label>
          <input
            onChange={handleChange}
            name="email"
            type="email"
            placeholder="Enter Email"
            value={formValues.email}
            required
          />
        </div>
        <div className="input-wrapper">
          <label htmlFor="password">Password </label>
          <input
            onChange={handleChange}
            type="password"
            name="password"
            value={formValues.password}
            required
          />
        </div>
        <div>
          <button className="glow-on-hover-login" onClick={handleSubmit}>
            Login
          </button>
        </div>
      </div>
    </div>
  )
}

export default Login
