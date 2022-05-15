import { API_BASE_URL } from '../constants/apiConstants'
import axios from 'axios'
import CommunityPage from './CommunityPage'
import ResourcePage from './ResourcePage'
// import Modal from '../components/Modal'
import { Link, useParams } from 'react-router-dom'
import { useEffect } from 'react'

const GriefStagePage = ({
  griefStages,
  setGriefStages,
  communities,
  setCommunities,
  unicornUser,
  setUnicornUser,
  openModal,
  setOpenModal,
  header,
  setHeader,
  setPopupMessage,
  resources,
  setResources
}) => {
  const { griefStageId } = useParams()

  // const getgriefStages = async () => {
  //   const res = await Client.get(`/detail/grief-stage/${griefStagesId}`)
  //   console.log(res.data)
  //   setGriefStages(res.data)
  // }

  const getgriefStages = async () => {
    axios({
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      method: 'get',
      url: API_BASE_URL + '/unicorn/api/detail/grief-stage/' + griefStageId,
      withCredentials: true
    })
      .then((response) => {
        const data = response.data
        console.log(data, 'RESPONSE')
        setGriefStages(data)
        console.log(resources, 'LIST RESOURCES')
      })
      .catch((error) => {
        if (error.response) {
          console.log('Error', error.message)
        }
      })
  }

  useEffect(() => {
    getgriefStages()
  }, [])

  return (
    <div className="grief-stage-page">
      <div className="grief-stage-container">
        <h1 className="grief-stage-name">{griefStages.title}</h1>
        <img
          className="grief-stage-image"
          src={griefStages.image}
          alt={griefStages.title}
        />
        <div className="grief-stage-desc-header">
          <h3 className="grief-stage-header">
            What is {griefStages.title} and how do i know that I am here?
          </h3>
          <div className="grief-stage-desc">
            <p>{griefStages.description}</p>
          </div>
        </div>
        <div className="resources-carousel">
          {resources.map((resource) => (
            <Link to="/resources">
              <ResourcePage
                key={resource.id}
                title={resource.resource_title}
                resource={resource.resource}
                griefStages={resource.grief_stage}
                image={resource.image}
                unicornUser={unicornUser}
                setUnicornUser={setUnicornUser}
                openModal={openModal}
                setOpenModal={setOpenModal}
                setErrorMessage={setPopupMessage}
                header={header}
                setHeader={setHeader}
              />
              View Resources
            </Link>
          ))}
        </div>
        <div className="grief-stage-community">
          <h2 className="community-title">Explore Communities</h2>
          <Link to="/communities">
            <CommunityPage
              communities={communities}
              setCommunities={setCommunities}
              griefStages={griefStages}
              setGriefStages={setGriefStages}
              griefStageId={griefStageId}
              unicornUser={unicornUser}
              setUnicornUser={setUnicornUser}
              openModal={openModal}
              setOpenModal={setOpenModal}
              header={header}
              setHeader={setHeader}
              setErrorMessage={setPopupMessage}
            />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default GriefStagePage
