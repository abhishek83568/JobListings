import "../App.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [register, setRegister] = useState({
    userName: "",
    email: "",
    password: "",
    role: "",
  });

  const handleChange = (e) => {
    const { value, name } = e.target;
    setRegister((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const payload = {
      userName: register.userName,
      email: register.email,
      password: register.password,
      role: register.role,
    };

    const res = await fetch(
      "https://joblistings-1.onrender.com/user/register",
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    const data = await res.json();
    console.log(data);

    if (data) {
      setRegister({
        userName: "",
        email: "",
        password: "",
        role: "employee",
      });

      navigate("/login");
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="register-container">
      <h1>
        Welcome to <span className="title">Job Dekho</span>{" "}
      </h1>
      <div className="input-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="userName">Name:</label>
            <input
              type="text"
              id="userName"
              name="userName"
              value={register.userName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="role">Role:</label>
            <select
              name="role"
              id="role"
              onChange={handleChange}
              value={register.role}
              required
            >
              <option value="">Please choose role</option>
              <option value="employer">Employer</option>
              <option value="employee">Employee</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={handleChange}
              value={register.email}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={handleChange}
              value={register.password}
              required
            />
          </div>
          <div className="btn-div">
            <input
              type="submit"
              className="button"
              value="Register"
              id="submit"
            />
          </div>
          <p>
            Already Registered? <Link to="/login">Login Now</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
