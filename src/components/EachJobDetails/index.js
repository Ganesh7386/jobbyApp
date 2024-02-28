import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import SimilarJob from '../SimilarJob/index'
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

class EachJobDetails extends Component {
  state = {
    eachJobDetails: {},
    similarJobsList: [],
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

    const token = Cookies.get('MY_TOKEN')

    const eachJobDetailsUrl = `https://apis.ccbp.in/jobs/${id}`
    const details = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const eachJobDetailsPromise = await fetch(eachJobDetailsUrl, details)
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
    })
  }

  render() {
    const token = Cookies.get('MY_TOKEN')
    const {eachJobDetails, similarJobsList} = this.state
    const {skills} = eachJobDetails
    const {lifeAtCompany} = eachJobDetails
    console.log('******%%%%%%')
    console.log(lifeAtCompany)
    console.log(skills)
    console.log('************')
    console.log(eachJobDetails)
    console.log(similarJobsList)
    if (token === undefined) {
      return <Redirect to="/login" />
    }
    return (
      <div className="eachJobDetailsContainer">
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
        <h1>Skills</h1>
        <div>
          <ul style={{display: 'flex', listStyleType: 'none'}}>
            {skills &&
              skills.map(eachObj => (
                <li key={eachObj.id}>
                  <img src={eachObj.imageUrl} alt="skillLogo" />
                  <p>{eachObj.name}</p>
                </li>
              ))}
          </ul>
        </div>
        <div className="lifeAtCompanyContainer">
          {lifeAtCompany && (
            <>
              <div className="detailsContainer">
                <h1>Life At Company</h1>
                <p>{lifeAtCompany && lifeAtCompany.description}</p>
              </div>
              <img
                src={lifeAtCompany.imageUrl}
                alt="lifeAtCompanyImg"
                className="lifeAtCompanyImageStyling"
              />
            </>
          )}
        </div>
        <div className="similarJobsContainer">
          <ul>
            {similarJobsList &&
              similarJobsList.map(eachObj => (
                <SimilarJob eachJobDetails={eachObj} key={eachObj.id} />
              ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default EachJobDetails
