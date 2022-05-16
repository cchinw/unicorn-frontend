import { API_BASE_URL } from '../constants/apiConstants'
import axios from 'axios'
import { useEffect } from 'react'

const PostDiscussion = ({
  token,
  discussions,
  setDiscussions,
  discussion,
  setDiscussion,
  newImage,
  setNewImage
}) => {
  const getCommunityDiscussions = async () => {
    const discussionsRes = axios({
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Token ${token}`
      },
      method: 'get',
      url:
        API_BASE_URL + `/unicorn/api/list/discussions/${discussions.community}`,
      withCredentials: true
    })
      .then((response) => {
        const data = response.data.results
        console.log(data, 'RESPONSE FOR DISCUSSIONS BY COMMUNITY')
        setDiscussions(data)
        console.log(discussions, 'LIST DISCUSSIONS')
      })
      .catch((error) => {
        if (error.response) {
          console.log('Error', error.message)
        }
      })
  }

  const deleteDiscussion = async (id) => {
    axios({
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Token ${token}`
      },
      method: 'delete',
      url: `/unicorn/api/delete/discussion/${id}`,
      withCredentials: true
    })
      .then((response) => {
        if (response.status === 201) {
          getCommunityDiscussions()
        }
      })
      .catch((error) => {
        if (error.response) {
          //Get popup library for alerts
          console.log('Error', error.message)
        }
      })
  }

  const updateDiscussion = async () => {
    axios({
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Token ${token}`
      },
      method: 'put',
      url: API_BASE_URL + `/unicorn/api/update/community/${discussion.id}`,
      data: discussion,
      withCredentials: true
    })
      .then((response) => {
        let data = response.data
        setDiscussion({
          ...discussion,
          data
        })
        // props.toggleClicked(!props.clicked)
      })
      .catch((error) => {
        if (error.response) {
          console.log('Error', error.message)
        }
      })
  }

  useEffect(() => {
    getCommunityDiscussions()
    updateDiscussion()
    deleteDiscussion()
  }, [])

  const handleChange = (e) => {
    e.preventDefault()
    setDiscussion(e.target.value)
  }

  const handleImageChange = (e) => {
    e.preventDefault({ image: newImage })
    console.log('HANDLE SUBMIT WORKS!')

    let formData = new FormData()
    formData.append('image', newImage)

    axios({
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      method: 'post',
      url: API_BASE_URL + `/unicorn/api/update/community/${discussion.id}`,
      data: formData,
      withCredentials: false
    })
      .then((response) => {
        if (response.status === 201) {
          let data = response.data
          setNewImage({ newImage, data })
        }
      })
      .catch((error) => {
        if (error.response) {
          //Get popup library for alerts
          console.log('Error', error.message)
        }
      })
  }

  return (
    <div className="postMessage">
      <div className="msgImgDiv">
        <img className="msgImage" src={discussion.banner} />
      </div>

      <div className="updateDeleteDiv">
        <h3>{discussion.topic}</h3>
        <p>{discussion.content}</p>
        <div className="updateMsgContainer">
          <div className="updateMsg">
            <input
              className="uploadImage"
              placeholder="Upload new image file"
              onChange={handleImageChange}
              type="file"
              accept="image/jpeg, image/png"
              value={newImage}
            ></input>
            <textarea
              rows="10"
              className="messageText"
              placeholder="Edit your message here..."
              type="text"
              onChange={handleChange}
              value={discussion}
            ></textarea>
          </div>
          <div className="updateBtnDiv">
            <button
              className="updateBtn"
              onClick={() => {
                updateDiscussion(discussion.id)
              }}
            >
              Update
            </button>
          </div>
          <div>
            <button
              className="updateBtn"
              onClick={() => {
                deleteDiscussion(discussion.id)
              }}
            >
              Delete Message
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostDiscussion
