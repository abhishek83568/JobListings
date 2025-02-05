const express = require("express");
const JobListingModel = require("../models/joblisting.model");
const Authorize = require("../middlewares/authorize.middleware");
const UserModel = require("../models/user.model");

const JobListingRouter = express.Router();

JobListingRouter.post("/jobListed", Authorize("employer"), async (req, res) => {
  try {
    const userId = req.user._id;
    const { CompanyName, Location, Salary, JobType, JobTitle } = req.body;
    const user = await UserModel.findOne({ _id: userId });
    if (!user) {
      res.status(401).json({ message: "User not Found" });
    }

    const job = new JobListingModel({
      CompanyName,
      Location,
      Salary,
      JobTitle,
      JobType,
      userId: userId,
    });

    await job.save();
    res.status(201).json({ message: "Job Listed successfully", job });
  } catch (error) {
    res.status(404).send(`Error while registering ${error}`);
  }
});

module.exports = JobListingRouter;
