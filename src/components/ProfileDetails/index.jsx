import './index.css';

// Use the data here from Profile API

const ProfileDetails = () => {
  const renderSuccessView = () => (
    <div className="profile-details-card">
      <figure className="profile-identity">
        <img
          className="profile-image"
          src="https://res.cloudinary.com/dkoqbt4pc/image/upload/v1733839356/Jobby%20App/avatar-profile.jpg"
          alt="profile-image"
        />
        <figcaption className="profile-caption">
          <h2 className="profile-name">Rahul Attuluri</h2>
          <p className="profile-job-title">
            Lead Software Developer and AI-ML expert
          </p>
        </figcaption>
      </figure>
    </div>
  );

  const renderFailureView = () => (
    <div className="profile-error">
      <button className="profile-retry-btn">Retry</button>
    </div>
  );

  return renderFailureView();
};

export default ProfileDetails;
