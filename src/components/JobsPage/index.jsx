import Cookies from 'js-cookie';

import Navbar from '../Navbar';
import ProfileDetails from '../ProfileDetails';
import FilterGroups from '../FilterGroups';
import JobsCard from '../JobsCard';

import { IoSearchOutline } from 'react-icons/io5';
import { MdOutlineStarPurple500 } from 'react-icons/md';
import { FaLocationDot } from 'react-icons/fa6';
import { BsBriefcaseFill } from 'react-icons/bs';

import { Component } from 'react';
import './index.css';

class Jobs extends Component {
  state = { jobsData: [] };

  renderSuccessView = () => {
    const { jobsData } = this.state;

    <ul>
      {jobsData.map(() => (
        <JobsCard />
      ))}
    </ul>;
  };

  renderNoDataView = () => (
    <div className="no-jobs-result">
      <img
        className="no-jobs-image"
        src="https://res.cloudinary.com/dkoqbt4pc/image/upload/v1733842144/Jobby%20App/folder-not-found.png"
        alt="no-jobs-image"
      />
      <h2 className="no-jobs-title">No Jobs Found</h2>
      <p className="no-jobs-description">
        We could not find any jobs. Try other filters.
      </p>
    </div>
  );

  renderFailureView = () => (
    <div className="jobs-failure-result">
      <img
        className="jobs-failure-image"
        src="https://res.cloudinary.com/dkoqbt4pc/image/upload/v1733842125/Jobby%20App/computer-error.png"
        alt="jobs-failure-image"
      />
      <h2 className="jobs-failure-title">Oops! Something Went Wrong</h2>
      <p className="jobs-failure-description">
        We cannot seem to find the page you are looking for.
      </p>
      <button className="jobs-failure-retry-btn">Retry</button>
    </div>
  );

  // Don't do failure part of both profile and other API

  getJobsData = async () => {
    const JwtToken = Cookies.get('jwt_token');

    const url = `https://apis.ccbp.in/jobs?employment_type=&minimum_package=&search=`;
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${JwtToken}`,
      },
    };
    const response = await fetch(url, options);
    const data = await response.json();

    if (response.ok) {
      this.getJobsSuccess(data.jobs);
    } else {
      this.getJobsFailure(data.error_msg);
    }
  };

  getJobsSuccess = (data) => {
    const updatedData = data.map((eachObj) => ({
      companyLogoUrl: eachObj.company_logo_url,
      employmentType: eachObj.employment_type,
      id: eachObj.id,
      jobDescription: eachObj.job_description,
      packagePerAnnum: eachObj.package_per_annum,
      rating: eachObj.rating,
      title: eachObj.title,
    }));

    this.setState({ jobsData: updatedData });
  };

  getJobsFailure = () => {};

  componentDidMount() {
    this.getJobsData();
  }

  render() {
    return (
      <div className="jobs-page">
        <Navbar />

        <main className="jobs-main-content">
          <div className="jobs-search-box-sm jobs-search-box">
            <input type="text" placeholder="Search for jobs..." />

            <button className="search-btn">
              <IoSearchOutline className="search-icon" />
            </button>
          </div>

          <div className="jobs-left-section">
            <ProfileDetails />

            <FilterGroups />
          </div>

          <div className="jobs-right-section">
            <div className="jobs-search-box-lg jobs-search-box">
              <input type="text" placeholder="Search for jobs..." />

              <button className="search-btn">
                <IoSearchOutline className="search-icon" />
              </button>
            </div>

            {this.renderSuccessView()}
          </div>
        </main>
      </div>
    );
  }
}

export default Jobs;
