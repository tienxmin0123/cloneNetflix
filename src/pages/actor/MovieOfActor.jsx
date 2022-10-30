import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import tmdbApi from "../../api/defineTmdbApi";
import MovieCard from "../../components/movieCard/MovieCard";
import "../actor/movieOfActor.scss";

export default function MovieOfActor() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  useEffect(() => {
    (async () => {
      const params = {};
      const response = await tmdbApi.getCredits(id, params);
      setData(response.person);
    })();
  }, [id]);
  return (
    <div className="actors">
      <div className="container">
        <h2 className="actors__info">
          Featured movies of the actor:{" "}
          <span>{data.name || data.original_name}</span>
        </h2>
        <div className="actors__list-movies">
          <ActorMovies id={data.id} />
        </div>
      </div>
    </div>
  );
}

export const ActorMovies = (props) => {
  const [movieList, setMovieList] = useState([]);
  console.log(movieList);
  useEffect(() => {
    (async () => {
      const params = {};
      const response = await tmdbApi.getActor(props.id, params);
      setMovieList(response.cast);
    })();
  }, [props.id]);
  return (
    <>
      {movieList.map((item) => (
        <MovieCard movie={item} key={item.id} category="movie" />
      ))}
    </>
  );
};
