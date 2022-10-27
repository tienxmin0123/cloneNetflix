import React from "react";
import "../movieByCate/movieByCategory.scss";
import MovieCard from "../movieCard/MovieCard";
import SearchMovie from "../search/SearchMovie";

export default function MovieByCategory(props) {
  const { category, movieList, keyword } = props;

  return (
    <>
      <div className="category__search">
        <SearchMovie keyword={keyword} category={category} />
      </div>
      <div className="category__list">
        {movieList.map((movie) => (
          <MovieCard category={category} movie={movie} key={movie.id} />
        ))}
      </div>
    </>
  );
}
