import './style/App.css'
import './style/Nav.css'
import './style/About.css'
import './style/Landing.css'
import './style/Modal.css'
import { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import axios from 'axios'
import { CheckSession } from './services/Auth'
import About from './pages/About'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import Landing from './pages/Landing'
import ResourcePage from './pages/ResourcePage'
import UnicornProfile from './pages/UnicornProfile'
import CommunityPage from './pages/CommunityPage'
import DiscussionPage from './pages/DiscussionPage'
import GriefStagePage from './pages/GriefStagePage'
import Modal from './components/Modal'
import Nav from './components/Nav'
import Profile from './components/Profile'

function App() {
  // User State
  const [authenticated, toggleAuthenticated] = useState(false)
  const [unicornUser, setUnicornUser] = useState(null)
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

  // Discussion Page State
  const [discussion, setDiscussion] = useState([])
  const [comments, setComments] = useState([])
  const [upvote, setUpvote] = useState(null)

  // Modal State
  const [openModal, setOpenModal] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [header, setHeader] = useState('')

  // Landing Page State
  const [isHovering, setIsHovering] = useState(false)
  const [image, setImage] = useState(null)

  // Direct Message State
  const [directMessages, setDirectMessages] = useState([])

  // Resources State
  const [resources, setResources] = useState([])

  //Functions to control State

  const handleLogout = () => {
    setUnicornUser(null)
    toggleAuthenticated(false)
    localStorage.clear()
  }

  // Check each time if the user is a pilgrim and authenticated to make certain commands
  // const checkToken = async () => {
  //   const unicornUser = await CheckSession()
  //   setUnicornUser(unicornUser)
  //   toggleAuthenticated(true)
  // }

  // Verify token
  // useEffect(() => {
  //   const token = localStorage.getItem('token')
  //   if (token) {
  //     checkToken()
  //   }
  // }, [])

  return (
    <div className="App">
      {openModal && (
        <Modal
          setOpenModal={setOpenModal}
          errorMessage={errorMessage}
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
            path="/landing-page"
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
                errorMessage={errorMessage}
                header={header}
                setHeader={setHeader}
                setErrorMessage={setErrorMessage}
              />
            }
          />
          <Route
            path="/"
            element={
              <Home
                setGriefStages={setGriefStages}
                griefStages={griefStages}
                unicornUser={unicornUser}
                setUnicornUser={setUnicornUser}
                openModal={openModal}
                setOpenModal={setOpenModal}
                errorMessage={errorMessage}
                setErrorMessage={setErrorMessage}
                header={header}
                setHeader={setHeader}
              />
            }
          />
          <Route path="/about" element={<About />} />
          <Route
            path="/griefstage/:griefStageId"
            element={
              <GriefStagePage
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
                errorMessage={errorMessage}
                setErrorMessage={setErrorMessage}
                resources={resources}
                setResources={setResources}
              />
            }
          />
          <Route
            path="/communitypage/communityId"
            element={
              <CommunityPage
                community={community}
                setCommunity={setCommunity}
                unicornUser={unicornUser}
                setUnicornUser={setUnicornUser}
                unicornUsers={unicornUsers}
                setUnicornUsers={setUnicornUsers}
                griefStage={griefStage}
                setGriefStage={setGriefStage}
                discussion={discussion}
                setDiscussion={setDiscussion}
                comments={comments}
                setComments={setComments}
                openModal={openModal}
                setOpenModal={setOpenModal}
                header={header}
                setHeader={setHeader}
                errorMessage={errorMessage}
                setErrorMessage={setErrorMessage}
                upvote={upvote}
                setUpvote={setUpvote}
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
                directMessages={directMessages}
                setDirectMessages={setDirectMessages}
              />
            }
          />
          <Route
            path="/profile/:unicornUserId"
            element={
              <Profile
                unicornUser={unicornUser}
                nonUserUnicorn={nonUserUnicorn}
                setNonUserUnicorn={setNonUserUnicorn}
                community={community}
                setCommunity={setCommunity}
                griefStage={griefStage}
                setGriefStage={setGriefStage}
                directMessages={directMessages}
                setDirectMessages={setDirectMessages}
              />
            }
          />
        </Routes>
      </main>
    </div>
  )
}

export default App
