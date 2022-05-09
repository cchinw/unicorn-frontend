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
import Modal from './components/Modal'
import Nav from './components/Nav'

function App() {
  // User State
  const [authenticated, toggleAuthenticated] = useState(false)
  const [unicornUser, setUnicornUser] = useState(null)
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
  const [griefStage, setGriefState] = useState('')
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
          <Route />
          <Route />
          <Route />
          <Route />
          <Route />
          <Route />
          <Route />
          <Route />
        </Routes>
      </main>
    </div>
  )
}

export default App
