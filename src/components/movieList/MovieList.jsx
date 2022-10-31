import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import tmdbApi from "../../api/defineTmdbApi";
import MovieCard from "../movieCard/MovieCard";
import "../movieList/movieList.scss";

export default function MovieList(props) {
  const { category, type, id } = props;
  const [dataMovie, setDataMovie] = useState(null);
  // const [slideShow, setSlideShow] = useState(5);
  // useEffect(() => {
  //   (() => {
  //     const clientWidth = document.querySelector("body").clientWidth;
  //     if (clientWidth > 0 && clientWidth < 480) {
  //       setSlideShow(2);
  //     } else if (clientWidth >= 480 && clientWidth < 768) {
  //       setSlideShow(4);
  //     }
  //   })();
  // }, []);
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
      <Swiper
        grabCursor={true}
        spaceBetween={10}
        slidesPerView={"auto"}
        className="card__swiper"
      >
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
