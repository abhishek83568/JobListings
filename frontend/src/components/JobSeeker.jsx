import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const JobListing = () => {
  const [jobProfile, setJobProfile] = useState({
    education: "",
    expectedSalary: "",
    preferredJobType: "",
    jobTitle: "",
  });

  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState([]);

  const navigate = useNavigate();
  const token = JSON.parse(localStorage.getItem("token"));

  const handleChange = (e) => {
    const { value, name } = e.target;
    setJobProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const payload = { ...jobProfile };

    try {
      const res = await fetch(
        `http://localhost:8878/jobSeeker/create-profile`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();
      if (data) {
        console.log(data);
        setJobProfile({
          education: "",
          expectedSalary: "",
          jobTitle: "",
          preferredJobType: "",
        });
        setShowForm(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = async (e) => {
    setSearchQuery(e.target.value);

    if (e.target.value.length < 2) {
      setResults([]); // Clear results if the input is too short
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch(
        `http://localhost:8878/job/get-companies?jobTitle=${e.target.value}`,
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearers ${token}`,
          },
        }
      );
      const data = await res.json();
      console.log(data);
      setResults(data.result || []);
    } catch (error) {
      console.error("Error fetching results:", error);
    }
    setIsLoading(false);
  };

  return (
    <div>
      <h1>Job Dhundho</h1>
      {!showForm && (
        <button onClick={() => setShowForm(true)}>Create Profile</button>
      )}

      {/* Search Functionality */}
      <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
        <h2>Search Jobs</h2>
        <input
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
          placeholder="Search by job title"
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        />
        {isLoading && <p>Loading...</p>}
        {results.length > 0 && (
          <div
            style={{
              border: "1px solid #ccc",
              borderRadius: "5px",
              padding: "10px",
              marginTop: "10px",
              maxHeight: "200px",
              overflowY: "auto",
            }}
          >
            {results.map((company) => (
              <div
                key={company._id}
                style={{
                  padding: "10px",
                  borderBottom: "1px solid #ddd",
                }}
              >
                <h4>{"Post : " + company.jobTitle}</h4>
                <p>{"Location : " + company.location}</p>
                <p>{"JobType : " + company.jobType}</p>
                <p>{"Salary : " + company.salary}</p>
                <button
                  onClick={() =>
                    navigate(`/singleCompany/${company.companyId}`)
                  }
                >
                  Company Details
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Job Profile Form */}
      {showForm && (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="education">Education:</label>
            <input
              type="text"
              id="education"
              name="education"
              value={jobProfile.education}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="preferredJobType">Preferred Job Type:</label>
            <input
              type="text"
              id="preferredJobType"
              name="preferredJobType"
              value={jobProfile.preferredJobType}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="expectedSalary">Expected Salary:</label>
            <input
              type="number"
              id="expectedSalary"
              name="expectedSalary"
              value={jobProfile.expectedSalary}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="jobTitle">Job Title:</label>
            <input
              type="text"
              id="jobTitle"
              name="jobTitle"
              value={jobProfile.jobTitle}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Submit</button>
          <button type="button" onClick={() => setShowForm(false)}>
            Cancel
          </button>
        </form>
      )}

      <button>Recommended Jobs</button>
    </div>
  );
};

export default JobListing;
