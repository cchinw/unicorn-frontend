import GriefStage from '../components/GriefStage'
import { useEffect } from 'react'
import Client from '../services/api'

const Home = ({
  setGriefStage,
  griefStages,
  unicornUser,
  openModal,
  setOpenModal,
  errorMessage,
  header,
  setHeader,
  setErrorMessage
}) => {
  const getGriefStage = async () => {
    const res = await Client.get(`/list/grief-stages`)
    setGriefStage(res.data)
  }

  useEffect(() => {
    getGriefStage()
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
          {griefStages.map((stage, idx) => (
            <div>
              <GriefStage
                key={idx}
                className="grief-stage"
                griefStage={stage.id}
                unicornUser={unicornUser}
                errorMessage={errorMessage}
                setErrorMessage={setErrorMessage}
                openModal={openModal}
                setOpenModal={setOpenModal}
                header={header}
                setHeader={setHeader}
              />
              <img className="home-image" src={stage.image} />
              <p className="home-desc">{stage.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home
