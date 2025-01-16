import Cookies from "js-cookie";

import Navbar from "../Navbar";
import SkillItem from "../SkillItem";

import { MdOutlineStarPurple500 } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { BsBriefcaseFill } from "react-icons/bs";
import { FaExternalLinkAlt } from "react-icons/fa";

import { Component } from "react";

import "./index.css";

const apiConstants = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  inProgress: "IN_PROGRESS",
};

class JobItemDetails extends Component {
  state = { jobItemData: {}, apiStatus: apiConstants.initial };

  getJobDetailsSuccess = (data) => {
    const updatedJobDetails = {
      companyLogoUrl: data.job_details.company_logo_url,
      companyWebsiteUrl: data.job_details.company_website_url,
      employmentType: data.job_details.employment_type,
      id: data.id,
      jobDescription: data.job_details.job_description,
      skills: data.job_details.skills.map((eachObj) => ({
        imageUrl: eachObj.image_url,
        name: eachObj.name,
      })),
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

    const updatedData = {
      jobDetails: updatedJobDetails,
      similarJobs: updatedSimilarJobs,
    };

    this.setState({ jobItemData: updatedData });

    console.log("raw api data: ", data);
    console.log("updated api data: ", updatedData);
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

  componentDidMount = () => {
    this.getJobItemData();
  };

  render() {
    const { jobItemData } = this.state;

    return (
      <div className="job-details-page">
        <Navbar />

        <main className="job-details-content">
          <div className="job-details-card">
            <div className="job-details-header">
              <img
                className="job-details-image"
                src="https://assets.ccbp.in/frontend/react-js/jobby-app/netflix-img.png"
                alt="job-details-image"
              />

              <div className="job-details-title-section">
                <h2 className="job-details-title">Devops Engineer</h2>

                <div className="job-details-rating">
                  <MdOutlineStarPurple500
                    className="job-details-rating-icon"
                    color="fdbb4d"
                  />
                  <p className="job-details-rating-score">4</p>
                </div>
              </div>
            </div>

            <div className="job-details-tags">
              <div className="job-details-tag-info-wrapper">
                <div className="job-details-tag-item">
                  <FaLocationDot className="job-details-tag-icon" />
                  <p className="job-details-tag-text">Delhi</p>
                </div>

                <div className="job-details-tag-item">
                  <BsBriefcaseFill className="job-details-tag-icon" />
                  <p className="job-details-tag-text">Internship</p>
                </div>
              </div>

              <p className="job-details-salary">10 LPA</p>
            </div>

            <hr className="job-details-divider" />

            <div className="job-details-description-section">
              <div className="job-details-description-row">
                <h3 className="job-details-description-title job-details-sub-title">
                  Description
                </h3>
                <a className="job-details-description-link" href="#">
                  <span>Visit</span>
                  <FaExternalLinkAlt className="job-details-description-link-icon" />
                </a>
              </div>
              <p className="job-details-description-text">
                We are looking for a DevOps Engineer with a minimum of 5 years
                of industry experience, preferably working in the financial IT
                community. The position in the team is focused on delivering
                exceptional services to both BU and Dev partners to
                minimize/avoid any production outages. The role will focus on
                production support.
              </p>
            </div>

            <div className="job-details-skills-section">
              <h3 className="job-details-skills-title job-details-sub-title">
                Skills
              </h3>

              <ul className="job-details-skills-list">
                {jobItemData.jobDetails.skills.map((eachObj) => (
                  <SkillItem key={eachObj.name} skillsInfo={eachObj} />
                ))}
              </ul>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default JobItemDetails;
