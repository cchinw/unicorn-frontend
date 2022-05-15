import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { API_BASE_URL } from '../constants/apiConstants'
import axios from 'axios'
import { Link } from 'react-router-dom'
import LeaveComment from '../components/LeaveComment'
import Client from '../services/api'

const CommunityPage = (props) => {
  const { id } = useParams()

  const res = API_BASE_URL + `/unicorn/api/detail/community/${id}`

  const getCommunityDetail = async () => {
    axios({
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      method: 'get',
      url: API_BASE_URL + '/unicorn/api/detail/community/' + id,
      withCredentials: true
    })
      .then((response) => {
        const data = response.data
        console.log(data, 'GET COMMUNITY DETAIL RESPONSE')
        props.setCommunity(data)
        console.log(props.community, 'COMMUNITY LIST')
      })
      .catch((error) => {
        if (error.response) {
          console.log('Error', error.message)
        }
      })
  }

  const getCommunityMembers = async () => {
    axios({
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      method: 'get',
      url:
        API_BASE_URL +
        `/unicorn/api/list/community/${props.unicornUsers.members}`,
      withCredentials: true
    })
      .then((response) => {
        const data = response.data
        console.log(data, 'RESPONSE FOR COMMUNITY MEMBERS')
        props.setUnicornUsers(data)
        console.log(props.unicornUsers, 'LIST Members')
      })
      .catch((error) => {
        if (error.response) {
          console.log('Error', error.message)
        }
      })
  }

  const getDiscussions = async () => {
    const discussionsRes = axios({
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      method: 'get',
      url: API_BASE_URL + `/unicorn/api/list/discussions/`,
      withCredentials: true
    })
      .then((response) => {
        const data = response.data
        console.log(data, 'RESPONSE FOR DISCUSSIONS')
        props.setDiscussion(data)
        console.log(props.discussion, 'LIST DISCUSSIONS')
      })
      .catch((error) => {
        if (error.response) {
          console.log('Error', error.message)
        }
      })
    let loadDiscussions = discussionsRes.data
    loadDiscussions.reverse()
    props.setDiscussion(loadDiscussions)
    let loadUsernames = []
    let loadImages = []

    const userProfileRes = axios({
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      method: 'get',
      url: API_BASE_URL + `/rest-auth/user/`,
      withCredentials: true
    })
      .then((response) => {
        const data = response.data
        console.log(data, 'RESPONSE FOR USER PROFILES')
        props.setUnicornUsers(data)
        console.log(props.unicornUsers, 'LIST USERS')
      })
      .catch((error) => {
        if (error.response) {
          console.log('Error', error.message)
        }
      })
    for (let i = 0; i < userProfileRes.data.length; i++) {
      let username = axios({
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        method: 'get',
        url:
          API_BASE_URL +
          `/unicorn/api/list/discussions/${props.unicornUsers.user}`,
        withCredentials: true
      })
        .then((response) => {
          const data = response.data
          console.log(data, 'RESPONSE FOR USER PROFILES')
          props.setUnicornUsers(data)
          console.log(props.unicornUsers, 'LIST USERS BY DISCUSSION')
        })
        .catch((error) => {
          if (error.response) {
            console.log('Error', error.message)
          }
        })
      // Client(false).get(`/list/discussions/${res.data.user}`)
      loadUsernames.push(username.data.user)
      loadImages.push(userProfileRes.data.avatar)
    }
    props.setUserImages(loadImages)
    props.setUsernames(loadUsernames)
  }

  const getCommentsByDiscussions = async () => {
    const res = Client(false).get(`/list/comments`)
    const commentsDiscussionRes = Client(false).get(
      `/list/discussions/${res.data.discussion}`
    )
    let loadComments = commentsDiscussionRes.data
    loadComments.reverse()
    props.setComments(loadComments)
    let loadUsernames = []
    let loadImages = []
    const userProfileRes = Client(false).get(
      `/detail/unicorn-user/${props.unicornUsers.members}`
    )
    for (let i = 0; i < commentsDiscussionRes.data.length; i++) {
      let username = Client(false).get(
        `/list/discussions/${res.data.commenter}`
      )
      loadUsernames.push(username.data.commenter)
      loadImages.push(userProfileRes.data.avatar)
    }
    props.setUserImages(loadImages)
    props.setUsernames(loadUsernames)
  }

  const getUnicornUser = async () => {
    if (props.unicornUser) {
      const response = Client(false).get(
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
      let updatedUser = Client(false).put(
        `/update/unicorn-user/${props.unicornUser.id}`,
        {
          community: props.community
        }
      )
      props.setUnicornUser({ ...props.unicornUser, community: props.community })
      let population = props.griefStage.population
      Client(false).put(`/update/grief-stage/${props.griefStage.members}`, {
        population: parseInt(population + 1)
      })
      props.setGriefStage({
        ...props.griefStage,
        population: parseInt(population + 1)
      })
      let communityPopulation = props.community.population
      Client(false).put(`/update/community/${id}`, {
        population: parseInt(communityPopulation + 1)
      })
      props.setCommunity({
        ...props.community,
        population: parseInt(communityPopulation + 1)
      })
      props.toggleClicked(!props.clicked)
    }

    const leaveCommunity = async () => {
      let updatedUnicornUser = Client(false).put(
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
      Client(false).put(`/update/grief-stage/${props.griefStage.id}`, {
        population: parseInt(population - 1)
      })
      props.setGriefStage({
        ...props.griefStage,
        population: parseInt(population - 1)
      })
      let communityPopulation = props.community.population
      Client(false).put(`/update/community/${id}`, {
        population: parseInt(communityPopulation - 1)
      })
      props.setCommunity({
        ...props.community,
        population: parseInt(communityPopulation - 1)
      })
      props.toggleClicked(!props.clicked)
    }

    const deleteDiscussion = async (id) => {
      Client(false).delete(`/delete/discussion/${id}`)
      props.toggleDeleted(!props.deleted)
    }

    const deleteComment = async (id) => {
      Client(false).delete(`/delete/comment/${id}`)
      props.toggleDeleted(!props.deleted)
    }

    // const upvoteComment = async () => {
    //   props.setUpvote({ category: props.upvote + 1 })
    //   Client(false).put(`/update/comment/${id}`, {
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
      Client(false).put(`/update/community/${id}`, {
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
      Client(false).put(`/update/community/${id}`, {
        image: props.newImage
      })
      props.toggleEditingImage(false)
    }

    const removeUser = async (userId) => {
      Client(false).put(`/update/unicorn-user/${userId}`, {
        community: null
      })
      let population = props.griefStage.population
      Client(false).put(`/update/grief-stage/${props.griefStage.id}`, {
        population: parseInt(population - 1)
      })
      props.setGriefStage({
        ...props.griefStage,
        population: parseInt(population - 1)
      })
      let communityPopulation = props.community.population
      Client(false).put(`/update/community/${id}`, {
        population: parseInt(communityPopulation - 1)
      })
      props.setCommunity({
        ...props.community,
        population: parseInt(communityPopulation - 1)
      })
      props.toggleClicked(!props.clicked)
    }

    // const checkPriviledge = async () => {
    //   const response = Client(false).get(`list/users`)
    //   if (res.data.user_type === 1) {

    //   }
    // }

    return (
      <div className="community-details">
        <div className="first-col">
          {!props.unicornUser ? (
            <div>Loading</div>
          ) : // if creator or admin
          parseInt(props.community.creatorId) ===
              parseInt(props.unicornUser.id) ||
            props.unicornUser.user_type === 1 ? (
            //if editing
            props.editingName ? (
              <div>
                <input type="text" onChange={handleNameChange} required />
                <div>
                  <button
                    className="btn"
                    onClick={() => props.toggleEditingName(false)}
                  >
                    Cancel
                  </button>
                  <button className="btn" onClick={handleNameSubmit}>
                    Submit
                  </button>
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex' }}>
                <h1>{props.community.category}</h1>
                <button
                  className="btn"
                  onClick={() => props.toggleEditingName(true)}
                >
                  Edit
                </button>
              </div>
            )
          ) : (
            // not creator
            <h1>{props.community.name}</h1>
          )}
          {!props.unicornUser ? (
            <div>Loading</div>
          ) : parseInt(props.community.creator) ===
              parseInt(props.unicornUser.id) ||
            props.unicornUser.user_type === 1 ? (
            props.editingImage ? (
              <div>
                <input type="text" onChange={handleImageChange} required />
                <div>
                  <button
                    className="btn"
                    onClick={() => props.toggleEditingImage(false)}
                  >
                    Cancel
                  </button>
                  <button className="btn" onClick={handleImageSubmit}>
                    Submit
                  </button>
                </div>
              </div>
            ) : (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <img
                  className="community-image"
                  src={props.community.image}
                  alt={props.community.category}
                />
                <button
                  className="btn"
                  onClick={() => props.toggleEditingImage(true)}
                >
                  Edit
                </button>
              </div>
            )
          ) : (
            <img
              className="community-image"
              src={props.community.image}
              alt={props.community.name}
            />
          )}
          {props.unicornUser === null ? (
            <div>Login to join</div>
          ) : parseInt(props.unicornUser.community) === parseInt(id) ? (
            <button onClick={() => leaveCommunity()}>Leave Community</button>
          ) : (
            <button onClick={() => joinCommunity()}>Join Community</button>
          )}
          {!props.unicornUser ? (
            <div>Loading</div>
          ) : parseInt(props.unicornUser.id) ===
            parseInt(props.creator.creator) ? (
            <h2>Creator: {props.creator.username}</h2>
          ) : (
            <h2>
              Creator:{' '}
              <Link to={`/profile/${props.creator.id}`}>
                {props.creator.username}
              </Link>
            </h2>
          )}
          <h3>Members:</h3>
          {props.unicornUsers.map((unicornUser) => (
            <div key={unicornUser.id}>
              {unicornUser.id === props.unicornUser.id ? (
                <h3>{unicornUser.username}</h3>
              ) : parseInt(props.community.creator) ===
                  parseInt(props.unicornUser.id) ||
                props.unicornUser.user_type === 1 ? (
                <div style={{ display: 'flex' }}>
                  <Link to={`/detail/unicorn-user/${unicornUser.id}`}>
                    <h3>{unicornUser.username}</h3>
                  </Link>
                  <button
                    className="btn"
                    onClick={() => removeUser(unicornUser.id)}
                    style={{ marginLeft: '1vh' }}
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <Link to={`/profile/${unicornUser.id}`}>
                  <h3>{unicornUser.username}</h3>
                </Link>
              )}
            </div>
          ))}
          {/* preventing negative population  */}
          {props.community.population < 0 ? (
            <h3 className="population">Population: 0</h3>
          ) : (
            <h3 className="population">
              Population: {props.community.population}
            </h3>
          )}
        </div>

        {/* Second div for comments */}

        <div className="second-col comments">
          {/* Comments Input Box */}

          {props.unicornUser === null ? (
            <div>Login to comment</div>
          ) : (
            <LeaveComment
              clickedComment={props.clickedComment}
              toggleClickedComment={props.toggleClickedComment}
              communityId={id}
              unicornUser={props.unicornUser}
            />
          )}

          {/* Render all comments on communiuty page */}
          <div className="third-col comments-area">
            {props.comments.map((comment, index) => (
              <div className="singleComment" key={comment.id}>
                <div className="comment-userName">
                  {props.unicornUser.id === comment.unicornUserId ? (
                    <div>{props.usernames[index]}</div>
                  ) : (
                    <Link to={`/profile/${comment.unicornUserId}`}>
                      {props.usernames[index]}
                    </Link>
                  )}
                </div>
                <div className="image-comment">
                  <img
                    src={props.userImages[index]}
                    alt="user-Image"
                    className="user-image-comment"
                  />
                  <div className="comment-comment">{comment.comment}</div>
                </div>
                {comment.unicornUserId === props.unicornUser.id ? (
                  <button
                    className="comment-button btn"
                    onClick={() => deleteComment(comment.id)}
                  >
                    Delete
                  </button>
                ) : (
                  <div></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
}

export default CommunityPage
