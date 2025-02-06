import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const JobListing = () => {
  const { id } = useParams();
  const [jobListing, setJobListing] = useState({
    location: "",
    salary: "",
    jobType: "",
    jobTitle: "",
  });
  const navigate = useNavigate();
  const token = JSON.parse(localStorage.getItem("token"));

  const handleChange = (e) => {
    const { value, name } = e.target;
    setJobListing((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const payload = {
      location: jobListing.location,
      salary: jobListing.salary,
      jobTitle: jobListing.jobTitle,
      jobType: jobListing.jobType,
    };
    try {
      const res = await fetch(`http://localhost:8878/job/jobListed/${id}`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearers ${token}`,
        },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data) {
        setJobListing({
          salary: "",
          location: "",
          jobTitle: "",
          jobType: "",
        });
        navigate("/companyListing");
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log(id);
  return (
    <div>
      <div>
        <h1>Create Job </h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="location">Company Location</label>
          <input
            type="text"
            id="location"
            name="location"
            value={jobListing.location}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="salary">Salary</label>
          <input
            type="number"
            id="salary"
            name="salary"
            value={jobListing.salary}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="jobType">JobType</label>
          <input
            type="text"
            id="jobType"
            name="jobType"
            value={jobListing.jobType}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="jobTitle">JobTitle</label>
          <input
            type="text"
            id="jobTitle"
            name="jobTitle"
            value={jobListing.jobTitle}
            onChange={handleChange}
            required
          />
        </div>
        <input type="submit" value="Submit" id="submit" />
      </form>
    </div>
  );
};

export default JobListing;
