import React from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";

const CompanyDiv = ({ company }) => {
  const navigate = useNavigate();
  return (
    <div>
      <h1>{company.name}</h1>
      <p>{company.about}</p>
      <h4>{company.location}</h4>
      <button onClick={() => navigate(`/jobListing/${company._id}`)}>
        Create Job
      </button>
      <button onClick={() => navigate(`/allJobsCreated/${company._id}`)}>
        See All Jobs created
      </button>
    </div>
  );
};

export default CompanyDiv;
