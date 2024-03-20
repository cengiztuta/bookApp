import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";
import { useData } from "../Context/DataContext";
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signUp, setSignUp] = useState(false);
  const { setCurrentUser, getUserData, userData } = useData();
  const navigate = useNavigate();
  useEffect(() => {
    getUserData();
  }, []);

  const handleLogin = () => {
    if (!email || !password) {
      alert("Please Enter Email Password");
      return;
    }
    const foundUser = userData.find((user) => user.email === email);
    if (!foundUser) {
      alert("User is not founded. Please Sign up ");
      setEmail("");
      setPassword("");
      return;
    } else if (foundUser.password === password) {
      localStorage.setItem("currentUser", JSON.stringify(foundUser));
      setCurrentUser(foundUser);
      navigate("/");
    } else {
      alert("Wrong Password");
      setPassword("");
      return;
    }
  };
  return (
    <div className="loginPage">
      <div className="input-container">
        {" "}
        <div className="input-content">
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
          {" "}
          <button onClick={handleLogin}>Sign In</button>{" "}
          <button onClick={() => navigate("/SignUp")}>Sign Up</button>{" "}
        </div>
      </div>{" "}
    </div>
  );
};

export default LoginPage;
