import './style/App.css'
import './style/Nav.css'
import './style/About.css'
import './style/Landing.css'
import './style/Modal.css'
import './style/Home.css'
import './style/GriefStagePage.css'
import './style/SignUp.css'
import { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { CheckSession } from './services/Auth'
import About from './pages/About'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import Landing from './pages/Landing'
import UnicornProfile from './pages/UnicornProfile'
import CommunityPage from './pages/CommunityPage'
import DiscussionPage from './pages/DiscussionPage'
import GriefStagePage from './pages/GriefStagePage'
import Modal from './components/Modal'
import Nav from './components/Nav'
import Profile from './components/Profile'
import Resource from './components/Resource'

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
  const [clicked, toggleClicked] = useState(false)
  const [clickedComment, toggleClickedComment] = useState(false)
  const [deleted, toggleDeleted] = useState(false)
  const [userImages, setUserImages] = useState([])
  const [editingName, toggleEditingName] = useState(false)
  const [newName, setNewName] = useState('')
  const [editingImage, toggleEditingImage] = useState(false)
  const [newImage, setNewImage] = useState('')
  const [creator, setCreator] = useState({})
  const [editingColors, toggleEditingColors] = useState(false)
  const [newPrimaryColor, setNewPrimaryColor] = useState('')
  const [newSecondaryColor, setNewSecondaryColor] = useState('')
  const [loaded, toggleLoaded] = useState(false)
  const [reload, toggleReload] = useState(false)
  const [reloads, setReloads] = useState(0)

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
            path="/communitypage/:id"
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
                clicked={clicked}
                toggleClicked={toggleClicked}
                clickedComment={clickedComment}
                toggleClickedComment={toggleClickedComment}
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
              <UnicornProfile
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
          {/* <Route
            path="/resources"
            element={
              <Resource
                unicornUser={unicornUser}
                nonUserUnicorn={nonUserUnicorn}
                setNonUserUnicorn={setNonUserUnicorn}
                community={community}
                setCommunity={setCommunity}
                griefStage={griefStage}
                setGriefStage={setGriefStage}
              />
            }
          /> */}
        </Routes>
      </main>
    </div>
  )
}

export default App
