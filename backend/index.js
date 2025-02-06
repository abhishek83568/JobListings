const express = require("express");
const cors = require("cors");
const connection = require("./config/db");
const userRouter = require("./routes/user.route");
const Auth = require("./middlewares/auth.middleware");
const JobListingRouter = require("./routes/jobListing.route");
const CompanyRouter = require("./routes/company.route");
const jobSeekerRouter = require("./routes/jobSeeker.route");
const dotenv = require("dotenv").config();

const app = express();
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.use("/user", userRouter);
app.use("/job", Auth, JobListingRouter);
app.use("/company", Auth, CompanyRouter);
app.use("/jobSeeker", Auth, jobSeekerRouter);

const PORT = process.env.PORT || 3000;

app.get("/", async (req, res) => {
  try {
    res.status(200).json({
      message: "Welcome to JobListing ",
    });
  } catch (error) {
    res.status(404).send(`${error} while running server`);
  }
});

app.listen(PORT, "0.0.0.0", async () => {
  try {
    await connection;
    console.log(
      `Server is running on Port ${PORT} and database is also connected`
    );
  } catch (error) {
    console.log(`Error while connecting to server and database`);
  }
});
