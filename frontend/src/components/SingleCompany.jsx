import "../App.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchData } from "../redux/action";

const SingleCompany = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.jobList);
  const token = JSON.parse(localStorage.getItem("token"));
  const url = `https://joblistings-1.onrender.com/company/get-Company/${id}`;

  useEffect(() => {
    if (token) {
      dispatch(fetchData(url, token));
    }
  }, [dispatch, id, token]);

  if (!data || !data.company || !Array.isArray(data.company)) {
    return <h2 className="loading-text">Loading Company..</h2>;
  }

  return (
    <div className="company-container">
      <h2 className="company-title">Company Details</h2>
      <div className="company-list">
        {data.company.map((ele) => (
          <div key={ele._id} className="company-card">
            <h1 className="company-name">{ele.name}</h1>
            <p className="company-about">{ele.about}</p>
            <h4 className="company-location">{ele.location}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SingleCompany;
