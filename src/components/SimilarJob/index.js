import './index.css'

function SimilarJob(props) {
  const {eachJobDetails} = props
  return (
    <li key={eachJobDetails.id} className="eachSimilarJobCardContainer">
      <div className="companyContainer">
        <img
          src={eachJobDetails.companyImageUrl}
          alt="companyLogo"
          className="companyLogoStyling"
        />
        <div className="name_ratings_container">
          <h3>{eachJobDetails.title}</h3>
          <p>rating : {eachJobDetails.rating}</p>
        </div>
      </div>
    </li>
  )
}

export default SimilarJob
