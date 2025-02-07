import "../App.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const JobSeeker = () => {
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
        `https://joblistings-1.onrender.com/jobSeeker/create-profile`,
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
      setResults([]);
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch(
        `https://joblistings-1.onrender.com/job/get-companies?jobTitle=${e.target.value}`,
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      setResults(data.result || []);
    } catch (error) {
      console.error("Error fetching results:", error);
    }
    setIsLoading(false);
  };

  return (
    <div className="jobSeeker-container">
      <h1 className="title">Job Dekho</h1>
      {!showForm && (
        <button className="button" onClick={() => setShowForm(true)}>
          Create Profile
        </button>
      )}

      {!showForm && (
        <div className="search-container">
          <h2>Search Jobs</h2>
          <input
            type="text"
            value={searchQuery}
            onChange={handleInputChange}
            placeholder="Search by job title"
            className="search-input"
          />
          {isLoading && <p>Loading...</p>}
          {results.length > 0 && (
            <div className="search-results">
              {results.map((company) => (
                <div key={company._id} className="result-card">
                  <h4>{"Post: " + company.jobTitle}</h4>
                  <p>{"Location: " + company.location}</p>
                  <p>{"JobType: " + company.jobType}</p>
                  <p>{"Salary: " + company.salary}</p>
                  <button
                    className="button"
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
      )}

      {showForm && (
        <form className="jobSeeker-form" onSubmit={handleSubmit}>
          <div className="form-group">
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
          <div className="form-group">
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
          <div className="form-group">
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
          <div className="form-group">
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
          <div className="btn-group">
            <button type="submit" className="button">
              Submit
            </button>
            <button
              type="button"
              className="button cancel-btn"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <button className="button">Recommended Jobs</button>
    </div>
  );
};

export default JobSeeker;
