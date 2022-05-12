import { useNavigate } from 'react-router-dom'
import UnicornMainLogo from '../assets/UnicornMainLogo.png'
import UnicornMainLogo2 from '../assets/UnicornMainLogo2.png'
import stars1 from '../assets/stars1.png'
import stars2 from '../assets/stars2.png'
import stars3 from '../assets/stars3.png'

const Landing = ({ isHovering, setIsHovering, image, setImage }) => {
  const handleMouseEnter = () => {
    setIsHovering(true)
  }

  const handleMouseLeave = () => {
    setIsHovering(false)
  }

  return (
    <div className="landing">
      <div className="landing-text">
        <h1>Welcome to Unicorn!</h1>
        <h3>
          Loss is difficult and isolating, but I hope you find solace in the
          fact that you would never walk alone. Welcome. Please, join us.{' '}
        </h3>
      </div>
      <div className="unicorn-logo-switch">
        <img
          className="logo-landing"
          src={UnicornMainLogo}
          alt="logo"
          style={{
            zIndex: `12`,
            height: '50vh',
            width: '50vh',
            animation: `Reverse-logo-spin infinite 30s linear`,
            borderRadius: `50%`
          }}
        />
        <div className="stars-orbit">
          <img className="unicorn-stars1" src={stars1} alt="star" />
          <img className="unicorn-stars2" src={stars2} alt="star" />
          <img className="unicorn-stars3" src={stars3} alt="star" />
        </div>
        <div className="unicorn-skies"></div>
      </div>
      -<div className="register-logoIn"></div>
    </div>
  )
}

export default Landing
