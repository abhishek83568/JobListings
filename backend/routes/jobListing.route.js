const express = require("express");
const JobListingModel = require("../models/joblisting.model");
const Authorize = require("../middlewares/authorize.middleware");
const UserModel = require("../models/user.model");
const CompanyModel = require("../models/company.model");

const JobListingRouter = express.Router();

JobListingRouter.post("/jobListed", Authorize("employer"), async (req, res) => {
  try {
    const userid = req.user._id;
    const { companyId, Location, Salary, JobType, JobTitle, userId } = req.body;
    const user = await UserModel.findOne({ _id: userid });
    const company = await CompanyModel.findOne({ createdBy: userid });
    console.log(user);
    console.log(company);

    if (!user) {
      res.status(401).json({ message: "User not Found" });
    }

    const job = new JobListingModel({
      companyId: company._id,
      Location,
      Salary,
      JobTitle,
      JobType,
      userId: userid,
    });

    await job.save();
    res.status(201).json({ message: "Job Listed successfully", job });
  } catch (error) {
    res.status(404).send(`Error while registering ${error}`);
  }
});

module.exports = JobListingRouter;
