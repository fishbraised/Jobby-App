import { Link } from "react-router-dom";

import Navbar from "../Navbar";

import "./index.css";

const HomePage = () => {
  return (
    <div className="home-page">
      <Navbar />

      <main className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Find The Job That Fits Your Life</h1>
          <p className="hero-description">
            Millions of people are searching for jobs, salary information,
            company reviews. Find the job that fits your abilities and
            potential.
          </p>
          <Link to="/jobs">
            <button className="cta-find-jobs-btn">Find Jobs</button>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
