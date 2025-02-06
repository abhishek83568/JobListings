const express = require("express");
const Authorize = require("../middlewares/authorize.middleware");
const UserModel = require("../models/user.model");
const CompanyModel = require("../models/company.model");

const CompanyRouter = express.Router();

CompanyRouter.get(
  "/get-allMyCompany",
  Authorize("employer"),
  async (req, res) => {
    try {
      const userId = req.user._id;
      const companies = await CompanyModel.find({ createdBy: userId });
      res.status(200).json({
        message: "All Companies retrieved successfully",
        companies,
      });
    } catch (error) {
      res.status(404).send(`Error while retrieving all companies ${error}`);
    }
  }
);

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

      const company = new CompanyModel({
        name,
        location,
        about,
        createdBy: userId,
      });

      await company.save();
      res
        .status(201)
        .json({ message: "Company details created successfully", company });
    } catch (error) {
      res.status(404).send(`Error while registering ${error}`);
    }
  }
);

module.exports = CompanyRouter;
