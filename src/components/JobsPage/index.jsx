import Cookies from "js-cookie";

import Navbar from "../Navbar";
import ProfileDetails from "../ProfileDetails";
import FilterGroups from "../FilterGroups";
import JobCard from "../JobCard";

import { IoSearchOutline } from "react-icons/io5";
import { Triangle } from "react-loader-spinner";

import { Component } from "react";
import "./index.css";

const apiConstants = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  inProgress: "IN_PROGRESS",
};

class JobsPage extends Component {
  state = {
    jobsData: [],
    apiStatus: apiConstants.initial,
    userEmploymentTypes: [],
    userSalaryRange: "",
    searchInput: "",
  };

  updateSearchInput = (event) => {
    this.setState({ searchInput: event.target.value });
  };

  addEmploymentType = (id) => {
    this.setState(
      (prevState) => ({
        userEmploymentTypes: [...prevState.userEmploymentTypes, id],
      }),
      this.getJobsData
    );
  };

  removeEmploymentType = (id) => {
    const { userEmploymentTypes } = this.state;

    const filteredEmploymentTypes = userEmploymentTypes.filter(
      (eachId) => eachId !== id
    );

    this.setState(
      { userEmploymentTypes: filteredEmploymentTypes },
      this.getJobsData
    );
  };

  updateSalaryRange = (id) => {
    this.setState({ userSalaryRange: id }, this.getJobsData);
  };

  renderSuccessView = () => {
    const { jobsData } = this.state;

    return (
      <>
        <p className="jobs-total-count">Total Count: {jobsData.length}</p>

        <ul className="jobs-result-list">
          {jobsData.map((eachObj) => (
            <JobCard key={eachObj.id} jobDetails={eachObj} />
          ))}
        </ul>
      </>
    );
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

  renderLoader = () => (
    <div className="jobs-loader-con">
      <Triangle
        visible={true}
        height="80"
        width="80"
        color="#4448db"
        ariaLabel="triangle-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );

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

    this.setState({ jobsData: updatedData, apiStatus: apiConstants.success });
  };

  getJobsFailure = () => {
    this.setState({ apiStatus: apiConstants.failure });
  };

  renderSwitch = () => {
    const { apiStatus } = this.state;

    switch (apiStatus) {
      case apiConstants.success:
        return this.renderSuccessView();

      case apiConstants.failure:
        return this.renderFailureView();

      case apiConstants.inProgress:
        return this.renderLoader();
    }
  };

  getJobsData = async () => {
    this.setState({ apiStatus: apiConstants.inProgress });
    const JwtToken = Cookies.get("jwt_token");
    const { userEmploymentTypes, userSalaryRange, searchInput } = this.state;
    const url = `https://apis.ccbp.in/jobs?employment_type=${userEmploymentTypes}&minimum_package=${userSalaryRange}&search=${searchInput}`;
    const options = {
      method: "GET",
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

  componentDidMount() {
    this.getJobsData();
  }

  render() {
    const { searchInput } = this.state;

    return (
      <div className="jobs-page">
        <Navbar />

        <main className="jobs-content">
          <form
            className="jobs-search-box-sm jobs-search-box"
            onSubmit={this.getJobsData}
          >
            <input
              onChange={this.updateSearchInput}
              value={searchInput}
              type="text"
              placeholder="Search for jobs..."
            />

            <button className="search-btn" type="submit">
              <IoSearchOutline className="search-icon" />
            </button>
          </form>

          <div className="jobs-left-section">
            <ProfileDetails />

            <FilterGroups
              addEmploymentType={this.addEmploymentType}
              removeEmploymentType={this.removeEmploymentType}
              updateSalaryRange={this.updateSalaryRange}
            />
          </div>

          <div className="jobs-right-section">
            <form
              className="jobs-search-box-lg jobs-search-box"
              onSubmit={this.getJobsData}
            >
              <input
                onChange={this.updateSearchInput}
                value={searchInput}
                type="text"
                placeholder="Search for jobs..."
              />

              <button className="search-btn" type="submit">
                <IoSearchOutline className="search-icon" />
              </button>
            </form>

            {this.renderSwitch()}
          </div>
        </main>
      </div>
    );
  }
}

export default JobsPage;
