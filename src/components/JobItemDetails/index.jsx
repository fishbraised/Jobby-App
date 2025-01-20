import Cookies from "js-cookie";

import Navbar from "../Navbar";
import SkillItem from "../SkillItem";
import SimilarJobItem from "../SimilarJobItem";

import { MdOutlineStarPurple500 } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { BsBriefcaseFill } from "react-icons/bs";
import { FaExternalLinkAlt } from "react-icons/fa";
import { Triangle } from "react-loader-spinner";

import { Component } from "react";

import "./index.css";

const apiConstants = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  inProgress: "IN_PROGRESS",
};

class JobItemDetails extends Component {
  state = {
    jobDetailsData: {},
    similarJobsData: {},
    apiStatus: apiConstants.initial,
  };

  getJobDetailsSuccess = (data) => {
    console.log(data);

    const updatedJobDetails = {
      companyLogoUrl: data.job_details.company_logo_url,
      companyWebsiteUrl: data.job_details.company_website_url,
      employmentType: data.job_details.employment_type,
      id: data.job_details.id,
      jobDescription: data.job_details.job_description,
      skills: data.job_details.skills.map((eachObj) => ({
        imageUrl: eachObj.image_url,
        name: eachObj.name,
      })),
      title: data.job_details.title,
      lifeAtCompany: {
        description: data.job_details.life_at_company.description,
        imageUrl: data.job_details.life_at_company.image_url,
      },
      location: data.job_details.location,
      packagePerAnnum: data.job_details.package_per_annum,
      rating: data.job_details.rating,
    };

    const updatedSimilarJobs = data.similar_jobs.map((eachObj) => ({
      companyLogoUrl: eachObj.company_logo_url,
      employmentType: eachObj.employment_type,
      id: eachObj.id,
      jobDescription: eachObj.job_description,
      location: eachObj.location,
      rating: eachObj.rating,
      title: eachObj.title,
    }));

    this.setState({
      jobDetailsData: updatedJobDetails,
      similarJobsData: updatedSimilarJobs,
      apiStatus: apiConstants.success,
    });
  };

  getJobDetailsFailure = () => {
    this.setState({ apiStatus: apiConstants.failure });
  };

  getJobItemData = async () => {
    this.setState({ apiStatus: apiConstants.inProgress });
    const JwtToken = Cookies.get("jwt_token");

    const { match } = this.props;
    const { params } = match;
    const { id } = params;

    const URL = `https://apis.ccbp.in/jobs/${id}`;
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${JwtToken}`,
      },
    };
    const response = await fetch(URL, options);
    const data = await response.json();

    if (response.ok) {
      this.getJobDetailsSuccess(data);
    } else {
      this.getJobDetailsFailure(data);
    }
  };

  renderSuccessView = () => {
    const { jobDetailsData, similarJobsData } = this.state;

    return (
      <main className="job-details-content">
        <div className="job-details-card">
          <div className="job-details-header">
            <img
              className="job-details-image"
              src={jobDetailsData.companyLogoUrl}
              alt="job-details-image"
            />

            <div className="job-details-title-section">
              <h2 className="job-details-title">{jobDetailsData.title}</h2>

              <div className="job-details-rating">
                <MdOutlineStarPurple500
                  className="job-details-rating-icon"
                  color="fdbb4d"
                />
                <p className="job-details-rating-score">
                  {jobDetailsData.rating}
                </p>
              </div>
            </div>
          </div>

          <div className="job-details-tags">
            <div className="job-details-tag-info-wrapper">
              <div className="job-details-tag-item">
                <FaLocationDot className="job-details-tag-icon" />
                <p className="job-details-tag-text">
                  {jobDetailsData.location}
                </p>
              </div>

              <div className="job-details-tag-item">
                <BsBriefcaseFill className="job-details-tag-icon" />
                <p className="job-details-tag-text">
                  {jobDetailsData.employmentType}
                </p>
              </div>
            </div>

            <p className="job-details-salary">
              {jobDetailsData.packagePerAnnum}
            </p>
          </div>

          <hr className="job-details-divider" />

          <div className="job-details-description-section">
            <div className="job-details-description-row">
              <h3 className="job-details-description-title">Description</h3>
              <a
                className="job-details-description-link"
                href={jobDetailsData.companyWebsiteUrl}
              >
                <span>Visit</span>
                <FaExternalLinkAlt className="job-details-description-link-icon" />
              </a>
            </div>
            <p className="job-details-description-text job-details-desc">
              {jobDetailsData.jobDescription}
            </p>
          </div>

          <div className="job-details-skills-section">
            <h3 className="job-details-skills-title job-details-sub-title">
              Skills
            </h3>

            <ul className="job-details-skills-list">
              {jobDetailsData.skills.map((eachObj) => (
                <SkillItem key={eachObj.name} skillsInfo={eachObj} />
              ))}
            </ul>
          </div>

          <div className="job-details-company-life-section">
            <h3 className="job-details-company-life-title job-details-sub-title">
              Life at Company
            </h3>

            <div className="job-details-company-life-box">
              <p className="job-details-company-life-text job-details-desc">
                {jobDetailsData.lifeAtCompany.description}
              </p>
              <img
                src={jobDetailsData.lifeAtCompany.imageUrl}
                alt="job-details-company-life-image"
                className="job-details-company-life-image"
              />
            </div>
          </div>
        </div>

        <div className="similar-jobs-content">
          <h2 className="similar-jobs-title">Similar Jobs</h2>

          <ul className="similar-jobs-list">
            {similarJobsData.map((eachObj) => (
              <SimilarJobItem key={eachObj.id} similarJobInfo={eachObj} />
            ))}
          </ul>
        </div>
      </main>
    );
  };

  renderFailureView = () => (
    <div className="job-details-failure-result">
      <img
        className="job-details-failure-image"
        src="https://res.cloudinary.com/dkoqbt4pc/image/upload/v1733842125/Jobby%20App/computer-error.png"
        alt="job-details-failure-image"
      />
      <h2 className="job-details-failure-title">Oops! Something Went Wrong</h2>
      <p className="job-details-failure-description">
        We cannot seem to find the page you are looking for.
      </p>
      <button className="job-details-failure-retry-btn">Retry</button>
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

  renderSwitch = () => {
    const { apiStatus } = this.state;

    switch (apiStatus) {
      case apiConstants.success:
        return this.renderSuccessView();
      case apiConstants.failure:
        return this.renderFailureView();
      case apiConstants.inProgress:
        return this.renderLoader();
      default:
        return null;
    }
  };

  componentDidMount = () => {
    this.getJobItemData();
  };

  render() {
    return (
      <div className="job-details-page">
        <Navbar />

        {this.renderSwitch()}
      </div>
    );
  }
}

export default JobItemDetails;
