import Cookies from "js-cookie";

import { Triangle } from "react-loader-spinner";

import { Component } from "react";
import "./index.css";

// Use the data here from Profile API

const apiConstants = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  inProgress: "IN_PROGRESS",
};

class ProfileDetails extends Component {
  state = { profileData: [], apiStatus: apiConstants.initial };

  renderSuccessView = () => {
    const { profileData } = this.state;
    const { profileImageUrl, name, shortBio } = profileData;

    return (
      <div className="profile-details-card">
        <figure className="profile-identity">
          <img
            className="profile-image"
            src={profileImageUrl}
            alt="profile-image"
          />
          <figcaption className="profile-caption">
            <h2 className="profile-name">{name}</h2>
            <p className="profile-job-title">{shortBio}</p>
          </figcaption>
        </figure>
      </div>
    );
  };

  renderFailureView = () => (
    <div className="profile-error">
      <button className="profile-retry-btn">Retry</button>
    </div>
  );

  renderLoader = () => (
    <div className="profile-loader-con">
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

  getProfileSuccess = (data) => {
    const updatedData = {
      name: data.name,
      profileImageUrl: data.profile_image_url,
      shortBio: data.short_bio,
    };

    this.setState({
      profileData: updatedData,
      apiStatus: apiConstants.success,
    });
  };

  getProfileFailure = (errorMsg) => {
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

  getProfileData = async () => {
    this.setState({ apiStatus: apiConstants.inProgress });
    const JwtToken = Cookies.get("jwt_token");

    const url = "https://apis.ccbp.in/profile";
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${JwtToken}`,
      },
    };
    const response = await fetch(url, options);
    const data = await response.json();

    if (response.ok) {
      this.getProfileSuccess(data.profile_details);
    } else {
      this.getProfileFailure(data.error_msg);
    }
  };

  componentDidMount() {
    this.getProfileData();
  }

  render() {
    return this.renderSwitch();
  }
}

export default ProfileDetails;
