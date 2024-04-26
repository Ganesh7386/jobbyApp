import {Component} from 'react'
import {Link} from 'react-router-dom'
import './index.css'

class Home extends Component {
  displayOverAllUi = () => (
    <div className="homeStyling">
      <h1>
        Find The Job That <br /> Fits Your Life
      </h1>
      <p>
        Millions of people are searching for jobs , salary <br /> Information ,
        company reviews.Find the job that fits your <br /> abilities and
        potential
      </p>
      <Link className="lonkStyling" to="/jobs">
        <button className="homebuuttonstyling" type="button">
          Jobs
        </button>
      </Link>
    </div>
  )

  render() {
    return this.displayOverAllUi()
  }
}

export default Home
