import {Component} from 'react'
import Cookies from 'js-cookie'
import {withRouter, Redirect} from 'react-router-dom'

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
    Cookies.set('MY_TOKEN', jwtToken, {expires: 1, path: '/'})

    history.push('/')
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

    if (returnedPromise.ok) {
      console.log('user details verified')
      this.setState({errorMsg: ''})
      const returnedJsonObj = await returnedPromise.json()
      this.handleSuccessfullLogin(returnedJsonObj.jwt_token)
    } else {
      const returnedJsonObj = await returnedPromise.json()
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
    const token = Cookies.get('MY_TOKEN')
    console.log(token)
    if (token !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <form onSubmit={this.handleSubmittingDetails}>
        <label htmlFor="username">Username</label>
        <input
          value={username}
          id="username"
          type="text"
          onChange={this.handleTakingUsername}
        />
        <br />
        <label htmlFor="password">Password</label>
        <input
          value={password}
          id="password"
          type="text"
          onChange={this.handleTakingPassword}
        />
        <button type="submit">Login</button>
        <p>{errorMsg}</p>
      </form>
    )
  }
}

export default withRouter(Login)
