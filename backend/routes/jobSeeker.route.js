const express = require("express");
const Authorize = require("../middlewares/authorize.middleware");
const JobSeekerModel = require("../Model/jobseeker.model");
const UserModel = require("../Model/user.model");

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

module.exports = jobSeekerRouter;
