import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchData } from "../redux/action";

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
    return <h2>Loading jobs...</h2>;
  }

  return (
    <div>
      <h2>Jobs</h2>
      <div>
        {data.jobs.map((job) => (
          <div key={job._id}>
            <h1>{job.jobTitle}</h1>
            <p>{job.jobType}</p>
            <h4>{job.salary}</h4>
            <h4>{job.location}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Jobs;
