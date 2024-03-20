import React from "react";
import "./bookCard.css";
import activeStarImage from "../../assets/active-star.png";
import inactiveStarImage from "../../assets/star.png";
import { useNavigate } from "react-router-dom";
const BookCard = (props) => {
  const navigate = useNavigate();
  const maxStars = 5;
  const activeStars = Math.min(Math.max(0, props.rating), maxStars);
  const inactiveStars = maxStars - activeStars;
  return (
    <div className="bookcard">
      <img className="img" src={props.image} />{" "}
      <div className="descp">
        <h1>{props.title}</h1>
        <p className="descp-text">
          {props.description?.split(" ").length >= 10
            ? props.description?.split(" ").slice(0, 41).join(" ") + " ..."
            : props.description}
        </p>
        <p>{props.genres}</p>
        <h3 className="author">{props.authors}</h3>
      </div>
      <button
        onClick={() => navigate(`/${encodeURIComponent(props.title)}`)}
        className="readmore"
      >
        Book Detail
      </button>
      <div className="bookcard-footer">
        <div className="rating-container">
          <div>
            {Array.from({ length: activeStars.toFixed() }, (_, index) => (
              <img
                key={`active-star-${index}`}
                src={activeStarImage}
                alt="Active Star"
                className="star"
              />
            ))}

            {Array.from({ length: inactiveStars.toFixed() }, (_, index) => (
              <img
                key={`inactive-star-${index}`}
                src={inactiveStarImage}
                alt="Inactive Star"
                className="star"
              />
            ))}
          </div>
          <p className="rating-text">{props.rating}</p>
        </div>
        <p className="price"> Price : Free</p>
      </div>
    </div>
  );
};

export default BookCard;
