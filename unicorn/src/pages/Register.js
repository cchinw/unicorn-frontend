import { useState, useEffect } from 'react'
import { RegisterUnicornUser } from '../services/Auth'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Register = ({
  usernames,
  setUsernames,
  emails,
  setEmails,
  openModal,
  setOpenModal,
  errorMessage,
  setErrorMessage,
  header,
  setHeader
}) => {
  let navigate = useNavigate()

  const [formValues, setFormValues] = useState({
    username: '',
    bio: '',
    avatar: File,
    email: '',
    password: '',
    confirmPassword: ''
  })

  // Universal Axios call
  let apiUrl = 'http://localhost:8000/unicorn/api'

  const getAllUsers = async () => {
    const response = await axios.get(`${apiUrl}/unicorn`)
    let loadUsernames = []
    let loadEmails = []

    // Getting all usernames and emails that currently exists and checks if the username and email they input is unique. If not, it throws an error.
    for (let i = 0; i < response.data.length; i++) {
      loadUsernames.push(response.data[i].username)
      loadEmails.push(response.data[i].email)
    }
    setUsernames(loadUsernames)
    setEmails(loadEmails)
  }

  useEffect(() => {
    getAllUsers()
  }, [])

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (usernames.indexOf(formValues.username) !== -1) {
      return window.alert('Account with that username already exists')
    }
    if (emails.indexOf(formValues.email) !== -1) {
      return window.alert('Account with that email already exists')
    }
    if (formValues.avatar === '') {
      formValues.avatar = ''
    }
    if (formValues.avatar.slice(0, 4) !== 'http') {
      return window.alert('Please choose a different avatar')
    }
    if (formValues.password !== formValues.confirmPassword) {
      return window.alert('Passwords must match')
    }
    await RegisterUnicornUser({
      username: formValues.username,
      bio: formValues.bio,
      avatar: formValues.avatar,
      email: formValues.email,
      password: formValues.password
    })
    setFormValues({
      username: '',
      bio: '',
      avatar: File,
      email: '',
      password: '',
      confirmPassword: ''
    })
    navigate('/login')
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
            <input
              onChange={handleChange}
              name="name"
              type="text"
              placeholder="Full Name"
              value={formValues.name}
              required
            />
          </div>
          <div className="unicorn-user-avatar">
            <input
              onChange={handleChange}
              placeholder="Profile avatar"
              name="avatar"
              type="text"
              value={formValues.avatar}
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
              (!formValues.password &&
                formValues.confirmPassword === formValues.password)
            }
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  )
}

export default Register
