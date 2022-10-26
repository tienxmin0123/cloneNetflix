import React, { useEffect, useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import apiConfig from "../../api/apiConfig";
import tmdbApi, { category, movieType, tvType } from "../../api/defineTmdbApi";
import Modal, { ModalContent } from "../modal/Modal";
import "./heroSlider.scss";

export default function HeroSlider() {
  const history = useHistory();
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
          const handleModalTrailer = async () => {
            const modalTrailer = document.querySelector(`#modal__${movie.id}`);
            const listVideoTrailer = await tmdbApi.getVideos(
              category.tv,
              movie.id
            );
            if (listVideoTrailer.results.length > 0) {
              const videoTrailerSrc = apiConfig.videoTrailer(
                listVideoTrailer.results[0].key
              );
              modalTrailer
                .querySelector(".modal__content > iframe")
                .setAttribute("src", videoTrailerSrc);
            } else {
              modalTrailer
                .querySelector(".modal__content")
                .innerHTML("The movie doesn't have trailer");
            }
            modalTrailer.classList.toggle("active");
          };
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
                  {movie.title ||
                    movie.original_title ||
                    movie.name ||
                    movie.original_name}
                </h2>
                <p className="hero-slider__desc">{movie.overview}</p>
                <div className="hero-slider__btn">
                  <div
                    onClick={() => history.push("/tv/" + movie.id)}
                    className="hero-slider__links"
                  >
                    Watch now
                  </div>
                  <div
                    className="hero-slider__links"
                    onClick={handleModalTrailer}
                  >
                    Watch trailer
                  </div>
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
      {popularList.map((movie) => (
        <TrailerModal key={movie.id} movie={movie} />
      ))}
    </div>
  );
}
export const TrailerModal = (props) => {
  const iframeRef = useRef(null);
  const { movie } = props;
  const handleOnClose = () => iframeRef.current.setAttribute("src", "");
  return (
    <Modal active={false} id={`modal__${movie.id}`}>
      <ModalContent onClose={handleOnClose}>
        <iframe
          ref={iframeRef}
          width="100%"
          height="500px"
          title="trailer"
        ></iframe>
      </ModalContent>
    </Modal>
  );
};
