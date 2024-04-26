import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import SimilarJob from '../SimilarJob/index'
import Skill from '../EachJobDetailsSkills/index'
import './index.css'

function modifyKeysOfSimilarJobs(arr) {
  const temp = arr.map(eachObj => ({
    id: eachObj.id,
    title: eachObj.title,
    companyImageUrl: eachObj.company_logo_url,
    location: eachObj.location,
    employmentType: eachObj.employment_type,
    rating: eachObj.rating,
    jobDescription: eachObj.job_description,
  }))

  return temp
}

function convertSkillsKeys(arr) {
  const temp = arr.map(eachObj => ({
    name: eachObj.name,
    imageUrl: eachObj.image_url,
  }))

  return temp
}

function convertJobDetailsWithOutSkills(details) {
  const temp = {
    companyLogoUrl: details.company_logo_url,
    companyWebsiteUrl: details.company_website_url,
    employmentType: details.employment_type,
    id: details.id,
    jobDescription: details.job_description,
    lifeAtCompany: {
      description: details.life_at_company.description,
      imageUrl: details.life_at_company.image_url,
    },
    location: details.location,
    packagePerAnnum: details.package_per_annum,
    rating: details.rating,
    title: details.title,
    skills: convertSkillsKeys(details.skills),
  }
  return temp
}

class JobItemDetails extends Component {
  state = {
    eachJobDetails: {},
    similarJobsList: [],
    status: 'waiting',
  }

  componentDidMount() {
    console.log('Component Mounted')
    this.getEachJobDetails()
  }

  getEachJobDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    console.log(id)

    const token = Cookies.get('jwt_token')

    const eachJobDetailsUrl = `https://apis.ccbp.in/jobs/${id}`
    const details = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const eachJobDetailsPromise = await fetch(eachJobDetailsUrl, details)
    if (eachJobDetailsPromise.ok) {
      const eachJobDetailsPromiseJson = await eachJobDetailsPromise.json()
      console.log(eachJobDetailsPromiseJson)
      const modifiedEachJobDetails = convertJobDetailsWithOutSkills(
        eachJobDetailsPromiseJson.job_details,
      )
      const modifiedSimilarJobsObj = modifyKeysOfSimilarJobs(
        eachJobDetailsPromiseJson.similar_jobs,
      )
      // console.log(modifiedEachJobDetails)
      // console.log(modifiedSimilarJobsObj)
      this.setState({
        eachJobDetails: modifiedEachJobDetails,
        similarJobsList: modifiedSimilarJobsObj,
        status: 'success',
      })
    } else {
      this.setState({status: 'failure'})
    }
  }

  renderSuccessfullUi = () => {
    const {eachJobDetails, similarJobsList} = this.state
    const {skills} = eachJobDetails
    const {lifeAtCompany} = eachJobDetails
    console.log('******%%%%%%')
    console.log(lifeAtCompany)
    console.log(skills)
    console.log('************')
    console.log(eachJobDetails)
    console.log(similarJobsList)
    return (
      <div className="eachJobDetailsContainer">
        <div className="eachJobDetailedUpperContainer">
          <div className="companyContainer">
            <img
              src={eachJobDetails.companyLogoUrl}
              alt="job details company logo"
              className="companyLogoStyling"
            />
            <div className="name_ratings_container">
              <h3>{eachJobDetails.title}</h3>
              <p>rating : {eachJobDetails.rating}</p>
            </div>
          </div>
          <div className="location-type-lpa-container">
            <p>{eachJobDetails.location}</p>
            <p>{eachJobDetails.employmentType}</p>
            <p>{eachJobDetails.packagePerAnnum}</p>
          </div>
          <hr className="hrLineStyling" />
          <div className="description-container">
            <h1>Description</h1>
            <a href={eachJobDetails.companyWebsiteUrl}>Visit</a>
            <p>{eachJobDetails.jobDescription}</p>
          </div>
          <h1>Skills</h1>
          <div>
            <ul className="skillsContainerUl">
              {skills.map(eachObj => (
                <Skill key={eachObj.name} eachJobDetails={eachObj} />
              ))}
            </ul>
          </div>
          <div className="lifeAtCompanyContainer">
            <h1>Life At Company</h1>
            <div className="detailsContainer">
              <p>{lifeAtCompany.description}</p>
            </div>
            <img
              src={lifeAtCompany.imageUrl}
              alt="life at company"
              className="lifeAtCompanyImageStyling"
            />
          </div>
        </div>
        <div className="similarJobsContainer">
          <h1>Similar Jobs</h1>
          <ul style={{listStyleType: 'none', padding: '0px'}}>
            {similarJobsList.map(eachObj => (
              <SimilarJob key={eachObj.id} eachJobDetails={eachObj} />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  renderFailedUi = () => (
    <div
      data-testid="loader"
      style={{backgroundColor: 'black', color: 'white'}}
    >
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        style={{height: '100px', width: '100px'}}
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button
        type="button"
        onClick={() => {
          this.setState({status: 'waiting'}, this.getEachJobDetails)
        }}
      >
        Retry
      </button>
    </div>
  )

  renderOverAllUiAccdToStatus = () => {
    const {status} = this.state
    const token = Cookies.get('jwt_token')
    if (token === undefined) {
      return <Redirect to="/login" />
    }
    switch (status) {
      case 'waiting':
        return <h1 style={{color: 'white'}}>Waiting</h1>
      case 'success':
        return this.renderSuccessfullUi()
      case 'failure':
        return this.renderFailedUi()
      default:
        return null
    }
  }

  render() {
    return this.renderOverAllUiAccdToStatus()
  }
}

export default JobItemDetails
