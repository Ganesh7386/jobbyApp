import './index.css'

function SimilarJob(props) {
  const {eachJobDetails} = props
  return (
    <li className="eachSimilarJobCardContainer">
      <div style={{backgroundColor: '#202020'}} className="companyContainer">
        <div className="companyDetailsContainer">
          <img
            src={eachJobDetails.companyImageUrl}
            alt="similar job company logo"
            className="companyLogoStyling"
          />
          <div>
            <h1>{eachJobDetails.title}</h1>
            <p>rating : {eachJobDetails.rating}</p>
          </div>
        </div>
        <div className="description_type_location_container">
          <h1>Description</h1>
          <p>{eachJobDetails.jobDescription}</p>
          <div className="location_employment_details_container">
            <div>
              <p>{eachJobDetails.location}</p>
            </div>
            <div>
              <p>{eachJobDetails.employmentType}</p>
            </div>
          </div>
        </div>
      </div>
    </li>
  )
}

export default SimilarJob
