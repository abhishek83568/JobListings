const mongoose = require("mongoose");

const JobListingSchema = new mongoose.Schema(
  {
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
    Location: {
      type: String,
      required: true,
    },
    Salary: {
      type: Number,
      required: true,
    },
    JobType: {
      type: String,
      required: true,
    },
    JobTitle: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const JobListingModel = mongoose.model("JobListing", JobListingSchema);

module.exports = JobListingModel;
