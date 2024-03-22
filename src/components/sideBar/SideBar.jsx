import React, { useState } from "react";
import "./SideBar.css";
import { AiOutlineClose } from "react-icons/ai";
import { useData } from "../../Context/DataContext";

const SideBar = () => {
  const {
    bookData,
    setFilteredData,
    filteredData,
    setFormat,
    setFilterMenu,
    filterMenu,
    currentUser,
  } = useData();
  const [dropdownMenus, setDropdownMenus] = useState({
    format: false,
    sort: false,
    genres: false,
  });
  const filteredDataGenre = (genre) => {
    const filteredBooks = bookData.filter((b) => {
      const { genres } = b;
      const lowercaseBook = genre.toLowerCase();
      return genres.toLowerCase().includes(lowercaseBook);
    });
    setFormat("All");
    setFilteredData(filteredBooks);
  };

  const sortBook = () => {
    const sortedData = [...filteredData].sort((a, b) => {
      const titleA = a.title;
      const titleB = b.title;

      return titleB.localeCompare(titleA);
    });
    setFilteredData(sortedData);
  };
  const sortBookZA = () => {
    const sortedData = [...filteredData].sort((a, b) => {
      const benefitA = a.title;
      const benefitB = b.title;

      return benefitA.localeCompare(benefitB);
    });

    setFilteredData(sortedData);
  };

  const sortByRatingLowtoHigh = () => {
    const sortedData = [...filteredData].sort((a, b) => {
      const benefitA = a.rating;
      const benefitB = b.rating;
      return benefitA - benefitB;
    });

    setFilteredData(sortedData);
  };
  const sortByRatingHightoLow = () => {
    const sortedData = [...filteredData].sort((a, b) => {
      const benefitA = a.rating;
      const benefitB = b.rating;
      return benefitB - benefitA;
    });

    setFilteredData(sortedData);
  };

  const showDropdown = (menuKey) => {
    setDropdownMenus((prevMenus) => ({
      ...prevMenus,
      [menuKey]: !prevMenus[menuKey],
    }));
  };
  return (
    <div className={`sidebar ${filterMenu ? "open" : ""}`}>
      <button
        className="sidebar-close-button"
        onClick={() => setFilterMenu(false)}
      >
        <AiOutlineClose size={"30px"} />
      </button>{" "}
      <div className="sidebar-container">
        <button
          className="filter-buttons"
          onClick={() => {
            setFilteredData(bookData), setFormat("All");
          }}
        >
          Show All Books{" "}
        </button>
        <div
          className={`format-container ${dropdownMenus.format ? "active" : ""}`}
        >
          <button
            className="filter-buttons"
            onClick={() => showDropdown("format")}
          >
            Format
          </button>

          <div
            className={`button-container ${
              dropdownMenus.format ? "active" : ""
            }`}
          >
            <button
              className={`menu-button ${dropdownMenus.format ? "active" : ""}`}
              onClick={() => setFormat("All")}
            >
              All
            </button>

            <button
              className={`menu-button ${dropdownMenus.format ? "active" : ""}`}
              onClick={() => setFormat("Paperback")}
            >
              Hard Cover
            </button>

            <button
              className={`menu-button ${dropdownMenus.format ? "active" : ""}`}
              onClick={() => setFormat("Hardcover")}
            >
              PaperBack
            </button>
          </div>
        </div>

        <div className={`sort-container ${dropdownMenus.sort ? "active" : ""}`}>
          <button
            className="filter-buttons"
            onClick={() => showDropdown("sort")}
          >
            {" "}
            Sort book
          </button>

          <div
            className={`button-container ${dropdownMenus.sort ? "active" : ""}`}
          >
            {" "}
            <button
              className={`menu-button ${dropdownMenus.sort ? "active" : ""}`}
              onClick={() => sortBook()}
            >
              A-Z
            </button>{" "}
            <button
              className={`menu-button ${dropdownMenus.sort ? "active" : ""}`}
              onClick={() => sortBookZA()}
            >
              Z-A
            </button>{" "}
            <button
              className={`menu-button ${dropdownMenus.sort ? "active" : ""}`}
              onClick={() => sortByRatingLowtoHigh()}
            >
              LowtoHigh
            </button>{" "}
            <button
              className={`menu-button ${dropdownMenus.sort ? "active" : ""}`}
              onClick={() => sortByRatingHightoLow()}
            >
              High to Low
            </button>
          </div>
        </div>

        <div
          className={`genres-container ${dropdownMenus.genres ? "active" : ""}`}
        >
          <button
            className="filter-buttons"
            onClick={() => showDropdown("genres")}
          >
            {" "}
            Genres
          </button>
          <div
            className={`button-container ${
              dropdownMenus.genres ? "active" : ""
            }`}
          >
            <button
              className={`menu-button ${dropdownMenus.genres ? "active" : ""}`}
              onClick={() => filteredDataGenre("Science")}
            >
              Science
            </button>
            <button
              className={`menu-button ${dropdownMenus.genres ? "active" : ""}`}
              onClick={() => filteredDataGenre("Classics")}
            >
              Classics
            </button>{" "}
            <button
              className={`menu-button ${dropdownMenus.genres ? "active" : ""}`}
              onClick={() => filteredDataGenre("Young Adult")}
            >
              Young Adult
            </button>{" "}
            <button
              className={`menu-button ${dropdownMenus.genres ? "active" : ""}`}
              onClick={() => filteredDataGenre("Fiction")}
            >
              Fiction
            </button>{" "}
            <button
              className={`menu-button ${dropdownMenus.genres ? "active" : ""}`}
              onClick={() => filteredDataGenre("Fantasy")}
            >
              Fantasy
            </button>{" "}
            <button
              className={`menu-button ${dropdownMenus.genres ? "active" : ""}`}
              onClick={() => filteredDataGenre("Childrens")}
            >
              Childrens
            </button>{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;