const express = require("express");
const Authorize = require("../middlewares/authorize.middleware");
const JobSeekerModel = require("../Model/jobseeker.model");
const UserModel = require("../Model/user.model");
const JobListingModel = require("../Model/joblisting.model");
const CompanyModel = require("../Model/company.model");

const jobSeekerRouter = express.Router();

jobSeekerRouter.post(
  "/create-profile",
  Authorize("employee"),
  async (req, res) => {
    try {
      const userId = req.user._id;
      const { education, preferredJobType, expectedSalary, jobTitle } =
        req.body;
      const user = await UserModel.findOne({ _id: userId });
      if (!user) {
        res.status(401).json({ message: "User not Found" });
      }

      const jobProfile = new JobSeekerModel({
        education,
        preferredJobType,
        expectedSalary,
        jobTitle,
        userId: userId,
      });

      await jobProfile.save();
      res
        .status(201)
        .json({ message: "Job profile created successfully", jobProfile });
    } catch (error) {
      res.status(404).send(`Error while creating jobProfile ${error}`);
    }
  }
);

jobSeekerRouter.get(
  "/get-recommendation",
  Authorize("employee"),
  async (req, res) => {
    try {
      const userId = req.user._id;

      const jobSeeker = await JobSeekerModel.findOne({ userId });

      if (!jobSeeker) {
        return res
          .status(404)
          .json({ message: "Job Seeker profile not found" });
      }

      const matchingJobs = await JobListingModel.find({
        jobTitle: jobSeeker.jobTitle,
      });

      if (matchingJobs.length === 0) {
        return res
          .status(404)
          .json({ message: "No job recommendations found" });
      }

      const companyIds = [...new Set(matchingJobs.map((job) => job.companyId))];

      const recommendedCompanies = await CompanyModel.find({
        _id: { $in: companyIds },
      });

      res.status(200).json({
        message: "Recommended companies retrieved successfully",
        recommendedCompanies,
        matchingJobs,
      });
    } catch (error) {
      res.status(500).json({
        message: "An error occurred while retrieving recommendations",
        error: error.message,
      });
    }
  }
);

module.exports = jobSeekerRouter;
