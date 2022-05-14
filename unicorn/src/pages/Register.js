import { useState } from 'react'
import { RegisterUnicornUser } from '../services/Auth'
import { useNavigate } from 'react-router-dom'
import Client from '../services/api'

const Register = ({}) => {
  let navigate = useNavigate()

  const [formValues, setFormValues] = useState({
    username: '',
    bio: '',
    avatar: File,
    email: '',
    password1: '',
    password2: ''
  })

  console.log(formValues, 'FORMVALUES')

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault({
      username: formValues.username,
      bio: formValues.bio,
      avatar: formValues.avatar,
      email: formValues.email,
      password1: formValues.password1,
      password2: formValues.password2
    })
    let formData = new FormData()
    formData.append('username', formValues.username || '')
    formData.append('bio', formValues.bio || '')
    formData.append('avatar', formValues.avatar || '')
    formData.append('email', formValues.email || '')
    formData.append('password1', formValues.password1 || '')
    formData.append('password2', formValues.password2 || '')

    const res = await RegisterUnicornUser(formData)
    console.log(res, 'RESPONSE FOR REGISTER')

    navigate('/login')
    console.log(formValues, 'HANDLECHANGE')
  }

  return (
    <div className="register col">
      <div className="card-overlay centered">
        <h1>Register!</h1>
        <form className="forms" onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <input
              onChange={handleChange}
              name="username"
              type="text"
              placeholder="username"
              value={formValues.username}
              required
            />
          </div>
          <div className="input-wrapper">
            <textarea
              className="register-bio"
              rows="10"
              onChange={handleChange}
              name="bio"
              type="text"
              placeholder="Enter a short bio here..."
              value={formValues.bio}
            />
          </div>
          <div className="unicorn-user-avatar">
            <input
              onChange={handleChange}
              placeholder="Profile avatar"
              name="avatar"
              type="file"
              value={formValues.avatar}
            />
          </div>
          <div className="input-wrapper">
            <input
              onChange={handleChange}
              name="email"
              type="email"
              placeholder="email"
              value={formValues.email}
              required
            />
          </div>
          <div className="input-wrapper">
            <input
              onChange={handleChange}
              type="password"
              name="password"
              placeholder="password"
              value={formValues.password}
              required
            />
          </div>
          <div className="input-wrapper">
            <input
              onChange={handleChange}
              placeholder="confirm password"
              type="password"
              name="confirmPassword"
              value={formValues.confirmPassword}
              required
            />
          </div>
          <button
            className="glow-on-hover-register"
            disabled={
              !formValues.username ||
              (!formValues.password1 &&
                formValues.password2 === formValues.password1)
            }
          >
            Register
          </button>
        </form>
      </div>
    </div>
  )
}

export default Register
