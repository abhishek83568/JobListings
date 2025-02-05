import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [register, setRegister] = useState({
    userName: "",
    email: "",
    password: "",
    role: "employee",
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

    const res = await fetch("http://localhost:8878/user/register", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    console.log(data);

    if (data) {
      setRegister(data.newUser);
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
    <div>
      <h1>Welcome to Job Dekho Website</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="userName">Enter your Name:</label>
            <input
              type="text"
              id="userName"
              name="userName"
              value={register.userName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form_input">
            <label htmlFor="role">Enter your Role:</label>
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

          <div className="form_input">
            <label htmlFor="email">Enter your Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={handleChange}
              value={register.email}
              required
            />
          </div>
          <div className="form_input">
            <label htmlFor="password">Enter your password:</label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={handleChange}
              value={register.password}
              required
            />
          </div>

          <input type="submit" value="Register" id="submit" />
          <p>
            Already Registered? <Link to="/login">Login Now</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
