import { API_BASE_URL } from "../constants/apiConstants"
import axios from "axios"
import LeaveComment from './LeaveComment'
import { useState } from "react"

const Discussion = (props) => {

  const [image, setImage] = useState(null)
  const [formValues, setFormValues] = useState({
    topic: '',
    content: ''
  })

  const handleChange = (e) => {
    e.preventDefault()
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault({
      topic: formValues.topic,
      content: formValues.content,
      image: image,
    })
    console.log('HANDLE SUBMIT WORKS!')

    let formData = new FormData()
    formData.append('topic', formValues.topic || '')
    formData.append('content', formValues.content || '')
    formData.append('image', image)

    axios({
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      method: 'post',
      url: API_BASE_URL + `/unicorn/api/create/discussion`,
      data: formData,
      withCredentials: true
    })
      .then((response) => {
        if (response.status === 201) {
          let data = response.data.results
          props.setDiscussion(data)
          props.getFeed()
          console.log(props.discussion, 'DISCUSSIONSSSSSSS!!!!')
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
    <div className='msgContainer'>
      <form className='msgForm' onSubmit={handleSubmit} >
        <input className='messageText' type='text' name='title' placeholder='What would you like to share today...' onChange={handleChange} value={formValues.title}></input>
        <textarea className='messageText' type='text' name='content' rows='10' placeholder='What would you like to share today...' onChange={handleChange} value={formValues.content}></textarea>
        <div className='btn'>
          <button className='addMessageBtn'>Send</button>
          <input
          type="file"
          accept="image/png, image/jpeg"
          onChange={(e) => {
            setImage(e.target.files[0])
          }}
        />
        </div>
      </form >
    </div>
  )
}

export default Discussion