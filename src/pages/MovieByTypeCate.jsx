import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import tmdbApi from "../api/defineTmdbApi";
import MovieByCategory from "../components/movieByCate/MovieByCategory";
import { CategoryHeader } from "./MoiveListByCategory";

export default function MovieByTypeCate() {
  const [movieList, setMovieList] = useState([]);
  const { category, type } = useParams();
  useEffect(() => {
    (async () => {
      let dataMovie = null;
      const params = {};
      if (category === "movie") {
        dataMovie = await tmdbApi.getMoviesList(type, { params });
      } else {
        dataMovie = await tmdbApi.getTvList(type, { params });
      }
      setMovieList(dataMovie.results);
    })();
  }, [category, type]);
  return (
    <div className="category">
      <CategoryHeader>
        {category === "movie"
          ? `${type.replace("_", " ")} Movie`
          : `${type.replace("_", " ")} Tv`}
      </CategoryHeader>
      <div className="container">
        <MovieByCategory category={category} movieList={movieList} />
      </div>
    </div>
  );
}
