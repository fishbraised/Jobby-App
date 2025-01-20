import "./index.css";

import { MdOutlineStarPurple500 } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { BsBriefcaseFill } from "react-icons/bs";

import { Triangle } from "react-loader-spinner";

const SimilarJobItem = (props) => {
  const { similarJobInfo } = props;

  return (
    <li className="similar-job-item">
      <div className="similar-job-card">
        <div className="similar-job-header">
          <img
            className="similar-job-image"
            src={similarJobInfo.companyLogoUrl}
            alt="similar-job-image"
          />

          <div className="similar-job-title-section">
            <h2 className="similar-job-title">{similarJobInfo.title}</h2>

            <div className="similar-job-rating">
              <MdOutlineStarPurple500
                className="similar-job-rating-icon"
                color="fdbb4d"
              />
              <p className="similar-job-rating-score">
                {similarJobInfo.rating}
              </p>
            </div>
          </div>
        </div>

        <div className="similar-job-tags">
          <div className="similar-job-tag-info-wrapper">
            <div className="similar-job-tag-item">
              <FaLocationDot className="similar-job-tag-icon" />
              <p className="similar-job-tag-text">{similarJobInfo.location}</p>
            </div>

            <div className="similar-job-tag-item">
              <BsBriefcaseFill className="similar-job-tag-icon" />
              <p className="similar-job-tag-text">
                {similarJobInfo.employmentType}
              </p>
            </div>
          </div>

          <p className="similar-job-salary">{similarJobInfo.packagePerAnnum}</p>
        </div>

        <hr className="similar-job-divider" />

        <div className="similar-job-description-section">
          <h3 className="similar-job-description-title">Description</h3>
          <p className="similar-job-description-text">
            {similarJobInfo.jobDescription}
          </p>
        </div>
      </div>
    </li>
  );
};

export default SimilarJobItem;
