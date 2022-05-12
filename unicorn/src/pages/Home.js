import GriefStage from '../components/GriefStage'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Client from '../services/api'
import Griever from '../assets/UnicornMainLogo.png'

const Home = ({
  setGriefStages,
  griefStages,
  unicornUser,
  setUnicornUser,
  openModal,
  setOpenModal,
  errorMessage,
  header,
  setHeader,
  setErrorMessage
}) => {
  let navigate = useNavigate()

  const getGriefStages = async () => {
    const res = await Client.get(`/list/grief-stages`)
    setGriefStages(res.data)
  }

  useEffect(() => {
    getGriefStages()
  }, [])

  return (
    <div className="home">
      <div className="title">
        <h1>Welcome to Unicorn</h1>
        <h3>You do not have to deal with loss on your own</h3>
        <h4>Learn about the 7 stages of Grief</h4>
      </div>
      <div className="stages-of-grief">
        <div className="stage-of-grief">
          {griefStages.map((stage) => (
            <div>
              <GriefStage
                key={stage.id}
                className="grief-stage"
                griefStage={stage.id}
                title={stage.title}
                description={stage.description}
                image={stage.image}
                unicornUser={unicornUser}
                setUnicornUser={setUnicornUser}
                errorMessage={errorMessage}
                setErrorMessage={setErrorMessage}
                openModal={openModal}
                setOpenModal={setOpenModal}
                header={header}
                setHeader={setHeader}
              />
            </div>
          ))}
          <img
            className="griever"
            src={Griever}
            alt="Unicorn in grief"
            onClick={() => {
              navigate(`/profile`)
            }}
            style={{
              zIndex: `12`,
              height: '100px',
              width: '100px',
              animation: 'float 5s ease 2s infinite'
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default Home
