import { Link } from "react-router-dom";

import { MdOutlineStarPurple500 } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { BsBriefcaseFill } from "react-icons/bs";

import "./index.css";

const JobCard = (props) => {
  const { jobDetails } = props;
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    packagePerAnnum,
    rating,
    title,
  } = jobDetails;

  return (
    <Link className="link-tag" to={`/jobs/${id}`}>
      <div className="job-listing-card">
        <div className="job-listing-header">
          <img
            className="job-listing-image"
            src={companyLogoUrl}
            alt="job-listing-image"
          />

          <div className="job-listing-title-section">
            <h2 className="job-listing-title">{title}</h2>

            <div className="job-listing-rating">
              <MdOutlineStarPurple500 className="rating-icon" color="fdbb4d" />
              <p className="rating-score">{rating}</p>
            </div>
          </div>
        </div>

        <div className="job-listing-tags">
          <div className="tag-info-wrapper">
            <div className="tag-item">
              <FaLocationDot className="tag-icon" />
              <p className="tag-text">Delhi</p>
            </div>

            <div className="tag-item">
              <BsBriefcaseFill className="tag-icon" />
              <p className="tag-text">{employmentType}</p>
            </div>
          </div>

          <p className="job-listing-salary">{packagePerAnnum}</p>
        </div>

        <hr className="job-listing-divider" />

        <div className="job-description-section">
          <h3 className="job-description-title">Description</h3>
          <p className="job-description-text">{jobDescription}</p>
        </div>
      </div>
    </Link>
  );
};

export default JobCard;
