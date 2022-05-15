// import { useNavigate } from 'react-router-dom'
import { API_BASE_URL } from '../constants/apiConstants'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const ResourcePage = ({ title, image }) => {
  let navigate = useNavigate()

  const viewResource = () => {
    axios({
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      method: 'get',
      url: API_BASE_URL + '/unicorn/api/list/resources',
      withCredentials: true
    })
      .then((response) => {
        if (response.status === 201) {
          console.log(response)
        }
      })
      .catch((error) => {
        if (error.response) {
          console.log('Error', error.message)
        }
      })
  }

  return (
    <div className="resources">
      <div className="carousel">
        <div className="child" onClick={() => viewResource()}>
          <h3>{title}</h3>
          <img className="resource-image" src={image} alt={title} />
        </div>
      </div>
    </div>
  )
}

export default ResourcePage
