import { Link } from "react-router-dom";
import Logo from '../assets/UnicornMainLogo.png'

const Nav = ({authenticated, unicornUser, handleLogout}) => {
  let authenticatedOptions
  if(unicornUser) {
    authenticatedOptions= (
    <nav className="navbar-text nav-body">
      <div className="welcome">
          <h1 className="username">Welcome {unicornUser.username}!</h1>
          <ul className="icon icon-container">
          <input type='checkbox' id="hamburger_icon" />
          <label htmlFor='hamburger_icon' className="hamburger">&#9776;</label>
          <div className="nav-menu" >

            <div className="icon icon-fill">
              <li className="i fa fa-home"><Link to='/home'>Home</Link></li>
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
  let adminOptions
  if (unicornUser) {
   adminOptions = (
     <nav className="navbar-text nav-body">
       <div className="welcome" > 
         <h1 className="username">
         Welcome {unicornUser.username}!
         </h1>

         <ul className="icon icon-container">
         <input type='checkbox' id="hamburger_icon" />
         <label htmlFor='hamburger_icon' className="hamburger">&#9776;</label>
         <div className="nav-menu" >
           <div className="icon icon-fill">
               <li className="i fa fa-home"><Link to='/home'>Home</Link></li>
             </div>

             <div className="icon icon-fill">
              <li className="i fa fa-home"><Link to='/about'>About Unicorn</Link></li>
            </div>

             <div className="icon icon-enter">
             <li className="fa fa-user"><Link to="/profile">My Profile</Link></li>
           </div>

           <div className="icon icon-enter">
              <li className="fa fa-user"><Link to="/stages">Grief Stages</Link></li>
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

  const publicOptions = (
    <nav className="publicOption nav-body">
      <Link to="/landing-page">Home</Link>
      <Link to="/about">About Unicorn</Link>
      <Link to="/register">Register</Link>
      <Link to="/login">Sign In</Link>
    </nav>
  )

  return (
    <header className="navbar container" >
      <div className="nav-left content">
      <Link to='/' >
        <div className="logo-container" alt='logo' >
          <img className="logo" src={Logo} alt="unicornUser-logo" />
        </div>
      </Link>
      </div>
      {authenticated && unicornUser ? (unicornUser.admin === true ? adminOptions: authenticatedOptions) : publicOptions}
    </header>
  )
}

export default Nav