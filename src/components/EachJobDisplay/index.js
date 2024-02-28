import {Link} from 'react-router-dom'

import './index.css'

function EachJobDisplay(props) {
  const {eachJobDetails} = props
  console.log(eachJobDetails)

  return (
    <li>
      <Link className="overAllContainer1" to={`/jobs/${eachJobDetails.id}`}>
        <div className="overAllContainer">
          <div className="companyContainer">
            <img
              src={eachJobDetails.companyLogoUrl}
              alt="companyLogo"
              className="companyLogoStyling"
            />
            <div className="name_ratings_container">
              <h3>{eachJobDetails.title}</h3>
              <p>rating : {eachJobDetails.rating}</p>
            </div>
          </div>
          <div className="location-type-lpa-container">
            <>
              <h5>{eachJobDetails.location}</h5>
              <h5>{eachJobDetails.employmentType}</h5>
            </>
            <h5>{eachJobDetails.packagePerAnnum}</h5>
          </div>
          <hr className="hrLineStyling" />
          <div className="description-container">
            <p>Description</p>
            <p>{eachJobDetails.jobDescription}</p>
          </div>
        </div>
      </Link>
    </li>
  )
}

export default EachJobDisplay
