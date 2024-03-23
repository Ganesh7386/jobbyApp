import {Link, withRouter} from 'react-router-dom'
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
  const returnComponentAccordingToCookie = () => {
    const id = Cookies.get('jwt_token')
    if (id !== undefined) {
      return (
        <div className="NavBarContainer">
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
      )
    }
    return null
  }
  return returnComponentAccordingToCookie()
}
export default withRouter(Header)
