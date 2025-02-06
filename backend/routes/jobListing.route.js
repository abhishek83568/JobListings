const express = require("express");
const JobListingModel = require("../models/joblisting.model");
const Authorize = require("../middlewares/authorize.middleware");
const UserModel = require("../models/user.model");
const CompanyModel = require("../models/company.model");

const JobListingRouter = express.Router();

JobListingRouter.get(
  "/get-AllJobs/:id",
  Authorize("employer"),
  async (req, res) => {
    try {
      const { id } = req.params;
      const userid = req.user._id;
      const jobs = await JobListingModel.find({
        companyId: id,
        userId: userid,
      });
      res.status(200).json({ message: "All Jobs retrieved", jobs });
    } catch (error) {
      res.status(404).send(`Error while retrieving all jobs ${error}`);
    }
  }
);

JobListingRouter.post(
  "/jobListed/:id",
  Authorize("employer"),
  async (req, res) => {
    try {
      const { id } = req.params;
      const userid = req.user._id;
      const { location, salary, jobType, jobTitle } = req.body;
      const user = await UserModel.findOne({ _id: userid });
      const company = await CompanyModel.findOne({
        _id: id,
        createdBy: userid,
      });

      if (!user || !company) {
        res.status(401).json({ message: "User or Company not Found" });
      }

      const job = new JobListingModel({
        companyId: company._id,
        location,
        salary,
        jobTitle,
        jobType,
        userId: userid,
      });

      await job.save();
      res
        .status(201)
        .json({ message: "Job Listed successfully", job, user, company });
    } catch (error) {
      res.status(404).send(`Error while registering ${error}`);
    }
  }
);

module.exports = JobListingRouter;
