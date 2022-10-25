import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import apiConfig from "../../api/apiConfig";
import tmdbApi, { movieType, tvType } from "../../api/defineTmdbApi";
import "./heroSlider.scss";

export default function HeroSlider() {
  const [popularList, setPopularList] = useState([]);
  useEffect(() => {
    (async () => {
      const params = { page: 1 };
      try {
        const data = await tmdbApi.getTvList(tvType.popular, {
          params,
        });
        setPopularList(data.results.splice(0, 5));
      } catch (error) {
        console.log("failed to fetch api to tmdb", error);
      }
    })();
  }, []);
  return (
    <div className="hero-slider">
      <Swiper
        // autoplay={{
        //   delay: 1000,
        //   disableOnInteraction: false,
        // }}
        grabCursor={true}
        spaceBetween={0}
        slidesPerView={1}
        modules={[Autoplay]}
      >
        {popularList.map((movie) => {
          const background = apiConfig.originalImage(
            movie.backdrop_path ? movie.backdrop_path : movie.poster_path
          );
          return (
            <SwiperSlide
              className="hero-slider__item"
              key={movie.id}
              style={{ backgroundImage: `url(${background})` }}
            >
              <div className="hero-slider__content">
                <h2 className="hero-slider__title">
                  {movie.name || movie.original_name}
                </h2>
                <p className="hero-slider__desc">{movie.overview}</p>
                <div className="hero-slider__btn">
                  <Link
                    className="hero-slider__links"
                    to={{
                      pathname: "",
                    }}
                  >
                    Watch now
                  </Link>
                  <Link
                    className="hero-slider__links"
                    to={{
                      pathname: "",
                    }}
                  >
                    Watch trailer
                  </Link>
                </div>
              </div>
              <div className="hero-slider__thumbnail">
                <img
                  src={apiConfig.w500Image(movie.poster_path)}
                  alt={movie.title}
                />
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
