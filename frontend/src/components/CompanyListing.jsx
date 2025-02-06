import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CompanyDiv from "./CompanyDiv";
import "../App.css";
const CompanyListing = () => {
  const navigate = useNavigate();
  const token = JSON.parse(localStorage.getItem("token"));
  const [companyList, setCompanyList] = useState([]);

  const fetchCompanies = async () => {
    try {
      const res = await fetch(
        "http://localhost:8878/company/get-allMyCompany",
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearers ${token}`,
          },
        }
      );
      const data = await res.json();
      if (data) {
        setCompanyList(data.companies);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  return companyList.length === 0 ? (
    <h1>No Companies </h1>
  ) : (
    <div>
      {companyList.map((company) => (
        <div key={company._id} className="company-container">
          <CompanyDiv company={company} />
        </div>
      ))}
    </div>
  );
};

export default CompanyListing;
