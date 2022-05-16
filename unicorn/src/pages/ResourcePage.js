// import { useNavigate } from 'react-router-dom'
import { API_BASE_URL } from '../constants/apiConstants'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const ResourcePage = ({ resources, setResources, token }) => {
  let navigate = useNavigate()

  // const api_url = API_BASE_URL

  const viewResources = async () => {
    // const res = await axios.get(`${api_url}/unicorn/api/list/resources`)
    // setResources(res.data)
    axios({
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Token ${token}`
      },
      method: 'GET',
      url: API_BASE_URL + '/unicorn/api/list/resources',
      withCredentials: true
    })
      .then((response) => {
        const data = response.data
        setResources(data.results)
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
    <div className="grief-stage">
      <h1>Resources</h1>
      {resources.map((resource, index) => (
        <div className="grief-stage-container" key={resource.id}>
          <div className="grief-stage-card">
            <img
              className="grief-image"
              src={resource.image}
              alt={resource.title}
              onClick={() => {
                navigate(resource.resource)
              }}
            />
            <a className="grief-stage-title" href={resource.resource}>
              {resource.title}
            </a>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ResourcePage
