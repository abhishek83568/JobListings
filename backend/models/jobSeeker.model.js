const mongoose = require("mongoose");

const JobSeekerSchema = new mongoose.Schema(
  {
    education: {
      type: String,
      required: true,
    },
    preferredJobType: {
      type: String,
      required: true,
    },
    expectedSalary: {
      type: Number,
      required: true,
    },
    jobTitle: {
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

const JobSeekerModel = mongoose.model("JobSeeker", JobSeekerSchema);

module.exports = JobSeekerModel;
