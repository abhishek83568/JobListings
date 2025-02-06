import React from "react";
import { Routes, Route } from "react-router-dom";
import RegisterPage from "./RegisterPage";
import LoginPage from "./LoginPage";
import Recruiter from "./Recruiter";
import JobSeeker from "./JobSeeker";
import CompanyListing from "./CompanyListing";

const Links = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/employer" element={<Recruiter />} />
        <Route path="/employee" element={<JobSeeker />} />
        <Route path="/companyListing" element={<CompanyListing />} />
      </Routes>
    </div>
  );
};

export default Links;
