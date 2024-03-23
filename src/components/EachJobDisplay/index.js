import {Link} from 'react-router-dom'

import './index.css'

function EachJobDisplay(props) {
  const {eachJobDetails} = props
  console.log(eachJobDetails)

  return (
    <li>
      <Link className="overAllContainer1" to={`/jobs/${eachJobDetails.id}`}>
        <div className="overAllContainer">
          <div className="companyContainer" style={{color: 'black'}}>
            <img
              src={eachJobDetails.companyLogoUrl}
              alt="company logo"
              className="companyLogoStyling"
            />
            <div className="name_ratings_container">
              <h3>{eachJobDetails.title}</h3>
              <p>rating : {eachJobDetails.rating}</p>
            </div>
          </div>
          <div className="location-type-lpa-container">
            <>
              <p>{eachJobDetails.location}</p>
              <p>{eachJobDetails.employmentType}</p>
            </>
            <p>{eachJobDetails.packagePerAnnum}</p>
          </div>
          <hr className="hrLineStyling" />
          <div className="description-container">
            <h1>Description</h1>
            <p>{eachJobDetails.jobDescription}</p>
          </div>
        </div>
      </Link>
    </li>
  )
}

export default EachJobDisplay
