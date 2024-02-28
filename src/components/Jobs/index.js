import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import EachJobDisplay from '../EachJobDisplay/index'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

function ModifyUserDetailsKeys(obj) {
  const objs = {
    profileImageUrl: obj.profile_image_url,
    name: obj.name,
    shortBio: obj.short_bio,
  }
  return objs
}

function ModifyALlAvailableJobsObjects(listOfJobs) {
  const modifiedList = listOfJobs.map(eachObj => ({
    id: eachObj.id,
    title: eachObj.title,
    rating: eachObj.rating,
    companyLogoUrl: eachObj.company_logo_url,
    location: eachObj.location,
    packagePerAnnum: eachObj.package_per_annum,
    employmentType: eachObj.employment_type,
    jobDescription: eachObj.job_description,
  }))
  console.log(modifiedList)
  return modifiedList
}

class Jobs extends Component {
  state = {
    listOfJobs: [],
    userProfile: {},
    filteredJobs: [],
    employmentTypes: [
      {id: 'FULLTIME', selected: false, label: 'Full time'},
      {id: 'PARTTIME', selected: false, label: 'Part time'},
      {id: 'FREELANCE', selected: false, label: 'Freelance'},
      {id: 'INTERNSHIP', selected: false, label: 'Internship'},
    ],
    selectedSalaryRange: '',
    searchValue: '',
  }

  componentDidMount() {
    this.getAllJobsDetailsAndUserDetails()
  }

  getAllJobsDetailsAndUserDetails = async () => {
    const {employmentTypes, selectedSalaryRange, searchValue} = this.state
    const selectedTypesOfEmployment = []

    employmentTypes.forEach(eachType => {
      if (eachType.selected) {
        selectedTypesOfEmployment.push(eachType.id)
      }
    })
    const employmentTypeString = selectedTypesOfEmployment.join(',')
    console.log(employmentTypeString)
    const userProfileUrl = 'https://apis.ccbp.in/profile/'

    const allJobsUrl = `https://apis.ccbp.in/jobs/?employment_type=${employmentTypeString}&minimum_package=${selectedSalaryRange}&search=${searchValue}`
    console.log(`Jobs url is ${allJobsUrl}`)
    const token = Cookies.get('MY_TOKEN')
    const apiDetails = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const userProfileDetailsPromise = await fetch(userProfileUrl, apiDetails)
    const allJobsListPromise = await fetch(allJobsUrl, apiDetails)
    // console.log(userProfileDetailsPromise)
    // console.log(allJobsListPromise)
    const parsedUserProfileDetails = await userProfileDetailsPromise.json()
    const parsedAllJobsList = await allJobsListPromise.json()
    // console.log(parsedAllJobsList)
    // console.log(parsedUserProfileDetails)
    const profileDetails = parsedUserProfileDetails.profile_details
    const allJobsList = parsedAllJobsList.jobs

    const modifiedProfileDetails = ModifyUserDetailsKeys(profileDetails)
    const jobsList = ModifyALlAvailableJobsObjects(allJobsList)

    console.log(modifiedProfileDetails)
    console.log(jobsList)

    this.setState({
      listOfJobs: jobsList,
      userProfile: modifiedProfileDetails,
      filteredJobs: jobsList,
    })
  }

  handleSelectingType = event => {
    console.log(`id is ${event.target.id}`)
    const {employmentTypes} = this.state
    const modified = employmentTypes.map(eachObj => {
      if (eachObj.id === event.target.id) {
        return {...eachObj, selected: !eachObj.selected}
      }
      return {...eachObj}
    })
    console.log(modified)
    this.setState(
      {employmentTypes: modified},
      this.getAllJobsDetailsAndUserDetails,
    )
  }

  changeSelectedSalaryRange = event => {
    this.setState(
      {selectedSalaryRange: event.target.value},
      this.getAllJobsDetailsAndUserDetails,
    )
  }

  render() {
    const token = Cookies.get('MY_TOKEN')
    const {
      userProfile,
      employmentTypes,
      selectedSalaryRange,
      filteredJobs,
    } = this.state
    if (token === undefined) {
      return <Redirect to="/login" />
    }
    return (
      <div className="overAllJobsContainer">
        <div className="leftContainer">
          <div className="userDetailsContainer">
            <img
              src={userProfile.profileImageUrl}
              className="profileImgStyling"
              alt="userLogo"
            />
            <h2>{userProfile.name}</h2>
            <p>{userProfile.shortBio}</p>
          </div>
          <div className="timesFilteringContainer">
            <h1>Types of Employment</h1>
            <ul>
              {employmentTypes.map(eachOption => (
                <li key={eachOption.id}>
                  <>
                    <input
                      type="checkbox"
                      id={eachOption.id}
                      onChange={this.handleSelectingType}
                      selected={eachOption.selected}
                    />
                    <label htmlFor={eachOption.id}>{eachOption.label}</label>
                  </>
                </li>
              ))}
            </ul>
          </div>
          <div className="salarySelectionOptionsContainer">
            <h1>Salary Ranges</h1>
            <ul>
              {salaryRangesList.map(eachObj => (
                <li key={eachObj.salaryRangeId}>
                  <input
                    type="radio"
                    name="salary"
                    checked={selectedSalaryRange === eachObj.salaryRangeId}
                    onChange={this.changeSelectedSalaryRange}
                    value={eachObj.salaryRangeId}
                  />
                  <label>{eachObj.label}</label>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="rightContainer">
          <h1>This is right container</h1>
          <ul style={{listStyleType: 'none'}}>
            {filteredJobs.map(eachJob => (
              <EachJobDisplay key={eachJob.id} eachJobDetails={eachJob} />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Jobs
