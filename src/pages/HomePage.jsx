import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import BookCard from "../components/bookCard/BookCard";
import SideBar from "../components/sideBar/SideBar";
import { GiHamburgerMenu } from "react-icons/gi";
import "./homepage.css";
import { useData } from "../Context/DataContext";
import { useParams } from "react-router-dom";
const HomePage = () => {
  const {
    bookData,
    setBookData,
    filteredData,
    setFilteredData,
    searchBook,
    setSearchBook,
    format,
    setFormat,
    getBookData,
    moreBook,
    setMoreBook,
    filterMenu,
    setFilterMenu,
    filterGenre,
    setFilterGenre,
    setExistUser,
    existUser,
    currentUser,
  } = useData();

  useEffect(() => {
    getBookData();
  }, []);

  const getMoreBook = () => {
    if (moreBook >= filteredData.length) {
      setMoreBook(16);
      scrollToTop();
    } else {
      setMoreBook((book) => book + 20);
    }
  };
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  if (!bookData) return <div>Loading...</div>;
  return (
    <div className="homepage">
      <button
        className={`filter-button ${filterMenu ? "" : "active"}`}
        onClick={() => setFilterMenu(true)}
      >
        <GiHamburgerMenu size={"30px"} />{" "}
      </button>

      <SideBar
        filterGenre={filterGenre}
        setFilterGenre={setFilterGenre}
        filterMenu={filterMenu}
        setFilterMenu={setFilterMenu}
        setFormat={setFormat}
        setFilteredData={setFilteredData}
        filteredData={filteredData}
        bookData={bookData}
        setBookData={setBookData}
        searchBook={searchBook}
        setSearchBook={setSearchBook}
      />

      <div className="books-container">
        <div className={`books ${filterMenu ? "" : "active"}`}>
          {format === "All"
            ? filteredData.slice(0, moreBook).map((item, index) => (
                <div key={index}>
                  <BookCard
                    title={item.title}
                    authors={item.authors}
                    image={item.image_url}
                    description={item.description}
                    rating={item.rating}
                    genres={item.genres}
                  />{" "}
                </div>
              ))
            : filteredData
                .slice(0, moreBook)
                .filter((a) => a.format !== format)
                .map((item) => (
                  <BookCard
                    title={item.title}
                    authors={item.authors}
                    image={item.image_url}
                    description={item.description}
                    rating={item.rating}
                    genres={item.genres}
                  />
                ))}
        </div>
        <button className="button-morebook" onClick={() => getMoreBook()}>
          More book
        </button>
      </div>
    </div>
  );
};

export default HomePage;
