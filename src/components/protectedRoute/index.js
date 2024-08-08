import Cookies from 'js-cookie'
import {Route, Redirect} from 'react-router-dom'
import Header from '../AppHeader/index'
import './index.css'

const ProtectedRoute = props => {
  const token = Cookies.get('jwt_token')
  if (token === undefined) {
    return <Redirect to="/login" />
  }
  return (
    <div className="overAllLoggedInpagesContainer">
      <Header />
      <Route {...props} />
    </div>
  )
}

export default ProtectedRoute
