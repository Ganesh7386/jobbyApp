import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const HeaderLogoUrl = 'https://assets.ccbp.in/frontend/react-js/logo-img.png'

const Header = props => {
  const handleLogoutFromWebsite = () => {
    Cookies.remove('MY_TOKEN')
    console.log(props)
    const {history} = props
    history.replace('/login')
  }
  const returnComponentAccordingToCookie = () => {
    const id = Cookies.get('MY_TOKEN')
    if (id !== undefined) {
      return (
        <div className="NavBarContainer">
          <img src={HeaderLogoUrl} alt="website logo" className="appLogo" />
          <ul className="navbarNavigationList">
            <Link className="headerLinksStyling" to="/">
              <li>Home</li>
            </Link>
            <Link className="headerLinksStyling" to="/jobs">
              <li>Jobs</li>
            </Link>
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
