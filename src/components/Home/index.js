import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Home extends Component {
  state = {
    userProfile: {},
  }

  componentDidMount() {
    this.getProfileDetailsWithToken()
  }

  getProfileDetailsWithToken = async () => {
    const token = Cookies.get('MY_TOKEN')

    const apiDetails = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    const userDetailsUrl = 'https://apis.ccbp.in/profile'
    console.log(userDetailsUrl)
    const profilePromise = await fetch(userDetailsUrl, apiDetails)
    const profilePromiseJson = await profilePromise.json()
    console.log(profilePromiseJson)
    console.log(profilePromiseJson.profile_details)
  }

  goingToJobsSection = () => {
    const {history} = this.props
    console.log(history)
    history.push('/jobs')
  }

  render() {
    const token = Cookies.get('MY_TOKEN')
    if (token === undefined) {
      return <Redirect to="/login" />
    }
    return (
      <div className="HomeContainer">
        <h1>Find The Job That Fits Your Life</h1>
        <p>
          Millions of People are searching for jobs , salary information ,
          company reviews .Find the jobs that fits your abilities and potential
        </p>
        <button onClick={this.goingToJobsSection} type="button">
          Jobs
        </button>
      </div>
    )
  }
}

export default Home
