import { Link } from 'react-router-dom'
import Logo from '../assets/UnicornMainLogo.png'

const Nav = ({ authenticated, unicornUser, handleLogout }) => {
  let authenticatedOptions
  if (unicornUser) {
    console.log(unicornUser)
    let username = localStorage.getItem('username')
    authenticatedOptions = (
      <nav className="navbar-text nav-body">
        <div className="welcome">
          <h1 className="username">Welcome {username}!</h1>
          <ul className="icon icon-container">
            <input type="checkbox" id="hamburger_icon" />
            <label htmlFor="hamburger_icon" className="hamburger">
              &#9776;
            </label>
            <div className="nav-menu">
              <li className="i fa fa-home">
                <Link to="/">Home</Link>
              </li>

              <li className="i fa fa-home">
                <Link to="/about">About Unicorn</Link>
              </li>

              <li className="fa fa-user">
                <Link to="/profile">My Profile</Link>
              </li>

              <li className="fa fa-user">
                <Link to="/resources">Resources</Link>
              </li>

              <li className="i fa fa-sign-in">
                <Link onClick={handleLogout} to="/">
                  Sign Out
                </Link>
              </li>
            </div>
          </ul>
        </div>
      </nav>
    )
  }
  let adminOptions
  if (unicornUser) {
    adminOptions = (
      <nav className="navbar-text nav-body">
        <div className="welcome">
          <h1 className="username">Welcome {unicornUser.username}!</h1>

          <ul className="icon icon-container">
            <input type="checkbox" id="hamburger_icon" />
            <label htmlFor="hamburger_icon" className="hamburger">
              &#9776;
            </label>
            <div className="nav-menu">
              <li className="i fa fa-home">
                <Link to="/">Home</Link>
              </li>

              <li className="i fa fa-home">
                <Link to="/about">About Unicorn</Link>
              </li>

              <li className="fa fa-user">
                <Link to="/profile">My Profile</Link>
              </li>

              <li className="fa fa-user">
                <Link to="/stages">Grief Stages</Link>
              </li>

              <li className="fa fa-user">
                <Link to="/resources">Resources</Link>
              </li>

              <li className="i fa fa-sign-in">
                <Link onClick={handleLogout} to="/">
                  Sign Out
                </Link>
              </li>
            </div>
          </ul>
        </div>
      </nav>
    )
  }

  const publicOptions = (
    <nav className="navbar-text nav-body">
      <div className="welcome">
        <h1 className="username">Welcome {unicornUser.username}!</h1>

        <ul className="icon icon-container">
          <input type="checkbox" id="hamburger_icon" />
          <label htmlFor="hamburger_icon" className="hamburger">
            &#9776;
          </label>
          <div className="nav-menu">
            <li className="i fa fa-home">
              <Link to="/">Home</Link>
            </li>

            <li className="i fa fa-home">
              <Link to="/about">About Unicorn</Link>
            </li>

            <li className="fa fa-user">
              <Link to="/resources">Resources</Link>
            </li>

            <li className="fa fa-user">
              <Link to="/register">Register</Link>
            </li>

            <li className="fa fa-user">
              <Link to="/login">Sign In</Link>
            </li>
          </div>
        </ul>
      </div>
    </nav>
  )

  return (
    <header className="navbar container">
      <div className="nav-left content">
        <Link to="/landing">
          <div className="logo-container" alt="logo">
            <img className="logo" src={Logo} alt="unicornUser-logo" />
          </div>
        </Link>
      </div>
      {authenticated && unicornUser
        ? unicornUser.admin === true
          ? adminOptions
          : authenticatedOptions
        : publicOptions}
    </header>
  )
}

export default Nav
