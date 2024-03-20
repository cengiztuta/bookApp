import React, { useState } from "react";
import "./BookDetail.css";
import activeStarImage from "../assets/active-star.png";
import inactiveStarImage from "../assets/star.png";
import { useParams } from "react-router-dom";
import { useData } from "../Context/DataContext";

const BookDetail = () => {
  const { bookData } = useData();
  const { bookTitle } = useParams();
  const [expanded, setExpanded] = useState(false);
  const decodedBookTitle = decodeURIComponent(bookTitle);
  const toggleExpand = () => {
    setExpanded(!expanded);
  };
  const selectedBook = bookData.find(
    (book) => book.title.toLowerCase() === decodedBookTitle.toLowerCase()
  );
  const initialText = (
    <a>
      {" "}
      {selectedBook?.description.split(" ").slice(0, 100).join(" ") + "  ..."}
    </a>
  );
  const expandedText = <a>{selectedBook?.description} </a>;
  const maxStars = 5;
  const activeStars = Math.min(Math.max(0, selectedBook?.rating), maxStars);
  const inactiveStars = maxStars - activeStars;
  if (!selectedBook) {
    return <div>Kitap bulunamadı.</div>;
  }
  return (
    <div className="bookDetail">
      <div className="detail-container">
        <div className="book-image">
          <img src={selectedBook.image_url} />
        </div>{" "}
        <div className="book-details">
          <h1>{selectedBook.title}</h1>
          <h3>{selectedBook.authors} </h3>
          <div className="customer-text">
            {expanded ? expandedText : initialText}
            <a onClick={toggleExpand} className="more-less-button">
              {expanded ? "less " : "more"}
            </a>
          </div>
          <div className="features">
            <p>
              <b>Genres : </b>
              {selectedBook.genres}
            </p>
            <p>
              <b>Num pages : </b>
              {selectedBook.num_pages}
            </p>
            <p>
              <b>Format : </b>
              {selectedBook.format}
            </p>{" "}
            <p>
              <b>Edition : </b>
              {selectedBook.edition}
            </p>
          </div>

          <div className="book-detail-rating-container">
            <div>
              {Array.from({ length: activeStars.toFixed() }, (_, index) => (
                <img
                  key={`active-star-${index}`}
                  src={activeStarImage}
                  alt="Active Star"
                  className="book-detail-star"
                />
              ))}
              {Array.from({ length: inactiveStars.toFixed() }, (_, index) => (
                <img
                  key={`inactive-star-${index}`}
                  src={inactiveStarImage}
                  alt="Inactive Star"
                  className="book-detail-star"
                />
              ))}{" "}
            </div>
            <p className="book-detail-rating-number">{selectedBook.rating}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
{
  /* <div
        style={{
          height: "450px",
          width: "450px",
          background: "green",
          backgroundSize: "cover",
        }}
      >
        <img src={selectedBook.image_url} />
      </div>
      <p>{selectedBook.authors}</p> */
}
