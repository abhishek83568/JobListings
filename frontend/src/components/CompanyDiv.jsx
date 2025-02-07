import { useNavigate } from "react-router-dom";
import "../App.css";

const CompanyDiv = ({ company }) => {
  const navigate = useNavigate();
  return (
    <div className="company-card">
      <h1 className="company-name">{company.name}</h1>
      <p className="company-about">{company.about}</p>
      <h4 className="company-location">📍 {company.location}</h4>
      <div className="company-buttons">
        <button
          className="btn create-btn"
          onClick={() => navigate(`/jobListing/${company._id}`)}
        >
          ➕ Create Job
        </button>
        <button
          className="btn see-jobs-btn"
          onClick={() => navigate(`/allJobsCreated/${company._id}`)}
        >
          👀 See All Jobs
        </button>
      </div>
    </div>
  );
};

export default CompanyDiv;
