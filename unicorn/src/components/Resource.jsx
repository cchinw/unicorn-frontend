import { useNavigate } from "react-router-dom"

const Resource = ({key, title, resource, griefStage, image, unicornUser, setUnicornUser, openmodal, setOpenModal, errorMessage, setErrorMessage, header, setHeader}) => {

  const goToResource = (resourceId) => {
    if (unicornUser !== null) {
      <a href={resource}></a>
    } else { 
      // Error handling to ensure only logged in pilgrims can navigate to community. Modal appears with the setErrorMessage 
      setOpenModal(true)
      setHeader('Unfortunately, you need to be logged in.')
      setErrorMessage('Please return to the homepage and create an account!')
    }
  }

  return (
    <div className="resources">
      <div className="carousel">
        <div className="child" onClick={() => goToResource(key)}>
          <h3>{title}</h3>
          <img className="resource-image" src={image} alt={title} />
        </div>
      </div>
    </div>
  )
}

export default Resource
