import './style/App.css'
import './style/Nav.css'
import './style/About.css'
import './style/Landing.css'
import './style/Modal.css'
import './style/Home.css'
import './style/GriefStagePage.css'
import './style/SignUp.css'
import './style/Button.css'
import './style/Feed.css'
import { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import About from './pages/About'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import Landing from './pages/Landing'
import UnicornProfile from './pages/UnicornProfile'
import CommunityPage from './pages/CommunityPage'
import DiscussionPage from './pages/DiscussionPage'
import GriefStagePage from './pages/GriefStagePage'
import ResourcePage from './pages/ResourcePage'
import Feed from './pages/Feed'
import VerifyEmail from './pages/VerifyEmail'
import Modal from './components/Modal'
import Nav from './components/Nav'
import Profile from './components/Profile'
import Community from './components/Community'
import Client from './services/api'
import { API_BASE_URL } from './constants/apiConstants'
import axios from 'axios'

function App() {
  let token = '5d1ff085cc94337ebc0053dfcffd8220acd3c12c'
  // User State
  const [authenticated, toggleAuthenticated] = useState(false)
  const [unicornUser, setUnicornUser] = useState(false)
  const [unicornUsers, setUnicornUsers] = useState([])
  const [nonUserUnicorn, setNonUserUnicorn] = useState({
    username: '',
    bio: '',
    communityId: null
  })
  const [usernames, setUsernames] = useState([])
  const [emails, setEmails] = useState([])

  // Password State
  const [passwordUpdate, setPasswordUpdate] = useState(null)
  const [newPassword, setNewPassword] = useState('')
  const [confirmNewPassword, setConfirmNewPassword] = useState('')

  //Grief Stage State
  const [griefStage, setGriefStage] = useState('')
  const [griefStages, setGriefStages] = useState([])

  //Community State
  const [communities, setCommunities] = useState([])
  const [community, setCommunity] = useState('')
  const [clicked, toggleClicked] = useState(false)
  const [clickedComment, toggleClickedComment] = useState(false)
  const [clickedDiscussion, toggleClickedDiscussion] = useState(false)
  const [deleted, toggleDeleted] = useState(false)
  const [userImages, setUserImages] = useState([])
  const [editingName, toggleEditingName] = useState(false)
  const [newName, setNewName] = useState('')
  const [editingImage, toggleEditingImage] = useState(false)
  const [newImage, setNewImage] = useState(null)
  const [creator, setCreator] = useState({})
  const [editingColors, toggleEditingColors] = useState(false)
  const [newPrimaryColor, setNewPrimaryColor] = useState('')
  const [newSecondaryColor, setNewSecondaryColor] = useState('')
  const [loaded, toggleLoaded] = useState(false)
  const [reload, toggleReload] = useState(false)
  const [reloads, setReloads] = useState(0)

  // Discussion Page State
  const [discussion, setDiscussion] = useState('')
  const [discussions, setDiscussions] = useState([])
  const [comments, setComments] = useState([])
  const [comment, setComment] = useState(null)
  const [viewComments, toggleViewComments] = useState(false)
  const [upvote, setUpvote] = useState(null)

  // Modal State
  const [openModal, setOpenModal] = useState(false)
  const [popupMessage, setPopupMessage] = useState('')
  const [header, setHeader] = useState('')

  // Landing Page State
  const [isHovering, setIsHovering] = useState(false)
  const [image, setImage] = useState(null)

  // Direct popupMessage State
  const [directMessage, setDirectMessage] = useState([])

  // Resources State
  const [resources, setResources] = useState([])

  //Functions to control State

  const handleLogout = () => {
    setUnicornUser(null)
    toggleAuthenticated(false)
    localStorage.clear()
  }

  const checkSession = () => {
    let user = localStorage.getItem('userId')
    if (user) {
      setUnicornUser(true)
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      checkSession()
    }
  }, [])

  // // Check each time if the user is a pilgrim and authenticated to make certain commands

  // const checkSession = () => {
  //   const user = axios({
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Accept: 'application/json'
  //     },
  //     method: 'get',
  //     url: API_BASE_URL + '/rest-auth/user/',
  //     withCredentials: true
  //   })
  //     .then((response) => {
  //       if (response.status === 201) {
  //         setUnicornUser(unicornUser)
  //         toggleAuthenticated(true)
  //       }
  //     })
  //     .catch((error) => {
  //       if (error.response) {
  //         setOpenModal(true)
  //         setHeader('Uh-Oh')
  //         setPopupMessage('Please login to continue!')
  //         console.log('Error', error.message)
  //       }
  //     })
  // }

  return (
    <div className="App">
      {openModal && (
        <Modal
          setOpenModal={setOpenModal}
          popupMessage={popupMessage}
          header={header}
        />
      )}
      <Nav
        authenticated={authenticated}
        unicornUser={unicornUser}
        handleLogout={handleLogout}
      />
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <Landing
                setUnicornUser={setUnicornUser}
                toggleAuthenticated={toggleAuthenticated}
                isHovering={isHovering}
                setIsHovering={setIsHovering}
                image={image}
                setImage={setImage}
              />
            }
          />
          <Route
            path="/login"
            element={
              <Login
                setUnicornUser={setUnicornUser}
                toggleAuthenticated={toggleAuthenticated}
                usernames={usernames}
                setUsernames={setUsernames}
                emails={emails}
                setEmails={setEmails}
                openModal={openModal}
                setOpenModal={setOpenModal}
                header={header}
                setHeader={setHeader}
                popupMessage={popupMessage}
                setPopupMessage={setPopupMessage}
                token={token}
              />
            }
          />
          <Route
            path="/register"
            element={
              <Register
                usernames={usernames}
                setUsernames={setUsernames}
                emails={emails}
                setEmails={setEmails}
                openModal={openModal}
                setOpenModal={setOpenModal}
                popupMessage={popupMessage}
                header={header}
                setHeader={setHeader}
                setPopupMessage={setPopupMessage}
              />
            }
          />
          <Route
            path="/feed"
            element={
              <Home
                setGriefStages={setGriefStages}
                griefStages={griefStages}
                unicornUser={unicornUser}
                setUnicornUser={setUnicornUser}
                openModal={openModal}
                setOpenModal={setOpenModal}
                popupMessage={popupMessage}
                setPopupMessage={setPopupMessage}
                header={header}
                setHeader={setHeader}
                token={token}
              />
            }
          />
          <Route path="/about" element={<About />} />
          <Route
            path="/griefstage/:griefStageId"
            element={
              <GriefStagePage
                griefStages={griefStages}
                setGriefStages={setGriefStages}
                griefStage={griefStage}
                setGriefStage={setGriefStage}
                communities={communities}
                setCommunities={setCommunities}
                unicornUser={unicornUser}
                setUnicornUser={setUnicornUser}
                openModal={openModal}
                setOpenModal={setOpenModal}
                header={header}
                setHeader={setHeader}
                popupMessage={popupMessage}
                setPopupMessage={setPopupMessage}
                resources={resources}
                setResources={setResources}
                token={token}
              />
            }
          />
          <Route
            path="/community/"
            element={
              <CommunityPage
                community={community}
                setCommunity={setCommunity}
                communities={communities}
                setCommunities={setCommunities}
                unicornUser={unicornUser}
                setUnicornUser={setUnicornUser}
                unicornUsers={unicornUsers}
                setUnicornUsers={setUnicornUsers}
                griefStage={griefStage}
                setGriefStage={setGriefStage}
                discussion={discussion}
                setDiscussion={setDiscussion}
                discussions={discussions}
                setDiscussions={setDiscussions}
                comments={comments}
                setComments={setComments}
                comment={comment}
                setComment={setComment}
                openModal={openModal}
                setOpenModal={setOpenModal}
                header={header}
                setHeader={setHeader}
                popupMessage={popupMessage}
                setPopupMessage={setPopupMessage}
                upvote={upvote}
                setUpvote={setUpvote}
                clicked={clicked}
                toggleClicked={toggleClicked}
                clickedComment={clickedComment}
                toggleClickedComment={toggleClickedComment}
                clickedDiscussion={clickedDiscussion}
                toggleClickedDiscussion={toggleClickedDiscussion}
                deleted={deleted}
                toggleDeleted={toggleDeleted}
                userImages={userImages}
                setUserImages={setUserImages}
                editingName={editingName}
                toggleEditingName={toggleEditingName}
                newName={newName}
                setNewName={setNewName}
                editingImage={editingImage}
                toggleEditingImage={toggleEditingImage}
                newImage={newImage}
                setNewImage={setNewImage}
                creator={creator}
                setCreator={setCreator}
                editingColors={editingColors}
                toggleEditingColors={toggleEditingColors}
                newPrimaryColor={newPrimaryColor}
                newSecondaryColor={newSecondaryColor}
                setNewPrimaryColor={setNewPrimaryColor}
                setNewSecondaryColor={setNewSecondaryColor}
                loaded={loaded}
                toggleLoaded={toggleLoaded}
                reload={reload}
                toggleReload={toggleReload}
                reloads={reloads}
                setReloads={setReloads}
                token={token}
                viewComments={viewComments}
                toggleViewComments={toggleViewComments}
              />
            }
          />
          <Route
            path="/communities/:id"
            element={
              <Community
                unicornUser={unicornUser}
                setUnicornUser={setUnicornUser}
                community={community}
                setCommunity={setCommunity}
                griefStage={griefStage}
                setGriefStage={setGriefStage}
                directMessage={directMessage}
                setDirectMessage={setDirectMessage}
                token={token}
              />
            }
          />
          <Route
            path="/profile"
            element={
              <Profile
                unicornUser={unicornUser}
                setUnicornUser={setUnicornUser}
                community={community}
                setCommunity={setCommunity}
                griefStage={griefStage}
                setGriefStage={setGriefStage}
                directMessage={directMessage}
                setDirectMessage={setDirectMessage}
                token={token}
              />
            }
          />
          <Route
            path="/profile/:unicornUserId"
            element={
              <UnicornProfile
                unicornUser={unicornUser}
                nonUserUnicorn={nonUserUnicorn}
                setNonUserUnicorn={setNonUserUnicorn}
                community={community}
                setCommunity={setCommunity}
                griefStage={griefStage}
                setGriefStage={setGriefStage}
                directMessage={directMessage}
                setDirectMessage={setDirectMessage}
                token={token}
              />
            }
          />
          <Route
            path="/resources"
            element={
              <ResourcePage
                // unicornUser={unicornUser}
                // nonUserUnicorn={nonUserUnicorn}
                // setNonUserUnicorn={setNonUserUnicorn}
                resources={resources}
                setResources={setResources}
                token={token}
              />
            }
          />
          <Route
            path="/auth/verify-email/:key"
            element={
              <VerifyEmail
                unicornUser={unicornUser}
                setUnicornUser={setUnicornUser}
                nonUserUnicorn={nonUserUnicorn}
                setNonUserUnicorn={setNonUserUnicorn}
                token={token}
              />
            }
          />
          <Route
            path="/feed/:id"
            element={
              <Feed
                community={community}
                setCommunity={setCommunity}
                communities={communities}
                setCommunities={setCommunities}
                unicornUser={unicornUser}
                setUnicornUser={setUnicornUser}
                unicornUsers={unicornUsers}
                setUnicornUsers={setUnicornUsers}
                discussion={discussion}
                setDiscussion={setDiscussion}
                discussions={discussions}
                setDiscussions={setDiscussions}
                comments={comments}
                setComments={setComments}
                comment={comment}
                setComment={setComment}
                creator={creator}
                setCreator={setCreator}
                token={token}
                viewComments={viewComments}
                toggleViewComments={toggleViewComments}
                newImage={newImage}
                setNewImage={setNewImage}
              />
            }
          />
        </Routes>
      </main>
    </div>
  )
}

export default App
