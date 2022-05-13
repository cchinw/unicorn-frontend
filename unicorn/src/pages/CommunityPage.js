import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Client from '../services/api'

const CommunityPage = (props) => {
  const { id } = useParams()

  const getCommunityDetail = async () => {
    const res = Client.get(`/detail/community/${id}`)
    props.setCommunity(res.data)
    const creatorRes = Client.get(`/detail/community/${res.data.creator}`)
    props.setCreator(creatorRes.data)
    const griefStageRes = Client.get(
      `/detail/community/${res.data.grief_stage}`
    )
    props.setGriefStage(griefStageRes.data)
  }

  const getCommunityMembers = async () => {
    const res = Client.get(`/detail/community/${id}`)
    const membersRes = Client.get(`/list/community/${res.data.members}`)
    props.setUnicornUsers(membersRes.data)
  }

  const getDiscussions = async () => {
    const res = Client.get(`/list/discussions`)
    const discussionsCommunityRes = Client.get(
      `/list/discussions/${res.data.community}`
    )
    let loadDiscussions = discussionsCommunityRes.data
    loadDiscussions.reverse()
    props.setDiscussion(loadDiscussions)
    let loadUsernames = []
    let loadImages = []
    const userProfileRes = Client.get(
      `/detail/unicorn-user/${props.unicornUsers.members}`
    )
    for (let i = 0; i < discussionsCommunityRes.data.length; i++) {
      let username = Client.get(`/list/discussions/${res.data.user}`)
      loadUsernames.push(username.data.user)
      loadImages.push(userProfileRes.data.avatar)
    }
    props.setUserImages(loadImages)
    props.setUsernames(loadUsernames)
  }

  const getCommentsByDiscussions = async () => {
    const res = Client.get(`/list/comments`)
    const commentsDiscussionRes = Client.get(
      `/list/discussions/${res.data.discussion}`
    )
    let loadComments = commentsDiscussionRes.data
    loadComments.reverse()
    props.setComments(loadComments)
    let loadUsernames = []
    let loadImages = []
    const userProfileRes = Client.get(
      `/detail/unicorn-user/${props.unicornUsers.members}`
    )
    for (let i = 0; i < commentsDiscussionRes.data.length; i++) {
      let username = Client.get(`/list/discussions/${res.data.commenter}`)
      loadUsernames.push(username.data.commenter)
      loadImages.push(userProfileRes.data.avatar)
    }
    props.setUserImages(loadImages)
    props.setUsernames(loadUsernames)
  }

  const getUnicornUser = async () => {
    if (props.unicornUser) {
      const response = Client.get(
        `/detail/unicorn-user/${props.unicornUser.id}`
      )
      props.setUnicornUser(response.data)
      props.toggleLoaded(true)
    } else {
      props.setReloads(props.reloads + 1)
      props.toggleReload(!props.reload)
    }
  }

  useEffect(() => {
    getCommunityDetail()
    getCommunityMembers()
    getDiscussions()
    getCommentsByDiscussions()
  }, [
    props.clicked,
    props.clickedDiscussion,
    props.clickedComment,
    props.deleted
  ])

  useEffect(() => {
    if (!props.loaded && props.reloads <= 20) {
      getUnicornUser()
    }
  }, [props.reload])

  const joinCommunity = async () => {
    if (props.unicornUser.members === null) {
      let updatedUser = Client.put(
        `/update/community/${props.unicornUser.id}`,
        {
          community: props.community
        }
      )
      props.setUnicornUser({ ...props.unicornUser, community: props.community })
      let population = props.griefStage.population
      Client.put(`/update/grief-stage/${props.griefStage.id}`, {
        population: parseInt(population + 1)
      })
      props.setGriefStage({
        ...props.griefStage,
        population: parseInt(population + 1)
      })
      let communityPopulation = props.community.population
      Client.put(`/update/community/${id}`, {
        population: parseInt(communityPopulation + 1)
      })
      props.setCommunity({
        ...props.community,
        population: parseInt(communityPopulation + 1)
      })
      props.toggleClicked(!props.clicked)
    }

    const leaveCommunity = async () => {
      let updatedUnicornUser = Client.put(
        `/update/unicorn-user/${props.unicornUser.id}`,
        {
          community: null
        }
      )
      if (updatedUnicornUser.data === null) {
        props.setOpenModal(true)
        props.setHeader('Uh-Oh')
        props.setErrorMessage('You are not in this community')
      }
      props.setUnicornUser({ ...props.unicornUser, community: null })
      let population = props.griefStage.population
      Client.put(`/update/grief-stage/${props.griefStage.id}`, {
        population: parseInt(population - 1)
      })
      props.setGriefStage({
        ...props.griefStage,
        population: parseInt(population - 1)
      })
      let communityPopulation = props.community.population
      Client.put(`/update/community/${id}`, {
        population: parseInt(communityPopulation - 1)
      })
      props.setCommunity({
        ...props.community,
        population: parseInt(communityPopulation - 1)
      })
      props.toggleClicked(!props.clicked)
    }

    const deleteDiscussion = async (id) => {
      Client.delete(`/delete/discussion/${id}`)
      props.toggleDeleted(!props.deleted)
    }

    const deleteComment = async (id) => {
      Client.delete(`/delete/comment/${id}`)
      props.toggleDeleted(!props.deleted)
    }

    // const upvoteComment = async () => {
    //   props.setUpvote({ category: props.upvote + 1 })
    //   Client.put(`/update/comment/${id}`, {
    //     category: props.newName
    //   })
    // }

    const handleNameChange = (e) => {
      e.preventDefault()
      props.setNewName(e.target.value)
    }

    const handleNameSubmit = async (e) => {
      e.preventDefault()
      props.setCommunity({ ...props.community, category: props.newName })
      Client.put(`/update/community/${id}`, {
        category: props.newName
      })
      props.toggleEditingName(false)
    }

    const handleImageChange = (e) => {
      e.preventDefault()
      props.setNewImage(e.target.value)
    }

    const handleImageSubmit = async (e) => {
      e.preventDefault()
      if (props.newImage.slice(0, 4) !== 'png' || 'jpeg') {
        props.setOpenModal(true)
        props.setHeader('This image file type is not allowed!')
        props.setErrorMessage(
          'Please choose a different image with png or jpeg format'
        )
      }
      props.setCommunity({ ...props.community, image: props.newImage })
      Client.put(`/update/community/${id}`, {
        image: props.newImage
      })
      props.toggleEditingImage(false)
    }

    const removeUser = async (userId) => {
      Client.put(`/update/unicorn-user/${userId}`, {
        community: null
      })
      let population = props.griefStage.population
      Client.put(`/update/grief-stage/${props.griefStage.id}`, {
        population: parseInt(population - 1)
      })
      props.setGriefStage({
        ...props.griefStage,
        population: parseInt(population - 1)
      })
      let communityPopulation = props.community.population
      Client.put(`/update/community/${id}`, {
        population: parseInt(communityPopulation - 1)
      })
      props.setCommunity({
        ...props.community,
        population: parseInt(communityPopulation - 1)
      })
      props.toggleClicked(!props.clicked)
    }

    return <div className="community-page"></div>
  }
}

export default CommunityPage
