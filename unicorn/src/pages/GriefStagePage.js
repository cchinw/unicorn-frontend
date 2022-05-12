import Client from '../services/api'
import Community from '../components/Community'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

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
  const [changingTitle, toggleChangingTitle] = useState(false)
  const [changingDescription, toggleChangingDescription] = useState(false)
  const [changingImage, toggleChangingImage] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState(null)
  const [loaded, toggleLoaded] = useState(false)
  const [reload, toggleReload] = useState(false)
  const [reloads, setReloads] = useState(0)
  const { griefStageId } = useParams()

  // Grief Stage API Calls
  const ListGriefStage = async () => {
    const res = await Client.get(`/detail/grief-stage/${griefStageId}`)
    return res.setGriefStage(res.data[0])
  }

  useEffect(() => {
    // if (!loaded && reloads <= 20) {
    ListGriefStage()
    // }
  }, [])

  // const handleTitleChange = (e) => {
  //   e.preventDefault()
  //   setTitle(e.target.value)
  // }

  // const handleDescriptionChange = (e) => {
  //   e.preventDefault()
  //   setDescription(e.target.value)
  // }

  // const handleImageChange = (e) => {
  //   e.preventDefault()
  //   setImage(e.target.value)
  // }

  // const handleTitleSubmit = async (e) => {
  //   e.preventDefault()
  //   await Client.put(`/update/grief-stage/${unicornUser.id}`, { title: title })
  //   setUnicornUser({ ...unicornUser, title: title })
  //   toggleChangingTitle(false)
  // }

  // const handleDescriptionSubmit = async (e) => {
  //   e.preventDefault()
  //   await Client.put(`/update/grief-stage/${unicornUser.id}`, {
  //     description: description
  //   })
  //   setUnicornUser({ ...unicornUser, description: description })
  //   toggleChangingDescription(false)
  // }
  // const handleImageSubmit = async (e) => {
  //   e.preventDefault()
  //   await Client.put(`/update/grief-stage/${unicornUser.id}`, { image: image })
  //   setUnicornUser({ ...unicornUser, image: image })
  //   toggleChangingImage(false)
  // }

  return (
    <div>
      <div className="grief-stage-page">
        <div className="grief-stage-title">
          <h1>{griefStage.name}</h1>
        </div>
        <div className="grief-stage-image">
          <img src={griefStage.image} alt={griefStage.name} />
        </div>
        <div className="grief-stage-description">
          <h4>{griefStage.description}</h4>
        </div>

        <div className="carousel">
          <h2>Communities</h2>
          <Community
            communities={communities}
            setCommunities={setCommunities}
            griefStageId={griefStageId}
            unicornUser={unicornUser}
            openModal={openModal}
            setOpenModal={setOpenModal}
            setErrorMessage={setErrorMessage}
            setHeader={setHeader}
          />
        </div>
      </div>
    </div>
  )
}

export default GriefStagePage
