const express = require("express");

const CompanyRouter = express.Router();

CompanyRouter.post(
  "/create-company",
  Authorize("employer"),
  async (req, res) => {
    try {
      const userId = req.user._id;
      const { name, location, about } = req.body;
      const user = await UserModel.findOne({ _id: userId });
      if (!user) {
        res.status(401).json({ message: "User not Found" });
      }

      const company = new JobListingModel({
        name,
        location,
        about,
        createdBy: userId,
      });

      await company.save();
      res.status(201).json({ message: "Job Listed successfully", company });
    } catch (error) {
      res.status(404).send(`Error while registering ${error}`);
    }
  }
);

module.exports = CompanyRouter;
