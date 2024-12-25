import './index.css';

const JobCard = () => {
  return (
    <div className="job-listing-card">
      <div className="job-listing-header">
        <img
          className="job-listing-image"
          src="https://www.solidbackgrounds.com/images/1920x1080/1920x1080-dark-orange-solid-color-background.jpg"
          alt="job-listing-image"
        />

        <div className="job-listing-title-section">
          <h2 className="job-listing-title">Devops Engineer</h2>

          <div className="job-listing-rating">
            <MdOutlineStarPurple500 className="rating-icon" color="fdbb4d" />
            <p className="rating-score">4</p>
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
            <p className="tag-text">Internship</p>
          </div>
        </div>

        <p className="job-listing-salary">10 LPA</p>
      </div>

      <hr className="job-listing-divider" />

      <div className="job-description-section">
        <h3 className="job-description-title">Description</h3>
        <p className="job-description-text">
          We are looking for a DevOps Engineer with a minimum of 5 years of
          industry experience, peferably working in the financial IT community.
          The position in the team is focused on delivering exceptional services
          to both BU and Dev partners to minimize/avoid any production outages.
          The role will focus on production support.
        </p>
      </div>
    </div>
  );
};

export default JobCard;
