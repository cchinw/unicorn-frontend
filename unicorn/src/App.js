import './style/App.css'
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

  // Direct Message State
  const [directMessages, setDirectMessages] = useState([])

  //Functions to control State

  const handleLogout = () => {
    setUnicornUser(null)
    toggleAuthenticated(false)
    localStorage.clear()
  }

  // Check each time if the user is a pilgrim and authenticated to make certain commands
  const checkToken = async () => {
    const unicornUser = await CheckSession()
    setUnicornUser(unicornUser)
    toggleAuthenticated(true)
  }

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
            path="/"
            element={
              <Landing
                setUnicornUser={setUnicornUser}
                toggleAuthenticated={toggleAuthenticated}
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
          <Route path="/register" element={<Register />} />
          <Route
            path="/home"
            element={
              <Home
                setGriefStages={setGriefStages}
                griefStages={griefStages}
                unicornUser={unicornUser}
                openModal={openModal}
                setOpenModal={setOpenModal}
                errorMessage={errorMessage}
                setHeader={setHeader}
                setErrorMessage={setErrorMessage}
              />
            }
          />
          <Route
            path="/griefstage/:griefStageId"
            element={
              <GriefStagePage
                griefStage={griefStage}
                setGriefStage={setGriefStage}
                communities={communities}
                setCommunities={setCommunities}
                unicornUser={unicornUser}
                openModal={openModal}
                setOpenModal={setOpenModal}
                setHeader={setHeader}
                setErrorMessage={setErrorMessage}
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
