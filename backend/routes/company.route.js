const express = require("express");
const Authorize = require("../middlewares/authorize.middleware");
const UserModel = require("../models/user.model");
const CompanyModel = require("../models/company.model");
const mongoose = require("mongoose");

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

CompanyRouter.get(
  "/get-Company/:id",
  Authorize("employee"),
  async (req, res) => {
    try {
      const { id } = req.params;

      const company = await CompanyModel.find({ _id: id });

      if (!company) {
        return res.status(404).json({ message: "Company not found" });
      }

      res.status(200).json({
        message: "Company retrieved successfully",
        company,
      });
    } catch (error) {
      console.error("Error retrieving company:", error);
      res.status(500).json({
        message: "Error while retrieving company",
        error: error.message,
      });
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
