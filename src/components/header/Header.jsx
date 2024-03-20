import React, { useState, useRef, useEffect } from "react";
import { useData } from "../../Context/DataContext";
import "./header.css";
import logo from "../../assets/logo.jpg";
import { FaRegUserCircle } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
const Header = () => {
  const navigate = useNavigate();
  const {
    searchBook,
    setSearchBook,
    handleSearchBook,
    setFilteredData,
    setFormat,
    currentUser,
    logout,
    setUserInfo,
    userInfo,
  } = useData();
  const [input, setInput] = useState(false);
  const inputPath = window.location.pathname === "/";
  const userPicMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        userPicMenuRef.current &&
        !userPicMenuRef.current.contains(event.target)
      ) {
        setUserInfo(false);
      }
    };

    // Başlangıçta userInfo'yi true olarak ayarla
    setUserInfo(false);

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [userPicMenuRef]);

  return (
    <div className="header">
      <button
        onClick={() => {
          navigate("/"), setFilteredData(bookData), setFormat("All");
        }}
      >
        <img style={{ height: "50px", width: "50px" }} src={logo} />
      </button>
      {inputPath && (
        <div className="search-container">
          <input
            onFocus={() => setInput(true)}
            type={"text"}
            placeholder="What Do You want"
            className={`search-input ${input === true ? "focused" : ""}`}
            value={searchBook}
            onChange={(e) => setSearchBook(e.target.value)}
            onBlur={() => setInput(false)}
          />
          <button
            className="search-button"
            onClick={() => {
              handleSearchBook();
              setInput(false);
            }}
          >
            Search
          </button>
        </div>
      )}
      <div className="header-texts">
        <button className="header-button">About Us</button>
        <button className="header-button">FAQ</button>{" "}
        <button className="header-button">Contact</button>
        <button className="header-button">Language</button>
        {currentUser ? (
          <div className="header-currentUser-info">
            <div className="userPic">
              <button
                className="header-info-button"
                onClick={() => setUserInfo(true)}
              >
                {currentUser.name}
                <FaAngleDown
                  className={`user-button-icon ${userInfo ? "active" : ""}`}
                  size={"25px"}
                />
              </button>

              <div
                ref={userPicMenuRef}
                className={`userPic-menu ${userInfo ? "active" : ""} `}
              >
                <button onClick={logout}>Log Out</button>
              </div>
            </div>
          </div>
        ) : (
          <div className="sign-container">
            <button
              className="header-button"
              onClick={() => navigate("/Login")}
            >
              Sign In
            </button>
            <button
              className="header-button"
              onClick={() => navigate("/SignUp")}
            >
              Sign Up
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
