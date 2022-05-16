import axios from 'axios'
import { API_BASE_URL } from '../constants/apiConstants'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Register = ({ setOpenModal, setHeader, setPopupMessage }) => {
  let navigate = useNavigate()

  const [formValues, setFormValues] = useState({
    username: '',
    bio: '',
    email: '',
    password1: '',
    password2: ''
  })
  const [avatar, setAvatar] = useState(null)

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault({
      username: formValues.username,
      bio: formValues.bio,
      avatar: avatar,
      email: formValues.email,
      password1: formValues.password1,
      password2: formValues.password2
    })
    console.log('HANDLE SUBMIT WORKS!')
    // const avatar = await toBase64(avatar.avatar)
    let formData = new FormData()
    formData.append('username', formValues.username || '')
    formData.append('bio', formValues.bio || '')
    formData.append('avatar', avatar)
    formData.append('email', formValues.email || '')
    formData.append('password1', formValues.password1 || '')
    formData.append('password2', formValues.password2 || '')

    axios({
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      method: 'post',
      url: API_BASE_URL + '/rest-auth/unicorn/registration/',
      data: formData,
      withCredentials: false
    })
      .then((response) => {
        if (response.status === 201) {
          navigate('/login')
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
    <div className="register-col">
      <div className="card-overlay centered">
        <h1>Register!</h1>
        <form className="forms">
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
              className="upload-box"
              type="file"
              accept="image/png, image/jpeg"
              onChange={(e) => {
                setAvatar(e.target.files[0])
              }}
            />
          </div>
          <div className="input-wrapper">
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
            <input
              onChange={handleChange}
              type="password"
              name="password1"
              placeholder="password"
              value={formValues.password1}
              required
            />
          </div>
          <div className="input-wrapper">
            <input
              onChange={handleChange}
              placeholder="confirm password"
              type="password"
              name="password2"
              value={formValues.password2}
              required
            />
          </div>
          <button className="glow-on-hover-register" onClick={handleSubmit}>
            Register
          </button>
        </form>
      </div>
    </div>
  )
}

export default Register
