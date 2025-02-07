import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchData } from "../redux/action";
import "../App.css";

const Jobs = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.jobList);
  const token = JSON.parse(localStorage.getItem("token"));
  const url = `http://localhost:8878/job/get-AllJobs/${id}`;

  useEffect(() => {
    if (token) {
      dispatch(fetchData(url, token));
    }
  }, [dispatch, id, token]);

  if (!data || !data.jobs || !Array.isArray(data.jobs)) {
    return <h2 className="loading-text">Loading jobs...</h2>;
  }

  return (
    <div className="jobs-container">
      <h2 className="jobs-title">Available Jobs</h2>
      <div className="jobs-list">
        {data.jobs.map((job) => (
          <div key={job._id} className="job-card">
            <h1 className="job-title">{job.jobTitle}</h1>
            <p className="job-type">Type: {job.jobType}</p>
            <h4 className="job-salary">Salary: {job.salary}</h4>
            <h4 className="job-location">Location: {job.location}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Jobs;
