import {Link, withRouter} from 'react-router-dom'
import {FaHome, FaBriefcase, FaSignOutAlt} from 'react-icons/fa'
import Cookies from 'js-cookie'
import './index.css'

const HeaderLogoUrl = 'https://assets.ccbp.in/frontend/react-js/logo-img.png'

const Header = props => {
  const handleLogoutFromWebsite = () => {
    Cookies.remove('jwt_token')
    console.log(props)
    const {history} = props
    history.replace('/login')
  }

  const AppHeaderForSmallMediumDevices = () => (
    <div className="NavBarContainerForSmallMediumDevices">
      <Link className="websiteLogoLink" to="/">
        <img src={HeaderLogoUrl} alt="website logo" className="appLogo" />
      </Link>
      <ul className="navbarNavigationList">
        <li>
          <Link className="headerLinksStyling" to="/">
            <FaHome className="iconsStyling" />
          </Link>
        </li>

        <li>
          <Link className="headerLinksStyling" to="/jobs">
            <FaBriefcase className="iconsStyling" />
          </Link>
        </li>

        <li>
          <button
            className="navbarButtonStylingForSmallMedium"
            type="button"
            onClick={handleLogoutFromWebsite}
          >
            <FaSignOutAlt size={30} />
            {}
          </button>
        </li>
      </ul>
    </div>
  )
  const returnComponentAccordingToCookie = () => (
    <>
      <div className="NavBarContainerForLargeDevices">
        <Link className="websiteLogoLink" to="/">
          <img src={HeaderLogoUrl} alt="website logo" className="appLogo" />
        </Link>
        <ul className="navbarNavigationList">
          <li>
            <Link className="headerLinksStyling" to="/">
              Home
            </Link>
          </li>

          <li>
            <Link className="headerLinksStyling" to="/jobs">
              Jobs
            </Link>
          </li>
        </ul>
        <button
          className="navbarButtonStyling"
          type="button"
          onClick={handleLogoutFromWebsite}
        >
          Logout
        </button>
      </div>
      <AppHeaderForSmallMediumDevices />
    </>
  )

  return returnComponentAccordingToCookie()
}
export default withRouter(Header)
