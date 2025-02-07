import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../App.css";

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
    const payload = { ...jobListing };

    try {
      const res = await fetch(`http://localhost:8878/job/jobListed/${id}`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
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

  return (
    <div className="job-listing-container">
      <h1 className="job-listing-title">Create Job</h1>
      <form onSubmit={handleSubmit} className="job-listing-form">
        <div className="form-group">
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
        <div className="form-group">
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
        <div className="form-group">
          <label htmlFor="jobType">Job Type</label>
          <input
            type="text"
            id="jobType"
            name="jobType"
            value={jobListing.jobType}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="jobTitle">Job Title</label>
          <input
            type="text"
            id="jobTitle"
            name="jobTitle"
            value={jobListing.jobTitle}
            onChange={handleChange}
            required
          />
        </div>
        <input type="submit" value="Submit" className="submit-btn" />
      </form>
    </div>
  );
};

export default JobListing;
