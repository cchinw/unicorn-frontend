import Client from '../services/api'
import Community from '../components/Community'
import Modal from '../components/Modal'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'

const GriefStagePage = ({
  griefStage,
  setGriefStage,
  communities,
  setCommunities,
  unicornUser,
  setUnicornUser,
  openModal,
  setOpenModal,
  header,
  setHeader,
  errorMessage,
  setErrorMessage
}) => {
  const { griefStageId } = useParams()

  const getGriefStage = async () => {
    const res = await Client.get(`/detail/grief-stage/${griefStageId}`)
    console.log(res.data)
    setGriefStage(res.data)
  }

  useEffect(() => {
    getGriefStage()
  }, [])

  return (
    <div className="grief-stage-page">
      <div className="grief-stage-page">
        <h1 className="grief-stage-name">{griefStage.title}</h1>
        <img
          className="grief-stage-image"
          src={griefStage.image}
          alt={griefStage.title}
        />
        <div className="grief-stage-desc-header">
          <h3 className="grief-stage-header">
            What is {griefStage.title} and how do i know that I am here?
          </h3>
        </div>
        <div className="grief-stage-desc">
          <p>{griefStage.description}</p>
        </div>
        <div className="carousel">
          <h1 className="community-title">
            <Community
              communities={communities}
              setCommunities={setCommunities}
              griefStageId={griefStageId}
              unicornUser={unicornUser}
              setUnicornUser={setUnicornUser}
              openModal={openModal}
              setOpenModal={setOpenModal}
              header={header}
              setHeader={setHeader}
              errorMessage={errorMessage}
              setErrorMessage={setErrorMessage}
            />
          </h1>
        </div>
      </div>
    </div>
  )
}

export default GriefStagePage
