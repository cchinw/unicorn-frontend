import GriefStage from '../components/GriefStage'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { API_BASE_URL } from '../constants/apiConstants'
import axios from 'axios'
// import Client from '../services/api'
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
  console.log(griefStages)

  // const getGriefStages = async () => {
  //   const res = Client.get(`/unicorn/api/list/grief-stages`)
  //   setGriefStages(res.data)
  //   console.log(res.data, 'GRIEFSTAGES')
  // }

  const getGriefStages = () => {
    axios({
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      method: 'GET',
      url: API_BASE_URL + '/unicorn/api/list/grief-stages',
      withCredentials: false
    })
      .then((response) => {
        const data = response.data
        console.log(data, 'RESPONSE')
        setGriefStages(data)
        console.log(griefStages, 'GET GRIEF STAGES')
      })
      .catch((error) => {
        if (error.response) {
          //Get popup library for alerts
          console.log('Error', error.message)
        }
      })
  }

  useEffect(() => {
    getGriefStages()
  }, [])

  return (
    <div className="home">
      <div className="title">
        <h1>Welcome to Unicorn</h1>
        <h3>Where you do not have to deal with loss on your own</h3>
      </div>
      <h3 className="title-header">Learn about the The 7 Stages of Grief</h3>
      <div className="stages-of-grief">
        {griefStages.map((stage, index) => (
          <GriefStage
            key={index}
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
        ))}
      </div>
      <div className="grief-intro">
        <h3>We are all here because we have all lost someone</h3>
        <p>
          When you lose someone you love, it’s hard to imagine life without
          them. Every loss comes with pain and adjustments we need to make. You
          are not alone, and knowing the 7 stages of grief might help you see
          the light at the end of the tunnel.
        </p>
        <p>
          It is important to interpret the stages loosely and expect much
          individual variation. There is no neat progression from one stage to
          the next. In reality, there is much looping back, or stages can hit at
          the same time, or occur out of order. So why bother with stage models
          at all? Because they are a good general guide of what to expect.
        </p>
        <p>
          For example, generally, a long period of “depression” (not clinical
          depression), isolation, and loneliness happen late in the grief
          process, months after the tragedy strikes. It actually is normal and
          expected for you to be very depressed and sad eight months later.
        </p>
        <p>
          Outsiders do not understand this and feel that it should be time for
          you to “get over it” and rejoin the land of the living. Just knowing
          that your desire to be alone with your sad reflections at this time is
          normal will help you deal with outside pressures. You are acting
          normally. They just don’t “get it”.
        </p>
        <h4>What Does Grief Feel Like?</h4>
        <p>
          Grief actually is different for each and every person. The seven
          stages of grief that we’ll dive into below is the perfect showcase of
          how people go through the grieving process. Coping with loss and
          dealing with all the emotions of grief is a trying time for anyone to
          deal with.
        </p>
        <p>
          For many, there is actually quite an extensive mourning process that
          comes with the various stages for grief. This is why knowing grief
          symptoms can be a big indicator to someone about what stages of grief
          and loss their currently going through.
        </p>
        <p>
          Grief can feel like extreme sadness, confusion, chaos, anger,
          resentment, and more. Those who have had to go through the grieving
          process could easily tell you what their grief felt like and how it
          was hard for them.
        </p>
      </div>
    </div>
  )
}

export default Home
