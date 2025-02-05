const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["employee", "employer"],
      default: "employee",
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
