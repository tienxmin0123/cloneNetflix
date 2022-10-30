import React from "react";
import { Link } from "react-router-dom";
import { category, movieType, tvType } from "../api/defineTmdbApi";
import HeroSlider from "../components/heroSlider/HeroSlider";
import MovieList from "../components/movieList/MovieList";
const dataHomePage = [
  {
    id: 1,
    name: "Popular movie",
    category: category.movie,
    type: movieType.popular,
    link: "/movie",
  },
  {
    id: 2,
    name: "Top rated movie",
    category: category.movie,
    type: movieType.top_rated,
    link: "/movie",
  },
  {
    id: 3,
    name: "Popular series",
    category: category.tv,
    type: tvType.popular,
    link: "/tv",
  },
  {
    id: 4,
    name: "Top rated series",
    category: category.tv,
    type: tvType.top_rated,
    link: "/tv",
  },
  {
    id: 6,
    name: "Upcoming movie",
    category: category.movie,
    type: movieType.upcoming,
    link: "/movie",
  },
  {
    id: 7,
    name: "On the air series",
    category: category.tv,
    type: tvType.on_the_air,
    link: "/tv",
  },
];

export default function HomePage() {
  return (
    <div className="main">
      <HeroSlider />
      <div className="movie">
        <div className="container">
          {dataHomePage.map((item) => (
            <div className="movie__list" key={item.id}>
              <div className="movie__top">
                <h2 className="movie__name">{item.name}</h2>
                <Link
                  to={`/watch/${item.category}/type/${item.type}`}
                  className="movie__btn"
                >
                  View more
                </Link>
              </div>
              <div className="movie__content">
                <MovieList category={item.category} type={item.type} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
