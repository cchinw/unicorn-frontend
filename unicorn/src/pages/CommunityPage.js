// import { useEffect } from 'react'
// import { useParams } from 'react-router-dom'
// import { API_BASE_URL } from '../constants/apiConstants'
// import axios from 'axios'
// import { Link } from 'react-router-dom'
// import LeaveComment from '../components/LeaveComment'
// import StartDiscussion from '../components/StartDiscussion'
// import Client from '../services/api'

const CommunityPage = (props) => {
  //   const { id } = useParams()

  //   const res = API_BASE_URL + `/unicorn/api/detail/community/${id}`

  //   const getAllCommunities = async () => {
  //     axios({
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Accept: 'application/json',
  //         Authorization: `Token ${props.token}`
  //       },
  //       method: 'get',
  //       url: API_BASE_URL + `/unicorn/api/list/communities/`,
  //       withCredentials: true
  //     })
  //       .then((response) => {
  //         const data = response.data.results
  //         console.log(data, 'GET COMMUNITY RESPONSE')
  //         props.setCommunities(data)
  //         console.log(props.community, 'COMMUNITY DETAIL')
  //       })
  //       .catch((error) => {
  //         if (error.response) {
  //           console.log('Error', error.message)
  //         }
  //       })
  //   }

  //   const getCommunityMembers = async () => {
  //     axios({
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Accept: 'application/json',
  //         Authorization: `Token ${props.token}`
  //       },
  //       method: 'get',
  //       url:
  //         API_BASE_URL +
  //         `/unicorn/api/list/community/${props.communities.members}`,
  //       withCredentials: true
  //     })
  //       .then((response) => {
  //         const data = response.data
  //         console.log(data, 'RESPONSE FOR COMMUNITY MEMBERS')
  //         props.setCommunities(data)
  //         console.log(props.unicornUsers, 'LIST Members')
  //       })
  //       .catch((error) => {
  //         if (error.response) {
  //           console.log('Error', error.message)
  //         }
  //       })
  //   }

  //   const getCommunityDiscussions = async () => {
  //     const discussionsRes = axios({
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Accept: 'application/json',
  //         Authorization: `Token ${props.token}`
  //       },
  //       method: 'get',
  //       url:
  //         API_BASE_URL +
  //         `/unicorn/api/list/discussions/${props.discussions.community}`,
  //       withCredentials: true
  //     })
  //       .then((response) => {
  //         const data = response.data
  //         console.log(data, 'RESPONSE FOR DISCUSSIONS BY COMMUNITY')
  //         props.setDiscussions(data)
  //         console.log(props.discussions, 'LIST DISCUSSIONS')
  //       })
  //       .catch((error) => {
  //         if (error.response) {
  //           console.log('Error', error.message)
  //         }
  //       })
  //     let loadDiscussions = discussionsRes.data
  //     // loadDiscussions.reverse()
  //     props.setDiscussions(loadDiscussions)
  //     let loadUsernames = []
  //     let loadImages = []

  //     const username = axios({
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Accept: 'application/json',
  //         Authorization: `Token ${props.token}`
  //       },
  //       method: 'get',
  //       url:
  //         API_BASE_URL +
  //         `/unicorn/api/list/discussions/${props.discussions.user}`,
  //       withCredentials: true
  //     })
  //       .then((response) => {
  //         let data = response.data
  //         props.setDiscussions(data)
  //         loadUsernames.push(data)
  //         loadImages.push(data.avatar)
  //       })
  //       .catch((error) => {
  //         if (error.response) {
  //           console.log('Error', error.message)
  //         }
  //       })
  //     props.setUsernames(loadUsernames)
  //     props.setUserImages(loadImages)
  //   }

  //   const getCommentsByDiscussions = async () => {
  //     const commentsRes = axios({
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Accept: 'application/json',
  //         Authorization: `Token ${props.token}`
  //       },
  //       method: 'get',
  //       url:
  //         API_BASE_URL +
  //         `/unicorn/api/list/comments/${props.comments.discussion}`,
  //       withCredentials: true
  //     })
  //       .then((response) => {
  //         const data = response.data
  //         console.log(data, 'RESPONSE FOR Comments BY DISCUSSIONS')
  //         props.setComments(data)
  //         props.toggleViewComments(true)
  //         console.log(props.comments, 'LIST COMMENTS')
  //       })
  //       .catch((error) => {
  //         if (error.response) {
  //           console.log('Error', error.message)
  //         }
  //       })
  //     let loadComments = commentsRes.data
  //     // loadComments.reverse()
  //     props.setComments(loadComments)
  //     let loadUsernames = []
  //     let loadImages = []

  //     const username = axios({
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Accept: 'application/json',
  //         Authorization: `Token ${props.token}`
  //       },
  //       method: 'get',
  //       url:
  //         API_BASE_URL + `/unicorn/api/list/comments/${props.comments.commenter}`,
  //       withCredentials: true
  //     })
  //       .then((response) => {
  //         let data = response.data
  //         props.setComments(data)
  //         loadUsernames.push(data)
  //         loadImages.push(data.avatar)
  //       })
  //       .catch((error) => {
  //         if (error.response) {
  //           console.log('Error', error.message)
  //         }
  //       })
  //     props.setUsernames(loadUsernames)
  //     props.setUserImages(loadImages)
  //   }

  //   const getUnicornUser = async () => {
  //     if (props.unicornUser) {
  //       axios({
  //         headers: {
  //           'Content-Type': 'application/json',
  //           Accept: 'application/json',
  //           Authorization: `Token ${props.token}`
  //         },
  //         method: 'get',
  //         url:
  //           API_BASE_URL +
  //           `/unicorn/api/detail/unicorn-user/${props.unicornUser.id}`,
  //         withCredentials: true
  //       })
  //         .then((response) => {
  //           let data = response.data
  //           props.setUnicornUser(data)
  //           props.toggleLoaded(true)
  //         })
  //         .catch((error) => {
  //           if (error.response) {
  //             console.log('Error', error.message)
  //           }
  //         })
  //     } else {
  //       props.setReloads(props.reloads + 1)
  //       props.toggleReload(!props.reload)
  //     }
  //   }

  //   useEffect(() => {
  //     getAllCommunities()
  //     getCommunityMembers()
  //     getCommunityDiscussions()
  //     getCommentsByDiscussions()
  //   }, [
  //     props.clicked,
  //     props.clickedDiscussion,
  //     props.clickedComment,
  //     props.deleted
  //   ])

  //   useEffect(() => {
  //     if (!props.loaded && props.reloads <= 20) {
  //       getUnicornUser()
  //     }
  //   }, [props.reload])

  //   const joinCommunity = async () => {
  //     axios({
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Accept: 'application/json',
  //         Authorization: `Token ${props.token}`
  //       },
  //       method: 'put',
  //       url:
  //         API_BASE_URL +
  //         `/unicorn/api/update/community/${props.community.members}`,
  //       data: props.community,
  //       withCredentials: true
  //     })
  //       .then((response) => {
  //         let data = response.data
  //         let joinedCommunity = parseInt(data + 1)
  //         props.setCommunity({
  //           ...props.community,
  //           members: parseInt(joinedCommunity)
  //         })
  //         props.toggleClicked(!props.clicked)
  //       })
  //       .catch((error) => {
  //         if (error.response) {
  //           console.log('Error', error.message)
  //         }
  //       })
  //   }

  //   const leaveCommunity = async () => {
  //     axios({
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Accept: 'application/json',
  //         Authorization: `Token ${props.token}`
  //       },
  //       method: 'put',
  //       url:
  //         API_BASE_URL +
  //         `/unicorn/api/update/community/${props.community.members}`,
  //       data: props.community,
  //       withCredentials: true
  //     })
  //       .then((response) => {
  //         let data = response.data
  //         let leftCommunity = parseInt(data - 1)
  //         props.setCommunity({
  //           ...props.community,
  //           members: parseInt(leftCommunity)
  //         })
  //         props.toggleClicked(!props.clicked)
  //       })
  //       .catch((error) => {
  //         if (error.response) {
  //           console.log('Error', error.message)
  //         }
  //       })
  //   }

  //   const deleteDiscussion = async (id) => {
  //     axios({
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Accept: 'application/json',
  //         Authorization: `Token ${props.token}`
  //       },
  //       method: 'delete',
  //       url: `/unicorn/api/delete/discussion/${id}`,
  //       withCredentials: true
  //     })
  //       .then((response) => {
  //         if (response.status === 201) {
  //           props.setDiscussion()
  //         }
  //       })
  //       .catch((error) => {
  //         if (error.response) {
  //           //Get popup library for alerts
  //           console.log('Error', error.message)
  //         }
  //       })
  //   }

  //   // const deleteComment = async (id) => {
  //   //   Client(false).delete(`/delete/comment/${id}`)
  //   //   props.toggleDeleted(!props.deleted)
  //   // }

  //   // const upvoteComment = async () => {
  //   //   props.setUpvote({ category: props.upvote + 1 })
  //   //   Client(false).put(`/update/comment/${id}`, {
  //   //     category: props.newName
  //   //   })
  //   // }

  //   // const handleNameChange = (e) => {
  //   //   e.preventDefault()
  //   //   axios({
  //   //     headers: {
  //   //       'Content-Type': 'application/json',
  //   //       Accept: 'application/json',
  //   //       Authorization: `Token ${props.token}`
  //   //     },
  //   //     method: 'put',
  //   //     url:
  //   //       API_BASE_URL +
  //   //       `/unicorn/api/update/community/${props.community.id}`,
  //   //     data: props.community,
  //   //     withCredentials: true
  //   //   })
  //   //     .then((response) => {
  //   //       let data = response.data

  //   //       props.toggleClicked(!props.clicked)
  //   //     })
  //   //     .catch((error) => {
  //   //       if (error.response) {
  //   //         console.log('Error', error.message)
  //   //       }
  //   //     })
  //   // }

  //   const handleImageChange = (e) => {
  //     e.preventDefault()
  //     props.setNewImage(e.target.value)
  //   }

  //   // const handleImageSubmit = async (e) => {
  //   //   e.preventDefault({
  //   //     image: props.newImage,
  //   //   })
  //   //   console.log('HANDLE SUBMIT WORKS!')
  //   //   let formData = new FormData()
  //   //   formData.append('image', props.newImage)

  //   //   axios({
  //   //     headers: {
  //   //       'Content-Type': 'multipart/form-data'
  //   //     },
  //   //     method: 'put',
  //   //     url: API_BASE_URL + `unicorn/api/update/community/${props.community.id}`,
  //   //     data: formData,
  //   //     withCredentials: false,
  //   //     Authorization: `Token ${props.token}`
  //   //   })
  //   //     .then((response) => {
  //   //       if (response.status === 201) {
  //   //         let data = response.data
  //   //         setCommunity(data.image, )
  //   //         props.toggleEditingImage(false)
  //   //       }
  //   //     })
  //   //     .catch((error) => {
  //   //       if (error.response) {
  //   //         //Get popup library for alerts
  //   //         console.log('Error', error.message)
  //   //       }
  //   //     })
  //   // }

  //   // const removeUser = async (userId) => {
  //   //   Client(false).put(`/update/unicorn-user/${userId}`, {
  //   //     community: null
  //   //   })
  //   //   let population = props.griefStage.population
  //   //   Client(false).put(`/update/grief-stage/${props.griefStage.id}`, {
  //   //     population: parseInt(population - 1)
  //   //   })
  //   //   props.setGriefStage({
  //   //     ...props.griefStage,
  //   //     population: parseInt(population - 1)
  //   //   })
  //   //   let communityPopulation = props.community.population
  //   //   Client(false).put(`/update/community/${id}`, {
  //   //     population: parseInt(communityPopulation - 1)
  //   //   })
  //   //   props.setCommunity({
  //   //     ...props.community,
  //   //     population: parseInt(communityPopulation - 1)
  //   //   })
  //   //   props.toggleClicked(!props.clicked)
  //   // }

  //   // const checkPriviledge = async () => {
  //   //   const response = Client(false).get(`list/users`)
  //   //   if (res.data.user_type === 1) {

  //   //   }
  //   // }

  return (
    <div></div>
    //     <div className="communityPage">
    //       <div className="communityPage-left">
    //         <StartDiscussion
    //           clickedDiscussion={props.clickedDiscussion}
    //           toggleClickedDiscussion={props.toggleClickedDiscussion}
    //           id={id}
    //           unicornUser={props.unicornUser}
    //         />

    //         <div className="render-single-discussion">
    //           {props.discussions.map((discussion, index) => (
    //             <div key={discussion.id} className="singleDiscussion">
    //               <div className="discussion-username">
    //                 {props.discussion.user === discussion.user ? (
    //                   <div>{props.usernames[index]}</div>
    //                 ) : (
    //                   <Link to={`/profile/${discussion.user}`}>
    //                     {props.usernames[index]}
    //                   </Link>
    //                 )}
    //               </div>
    //               <div className="image-discussion">
    //                 <img
    //                   src={props.unicornUser.avatar}
    //                   alt="user-image"
    //                   className="user-image-discussion"
    //                 />
    //                 <div className="discussion-content">
    //                   <h4>{discussion.topic}</h4>
    //                   <p>{discussion.content}</p>
    //                 </div>
    //                 <div>
    //                   {props.comments.map((comment, index) => (
    //                     <div key={comment.id} className="singleComment">
    //                       <div
    //                         onClick={() => getCommentsByDiscussions(discussion.id)}
    //                         className="comment-username"
    //                       >
    //                         {props.comment.discussion === discussion.id ? (
    //                           <div>{props.usernames[index]}</div>
    //                         ) : (
    //                           <Link to={`/profile/${discussion.user}`}>
    //                             {props.usernames[index]}
    //                           </Link>
    //                         )}
    //                       </div>
    //                     </div>
    //                   ))}
    //                   {discussion.user === props.unicornUser.id ? (
    //                     <button
    //                       className="discussion-button btn"
    //                       onClick={() => deleteDiscussion(discussion.id)}
    //                     >
    //                       Delete
    //                     </button>
    //                   ) : (
    //                     <div></div>
    //                   )}
    //                 </div>
    //               </div>
    //             </div>
    //           ))}
    //         </div>
    //       </div>

    //       <div className="communityPage-right">
    //         <div style={{ display: 'flex' }}>
    //           <h1>{props.community.name}</h1>
    //         </div>
    //         <div
    //           style={{
    //             display: 'flex',
    //             flexDirection: 'column',
    //             justifyContent: 'center',
    //             alignItems: 'center'
    //           }}
    //         >
    //           <img
    //             className="community-image"
    //             src={props.community.banner}
    //             style={{ borderColor: 'black' }}
    //             alt={props.community.name}
    //           />
    //         </div>
    //         <div className="toggle-join-leave">
    //           {parseInt(props.communities.members) ===
    //           parseInt(props.unicornUser.id) ? (
    //             <button onClick={() => leaveCommunity()}>Leave Community</button>
    //           ) : (
    //             <button onClick={() => joinCommunity()}>Join Community</button>
    //           )}
    //         </div>
    //         <div className="community-creator">
    //           {parseInt(props.communities.creator) ===
    //           parseInt(props.unicornUser.id) ? (
    //             <h2>
    //               This Community was created by {props.creator.creator.username}
    //             </h2>
    //           ) : (
    //             <h2>
    //               This Community was created by {''}
    //               <Link to={`/profile/${props.unicornUser.id}`}></Link>
    //             </h2>
    //           )}
    //         </div>
    //         <div className="community-members">
    //           <h3>Members</h3>
    //           {props.unicornUsers.map((user) => (
    //             <div className="username" key={user.id} style={{ display: 'flex' }}>
    //               <Link to={`/profile/${user.id}`}>
    //                 <h3>{user.username}</h3>
    //               </Link>
    //             </div>
    //           ))}
    //         </div>
    //       </div>
    //     </div>
  )
}

export default CommunityPage
