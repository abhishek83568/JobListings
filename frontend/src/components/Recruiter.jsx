import "../App.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Recruiter = () => {
  const navigate = useNavigate();
  const token = JSON.parse(localStorage.getItem("token"));
  const [companyDetails, setCompanyDetails] = useState({
    name: "",
    location: "",
    about: "",
  });

  const handleChange = (e) => {
    const { value, name } = e.target;
    setCompanyDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const payload = {
      name: companyDetails.name,
      location: companyDetails.location,
      about: companyDetails.about,
    };

    try {
      const res = await fetch(
        "https://joblistings-1.onrender.com/company/create-company",
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );
      const data = await res.json();
      if (data) {
        setCompanyDetails({
          name: "",
          location: "",
          about: "",
        });
        navigate("/companyListing");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlelogout = async () => {
    try {
      const response = await fetch(
        "https://joblistings-1.onrender.com/user/logout",
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        localStorage.removeItem("token");

        setTimeout(() => {
          navigate("/login");
        }, 500);
      } else {
        console.error("Logout failed", response.statusText);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="recruiter-container">
      <h1 className="title">Create Your Company Profile</h1>

      <button className="button" onClick={() => navigate("/companyListing")}>
        See All Your Companies
      </button>
      <div>
        <button className="button" onClick={handlelogout}>
          Logout
        </button>
      </div>

      <form className="recruiter-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Company Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={companyDetails.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="location">Company Location</label>
          <input
            type="text"
            id="location"
            name="location"
            value={companyDetails.location}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="about">About Company</label>
          <textarea
            id="about"
            name="about"
            value={companyDetails.about}
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
            onClick={() => navigate("/")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default Recruiter;
