import { Link } from "react-router-dom"
import Logo from '../assets/UnicornMainLogo.png'

const Nav = () => {

  return (
    <nav className="navbar-text nav-body">
      <div className="welcome">
          <h1 className="username">Welcome to Unicorn!</h1>
          <ul className="icon icon-container">
          <input type='checkbox' id="hamburger_icon" />
          <label htmlFor='hamburger_icon' className="hamburger">&#9776;</label>
          <div className="nav-menu" >

            <div className="icon icon-fill">
              <li className="i fa fa-home"><Link to='/'>Home</Link></li>
            </div>

            <div className="icon icon-fill">
              <li className="i fa fa-home"><Link to='/feed/:id'>feed</Link></li>
            </div>

            <div className="icon icon-fill">
              <li className="i fa fa-home"><Link to='/about'>About Unicorn</Link></li>
            </div>

            <div className="icon icon-enter">
              <li className="fa fa-user"><Link to="/profile">My Profile</Link></li>
            </div>

            <div className="icon icon-enter">
              <li className="fa fa-user"><Link to="/resources">Resources</Link></li>
            </div>

            <div className="icon icon-collapse">
              <li className="i fa fa-sign-in"><Link onClick={handleLogout} to='/'>Sign Out</Link></li>
            </div>
            
          </div>
        </ul>
      </div>
    </nav>
  )
}

export default Nav