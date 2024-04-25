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
        Find
        uhdsknajhucnkjnkjncjknkjnakjkjankjnajkdnkjhiueaknkdjandjknkjdbjkbkjj
      </p>
      <Link to="/jobs">
        <button className="homeBuuttonStyling" type="button">
          jobs
        </button>
      </Link>
    </div>
  )

  render() {
    return this.displayOverAllUi()
  }
}

export default Home
