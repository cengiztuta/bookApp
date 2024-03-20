import React, { useState, useEffect } from "react";
import "./SignUp.css";
import { useNavigate } from "react-router-dom";
import { useData } from "../Context/DataContext";
const SignUpPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const { getUserData, userData, addUser } = useData();
  useEffect(() => {
    getUserData();
  }, []);

  const handleSignUp = () => {
    if (!email || !password || !name || !lastName) {
      alert("Please fill in the blanks");
      return;
    }
    const foundUser = userData.find((user) => user.email === email);
    if (foundUser) {
      alert("This email already exist");
      return;
    }
    if (password.length < 8) {
      alert(" Password should be at least 8 characters ");
      return;
    }
    addUser(name, lastName, email, password);
  };
  return (
    <div className="signupPage">
      <div className="signup-input-container">
        {" "}
        <div className="signup-input-content">
          <div className="name-container">
            <div>
              <p>Name</p>
              <input
                placeholder="Please enter an name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />{" "}
            </div>{" "}
            <div>
              <p>Last Name</p>
              <input
                placeholder="Please enter an name"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />{" "}
            </div>{" "}
          </div>
          <div>
            <p>Email</p>
            <input
              placeholder="Please enter an email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />{" "}
          </div>{" "}
          <div>
            <p>Password</p>
            <input
              placeholder="Please enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={"password"}
            />{" "}
          </div>
        </div>
        <div className="login-button-container">
          <button onClick={() => navigate("/Login")}>Sign In</button>{" "}
          <button onClick={() => handleSignUp()}>Sign Up</button>{" "}
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
