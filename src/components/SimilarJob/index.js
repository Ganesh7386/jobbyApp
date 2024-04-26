import './index.css'

function SimilarJob(props) {
  const {eachJobDetails} = props
  return (
    <li className="eachSimilarJobCardContainer">
      <div style={{backgroundColor: '#202020'}} className="companyContainer">
        <img
          src={eachJobDetails.companyImageUrl}
          alt="similar job company logo"
          className="companyLogoStyling"
        />
        <div className="name_ratings_container">
          <h1>{eachJobDetails.title}</h1>
          <p>rating : {eachJobDetails.rating}</p>
          <p>{eachJobDetails.location}</p>
          <p>{eachJobDetails.employmentType}</p>
          <h1>Description</h1>
          <p>{eachJobDetails.jobDescription}</p>
        </div>
      </div>
    </li>
  )
}

export default SimilarJob
