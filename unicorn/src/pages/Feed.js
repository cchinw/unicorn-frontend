import { API_BASE_URL } from '../constants/apiConstants'
import { useEffect } from 'react'
import Discussion from '../components/Discussion'
import PostDiscussion from '../components/PostDiscussion'
import '../style/App.css'
import axios from 'axios'

const Feed = (props) => {
  const getFeed = () => {
    axios({
      // headers: {
      //   'Content-Type': 'application/json',
      //   Accept: 'application/json',
      //   Authorization: `Token ${props.token}`
      // },
      method: 'get',
      url:
        API_BASE_URL +
        `/unicorn/api/list/discussions/${props.discussions.community}`,
      withCredentials: true
    })
      .then((response) => {
        console.log(response, 'RESPONSE!!!!!!')
        const data = response.data.results
        console.log(data.results, 'RESPONSE')
        props.setDiscussions(data)
        console.log(props.discussions, 'GET FEED')
      })
      .catch((error) => {
        if (error.response) {
          //Get popup library for alerts
          console.log('Error', error.message)
        }
      })
  }

  // const discussionsArray = Object.values(props.discussions)

  useEffect(() => {
    getFeed()
  }, [])

  return (
    <div>
      <h2 className="faqheader">Explore and Join Communities</h2>
      <div className="msgContainer">
        <div>
          <div className="msgDisplay">
            {props.discussions.map((discussion) => (
              <div key={discussion.id} className="postMessage">
                <PostDiscussion
                  discussion={discussion}
                  setDiscussion={props.setDiscussion}
                  setDiscussions={props.setDiscussions}
                  discussions={props.discussions}
                  newimage={props.newImage}
                  setNewImage={props.setNewImage}
                  token={props.token}
                />
              </div>
            ))}
            <div className="guestMessage">
              <Discussion
                discussions={props.discussions}
                setDiscussions={props.setDiscussions}
                comments={props.comments}
                setComments={props.setComments}
                comment={props.comment}
                setComment={props.setComment}
                discussion={props.discussion}
                setDiscussion={props.setDiscussion}
                getFeed={getFeed}
                token={props.token}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Feed
