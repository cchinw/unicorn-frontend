import {useNavigate, Link} from 'react-router-dom'

const GriefStage = ({griefStage, title, description, image, unicornUser, setUnicornUser, errorMessage, setErrorMessage, openModal, setOpenModal, header, setHeader }) => {
  
  let navigate = useNavigate()

  const userAccess = (id) => {
    if(unicornUser){
      navigate(`/detail/grief-stage/${id}`)
    }
  }


  
  return(
  <div className="grief-stage">
    <div className='grief-stage-container'>
      <Link to={`griefstage/${griefStage}`}>
        <div className='grief-stage-card'>
          <img className='grief-image' src={image}/>
        </div>
      </Link>
      <h4 className='grief-stage-title'>{title}</h4>
    </div>
  </div>
  )
}

export default GriefStage