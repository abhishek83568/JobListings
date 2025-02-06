import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchData } from "../redux/action";

const SingleCompany = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.jobList);
  const token = JSON.parse(localStorage.getItem("token"));
  const url = `http://localhost:8878/company/get-Company/${id}`;
  useEffect(() => {
    if (token) {
      dispatch(fetchData(url, token));
    }
  }, [dispatch, id, token]);
  console.log(data);
  if (!data || !data.company || !Array.isArray(data.company)) {
    return <h2>Loading Company..</h2>;
  }

  return (
    <div>
      <h2>Company Details</h2>
      <div>
        {data.company.map((ele) => (
          <div key={ele._id}>
            <h1>{ele.name}</h1>
            <p>{ele.about}</p>
            <h4>{ele.location}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SingleCompany;
