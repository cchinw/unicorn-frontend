import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { API_BASE_URL } from '../constants/apiConstants'
import axios from 'axios'

const Login = ({ setUnicornUser, toggleAuthenticated }) => {
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

    axios({
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      method: 'post',
      url: API_BASE_URL + '/rest-auth/accounts/login/',
      withCredentials: true
    })
      .then((response) => {
        if (response.status === 201) {
          navigate('/communities')
        }
      })
      .catch((error) => {
        if (error.response) {
          //Get popup library for alerts
          console.log('Error', error.message)
        }
      })
  }

  return (
    <div className="login-page">
      <h1>Login!</h1>
      <div className="login-forms">
        <div className="input-wrapper">
          <label htmlFor="username">Email </label>
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
          <button
            className="glow-on-hover-login"
            onClick={handleSubmit}
            disabled={!formValues.email || !formValues.password}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  )
}

export default Login
