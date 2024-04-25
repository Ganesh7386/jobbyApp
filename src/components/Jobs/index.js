import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import {BsSearch} from 'react-icons/bs'
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
      {id: 'FULLTIME', selected: false, label: 'Full Time'},
      {id: 'PARTTIME', selected: false, label: 'Part Time'},
      {id: 'FREELANCE', selected: false, label: 'Freelance'},
      {id: 'INTERNSHIP', selected: false, label: 'Internship'},
    ],
    selectedSalaryRange: '',
    searchValue: '',
    userProfileStatus: 'waiting',
    jobsStatus: 'waiting',
  }

  componentDidMount() {
    this.getAllJobsDetails()
    this.getProfileDetails()
  }

  getProfileDetails = async () => {
    const token = Cookies.get('jwt_token')
    const apiDetails = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    const userProfileUrl = 'https://apis.ccbp.in/profile/'
    const userProfileDetailsPromise = await fetch(userProfileUrl, apiDetails)
    console.log(userProfileDetailsPromise)

    if (userProfileDetailsPromise.ok) {
      console.log('ok')
      const parsedUserProfileDetails = await userProfileDetailsPromise.json()
      const profileDetails = parsedUserProfileDetails.profile_details
      console.log('after fetching Profile details')
      const modifiedProfileDetails = ModifyUserDetailsKeys(profileDetails)
      this.setState({
        userProfile: modifiedProfileDetails,
        userProfileStatus: 'success',
      })
    } else {
      console.log('not ok')
      this.setState({
        userProfileStatus: 'failure',
      })
    }
  }

  getAllJobsDetails = async () => {
    const {employmentTypes, selectedSalaryRange, searchValue} = this.state
    const selectedTypesOfEmployment = []

    employmentTypes.forEach(eachType => {
      if (eachType.selected) {
        selectedTypesOfEmployment.push(eachType.id)
      }
    })

    const employmentTypeString = selectedTypesOfEmployment.join(',')
    console.log(employmentTypeString)

    const allJobsUrl = `https://apis.ccbp.in/jobs/?employment_type=${employmentTypeString}&minimum_package=${selectedSalaryRange}&search=${searchValue}`
    console.log(`Jobs url is ${allJobsUrl}`)
    const token = Cookies.get('jwt_token')
    const apiDetails = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    this.setState({
      jobsStatus: 'waiting',
    })

    const allJobsListPromise = await fetch(allJobsUrl, apiDetails)

    if (allJobsListPromise.ok) {
      const parsedAllJobsList = await allJobsListPromise.json()
      const allJobsList = parsedAllJobsList.jobs
      const jobsList = ModifyALlAvailableJobsObjects(allJobsList)

      this.setState({
        listOfJobs: jobsList,
        filteredJobs: jobsList,
        jobsStatus: 'success',
      })
    } else {
      this.setState({jobsStatus: 'failure'})
    }
    // console.log(userProfileDetailsPromise)
    // console.log(allJobsListPromise)
    // console.log(parsedAllJobsList)
    // console.log(parsedUserProfileDetails)
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
    this.setState({employmentTypes: modified}, this.getAllJobsDetails)
  }

  changeSelectedSalaryRange = event => {
    this.setState(
      {selectedSalaryRange: event.target.value},
      this.getAllJobsDetails,
    )
  }

  somethingWentWrongProfileUi = () => (
    <div>
      <button
        onClick={() => {
          this.setState({userProfileStatus: 'waiting'}, this.getProfileDetails)
        }}
        type="button"
      >
        Retry
      </button>
    </div>
  )

  successfullProfileUi = () => {
    const {userProfile} = this.state
    return (
      <>
        <img
          src={userProfile.profileImageUrl}
          className="profileImgStyling"
          alt="profile"
        />
        <h2>{userProfile.name}</h2>
        <p>{userProfile.shortBio}</p>
      </>
    )
  }

  renderUserProfileUiAccdToStatus = () => {
    const {userProfileStatus} = this.state
    switch (userProfileStatus) {
      case 'waiting':
        return this.displayLoadingUi()
      case 'success':
        return this.successfullProfileUi()
      case 'failure':
        return this.somethingWentWrongProfileUi()
      default:
        return null
    }
  }

  somethingWentWrongJobsUi = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button
        onClick={() => {
          this.setState({jobsStatus: 'waiting'}, this.getAllJobsDetails)
        }}
        type="button"
      >
        Retry
      </button>
    </div>
  )

  successfullJobsListDisplayUi = () => {
    const {filteredJobs} = this.state

    if (filteredJobs.length === 0) {
      return this.displayNoJobsUi()
    }
    return (
      <>
        <h1>Jobs List</h1>
        <ul
          style={{
            listStyleType: 'none',
            padding: '0px',
            margin: '0px',
          }}
        >
          {filteredJobs.map(eachJob => (
            <EachJobDisplay key={eachJob.id} eachJobDetails={eachJob} />
          ))}
        </ul>
      </>
    )
  }

  displayNoJobsUi = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
      />
      <h2>No Jobs Found</h2>
      <p>We could not find any jobs. Try other filters</p>
    </div>
  )

  renderJobsListUIAccdToStatus = () => {
    const {jobsStatus} = this.state
    switch (jobsStatus) {
      case 'waiting':
        return this.displayLoadingUi()
      case 'success':
        return this.successfullJobsListDisplayUi()
      case 'failure':
        return this.somethingWentWrongJobsUi()
      default:
        return null
    }
  }

  displayLoadingUi = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="blue" height="50" width="50" />
    </div>
  )

  handleSearchingForJob = event => {
    this.setState({searchValue: event.target.value})
  }

  searchJobs = () => {
    const {searchValue} = this.state
    console.log(`Search value is ${searchValue}`)
    this.setState({searchValue}, this.getAllJobsDetails)
  }

  displayOverAllUi = () => {
    const {employmentTypes, selectedSalaryRange, searchValue} = this.state
    return (
      <div className="overAllJobsContainer">
        <div className="floatingContainer">
          <h1>This is floating</h1>
          <button type="button">Login</button>
        </div>
        <div className="SearchFilterInputForSmallMediumUi">
          <input
            type="search"
            onChange={this.handleSearchingForJob}
            value={searchValue}
          />
          <button
            type="button"
            data-testid="searchButton"
            onClick={this.searchJobs}
            aria-label="Search Jobs"
          >
            <BsSearch className="search-icon" />
          </button>
        </div>
        <div className="leftContainer">
          <div className="userDetailsContainer">
            {this.renderUserProfileUiAccdToStatus()}
          </div>
          <div className="timesFilteringContainer">
            <h1>Type of Employment</h1>
            <ul>
              {employmentTypes.map(eachOption => (
                <li key={eachOption.id}>
                  <>
                    <input
                      type="checkbox"
                      id={eachOption.id}
                      onChange={this.handleSelectingType}
                      selected={eachOption.selected}
                      value={eachOption.id}
                    />
                    <label htmlFor={eachOption.id}>{eachOption.label}</label>
                  </>
                </li>
              ))}
            </ul>
          </div>
          <div className="salarySelectionOptionsContainer">
            <h1>Salary Range</h1>
            <ul>
              {salaryRangesList.map(eachObj => (
                <li key={eachObj.salaryRangeId}>
                  <input
                    type="radio"
                    name="salary"
                    checked={selectedSalaryRange === eachObj.salaryRangeId}
                    onChange={this.changeSelectedSalaryRange}
                    value={eachObj.salaryRangeId}
                    id={eachObj.id}
                  />
                  <label htmlFor={eachObj.id}>{eachObj.label}</label>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="rightContainer">
          <div className="SearchFilterInputForLargerDevicesUi">
            <input
              type="search"
              onChange={this.handleSearchingForJob}
              value={searchValue}
            />
            <button
              type="button"
              data-testid="searchButton"
              onClick={this.searchJobs}
              aria-label="Search Jobs"
            >
              <BsSearch className="search-icon" />
            </button>
          </div>
          {this.renderJobsListUIAccdToStatus()}
        </div>
      </div>
    )
  }

  render() {
    const token = Cookies.get('jwt_token')
    if (token === undefined) {
      return <Redirect to="/login" />
    }
    return this.displayOverAllUi()
  }
}

export default Jobs
