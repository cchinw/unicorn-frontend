// import { useNavigate } from 'react-router-dom'
import { API_BASE_URL } from '../constants/apiConstants'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const ResourcePage = ({ resources, setResources }) => {
  let navigate = useNavigate()

  // const api_url = API_BASE_URL

  const viewResources = async () => {
    // const res = await axios.get(`${api_url}/unicorn/api/list/resources`)
    // setResources(res.data)
    axios({
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      method: 'get',
      url: API_BASE_URL + '/unicorn/api/list/resources'
      // withCredentials: true
    })
      .then((response) => {
        if (response.status === 201) {
          setResources(response.data)
          console.log(response, 'RESOURCES')
        }
      })
      .catch((error) => {
        if (error.response) {
          console.log('Error', error.message)
        }
      })
  }

  useEffect(() => {
    viewResources()
  }, [])

  return (
    <div className="resources">
      <h1>Resources</h1>
      {resources.map((resource, index) => (
        <div className="carousel">
          key={resource.id}
          <div className="child">
            <img
              className="resource-image"
              src={resource.image}
              alt={resource.title}
              onClick={() => {
                navigate(resource.resource)
              }}
            />
            <a href={resource.resource}>{resource.title}</a>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ResourcePage
