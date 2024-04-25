import {Component} from 'react'
import Cookies from 'js-cookie'
import {withRouter, Redirect} from 'react-router-dom'
import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    errorMsg: '',
  }

  handleSuccessfullLogin = jwtToken => {
    const {history} = this.props
    console.log(this.props)
    console.log(history)
    Cookies.set('jwt_token', jwtToken, {expires: 1, path: '/'})

    history.replace('/')
  }

  handleVerifyingDetails = async () => {
    const {username, password} = this.state
    const userDetailsObj = {username, password}
    const details = {
      method: 'POST',
      body: JSON.stringify(userDetailsObj),
    }
    // console.log(details)
    const loggingApi = 'https://apis.ccbp.in/login'
    const returnedPromise = await fetch(loggingApi, details)
    // console.log(returnedPromise)
    const returnedJsonObj = await returnedPromise.json()
    console.log(returnedJsonObj)

    if (returnedPromise.ok) {
      console.log('user details verified')
      this.setState({errorMsg: ''})
      this.handleSuccessfullLogin(returnedJsonObj.jwt_token)
    } else {
      console.log(returnedJsonObj.error_msg)
      this.setState({errorMsg: returnedJsonObj.error_msg})
    }
  }

  handleTakingUsername = event => {
    this.setState({username: event.target.value})
  }

  handleTakingPassword = event => {
    this.setState({password: event.target.value})
  }

  handleSubmittingDetails = event => {
    event.preventDefault()
    this.handleVerifyingDetails()
  }

  render() {
    const {username, password, errorMsg} = this.state
    const token = Cookies.get('jwt_token')
    console.log(token)
    if (token !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="loginPageContainer">
        <form
          className="loginFormContainer"
          onSubmit={this.handleSubmittingDetails}
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="logoStyling"
          />
          <div>
            <label style={{color: 'white'}} htmlFor="USERNAME">
              USERNAME
            </label>
            <input
              value={username}
              id="USERNAME"
              type="text"
              onChange={this.handleTakingUsername}
              placeholder="Username"
            />
          </div>
          <div>
            <label style={{color: 'white'}} htmlFor="PASSWORD">
              PASSWORD
            </label>
            <input
              value={password}
              id="PASSWORD"
              type="password"
              onChange={this.handleTakingPassword}
              placeholder="Password"
            />
          </div>
          <button className="submitBtnStyling" type="submit">
            Login
          </button>
          <p style={{color: 'red'}}>{errorMsg}</p>
        </form>
      </div>
    )
  }
}

export default withRouter(Login)
