import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Client from "../services/api"
import CreateCommunity from './CreateCommunity'

const Community = (props) => {

  let navigate = useNavigate()
  const [creating, toggleCreating] = useState(false)

  const getCommunities = async () => {
    const res = Client.get(`/list/communities/${props.griefStageId}`)
    console.log(res, 'GET COMMUNITIES BY GRIEF ID')
    let populations = []
    for (let i = 0; i < res.data.length; i++) {
      populations.push([res.data[i].id, res.data[i].population])
    }
    populations.sort((a, b) => {
      return a[1] -b[1]
    })
    populations.reverse()
    const communitiesSort = []
    for (let i = 0; i < populations.length; i++) {
      const communitySort = Client.get(`/list/communities/${populations[i][0]}`)
      console.log(communitySort, 'COMMUNITY POPULATION')
      communitiesSort.push(communitySort.data)
    }
    props.setCommunities(communitiesSort)
  }

  useEffect(() => {
    getCommunities()
  }, [creating])

  const openCommunity = (communityId) => {
    if (props.unicornUser !== null) {
      navigate(`/detail/community/${communityId}`)
    } else {
      props.setOpenModal(true)
      props.setHeader('Unfortunately, you are not Logged in')
      props.setErrorMessage('Please return to the homepage and create an account!')
    }
  }

  const openCommnityForm = () => {
    if (props.unicornUser !== null) {
      toggleCreating(true)
    } else {
      props.setOpenModal(true)
      props.setHeader('Members Only')
      props.setErrorMessage('Please sign in to be able to create your own community')
    }
  }

  return (
    <div className="Community">
      <div className="carousel">
        {props.communities.map((community) => (
            <div className='child' key={community.id} onClick={() => openCommunity(community.id)}>
              <h3>Category: {community.category}</h3>
              <img className='communityImage' src={community.image} alt={community.category}  />
              <p>{community.description}</p>
              <h4>Members Count: {community.population}</h4>
            </div>
          ))}
      </div>
      {creating ? (<CreateCommunity setOpenModal={props.setOpenModal} setHeader={props.setHeader} setErrorMessage={props.setErrorMessage} toggleCreating={toggleCreating} planetId={props.planetId} pilgrim={props.pilgrim} />) :(
        <button className='community-btn' onClick={openCommnityForm}>Create Community</button>)}
    </div>
  )
}

export default Community