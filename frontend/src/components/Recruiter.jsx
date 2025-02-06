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
      const res = await fetch("http://localhost:8878/company/create-company", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearers ${token}`,
        },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.ok) {
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
  return (
    <div>
      <div>
        <h1>Create Your Company Profile</h1>
      </div>
      <div>
        <button onClick={() => navigate("/companyListing")}>
          See All Your Companies
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
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
        <div>
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
        <div>
          <label htmlFor="about">About Company</label>
          <input
            type="text"
            id="about"
            name="about"
            value={companyDetails.about}
            onChange={handleChange}
            required
          />
        </div>
        <input type="submit" value="Submit" id="submit" />
      </form>
    </div>
  );
};

export default Recruiter;
