import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import tmdbApi, { category, movieType, tvType } from "../api/defineTmdbApi";
import background from "../assets/images/Netflix-bg.jpg";
import MovieByCategory from "../components/movieByCate/MovieByCategory";

export default function MoiveListByCategory() {
  const param = useParams();
  const [movieList, setMovieList] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  useEffect(() => {
    (async () => {
      let dataMovie = null;
      const params = {};
      if (param.keyword === undefined) {
        if (param.category === "movie") {
          dataMovie = await tmdbApi.getMoviesList(movieType.upcoming, {
            params,
          });
        } else {
          dataMovie = await tmdbApi.getTvList(tvType.popular, { params });
        }
      } else {
        const params = {
          query: param.keyword,
        };
        dataMovie = await tmdbApi.search(param.category, { params });
      }
      setTotalPage(dataMovie.total_pages);
      setMovieList(dataMovie.results);
      window.scrollTo(0, 0);
    })();
  }, [param.category, param.keyword]);

  const handleShowMoreMovie = async () => {
    let dataMovie = null;
    if (param.keyword === undefined) {
      const params = {
        page: page + 1,
      };
      if (param.category === "movie") {
        dataMovie = await tmdbApi.getMoviesList(movieType.upcoming, {
          params,
        });
      } else {
        dataMovie = await tmdbApi.getTvList(tvType.popular, { params });
      }
    } else {
      const params = {
        query: param.keyword,
      };
      dataMovie = await tmdbApi.search(param.category, { params });
    }
    setMovieList([...movieList, ...dataMovie.results]);
    setPage(page + 1);
  };
  return (
    <div className="category">
      <CategoryHeader>
        {param.category === category.movie ? "Movies" : "Tv Series"}
      </CategoryHeader>
      <div className="container">
        <MovieByCategory
          keyword={param.keyword}
          category={param.category}
          movieList={movieList}
        />
      </div>
      {page < totalPage ? (
        <div className="category__btn-more" onClick={handleShowMoreMovie}>
          <span>Show more</span>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export const CategoryHeader = (props) => {
  return (
    <div
      className="category__header"
      style={{ background: `url(${background})` }}
    >
      <h2 className="category__header-title">{props.children}</h2>
    </div>
  );
};
