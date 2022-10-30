import React from "react";
import { ImPlay2 } from "react-icons/im";
import { Link } from "react-router-dom";
import apiConfig from "../../api/apiConfig";
import "../movieCard/movieCard.scss";

export default function MovieCard(props) {
  const { movie, category } = props;
  return (
    <>
      {movie.poster_path !== null || movie.backdrop_path !== null ? (
        <Link className="card" to={`/watch/${category}/${movie.id}`}>
          <div className="card__content">
            <div className="card__thumbnail">
              <img
                src={
                  movie.poster_path !== null || movie.backdrop_path !== null
                    ? apiConfig.w500Image(
                        movie.poster_path || movie.backdrop_path
                      )
                    : "https://via.placeholder.com/250x350"
                }
                alt={
                  movie.title ||
                  movie.original_title ||
                  movie.name ||
                  movie.original_name
                }
              />
            </div>
            <h3 className="card__title">
              {movie.title ||
                movie.original_title ||
                movie.name ||
                movie.original_name}
            </h3>
          </div>
          <div className="card__btn">
            <ImPlay2 />
          </div>
        </Link>
      ) : (
        ""
      )}
    </>
  );
}
