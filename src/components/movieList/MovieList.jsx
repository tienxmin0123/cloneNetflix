import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import tmdbApi from "../../api/defineTmdbApi";
import MovieCard from "../movieCard/MovieCard";
import "../movieList/movieList.scss";

export default function MovieList(props) {
  const { category, type, id } = props;
  const [dataMovie, setDataMovie] = useState(null);
  useEffect(() => {
    (async () => {
      let response = null;
      const params = {};
      if (type === "similar") {
        response = await tmdbApi.similar(category, id);
      } else {
        category === "movie"
          ? (response = await tmdbApi.getMoviesList(type, { params }))
          : (response = await tmdbApi.getTvList(type, { params }));
      }
      setDataMovie(response.results);
    })();
  }, [category, type, id]);
  return (
    <>
      <Swiper grabCursor={true} spaceBetween={10} slidesPerView={5}>
        {dataMovie &&
          dataMovie.map((movie) => (
            <SwiperSlide key={movie.id}>
              <MovieCard movie={movie} category={category} />
            </SwiperSlide>
          ))}
      </Swiper>
    </>
  );
}
