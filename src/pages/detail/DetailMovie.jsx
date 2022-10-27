import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiConfig from "../../api/apiConfig";
import tmdbApi from "../../api/defineTmdbApi";
import MovieList from "../../components/movieList/MovieList";
import CastsList from "./CastsList";
import "./detail.scss";
import TrailerList from "./TrailerList";

export default function DetailMovie() {
  const { category, id } = useParams();
  const [video, setVideo] = useState(null);
  useEffect(() => {
    (async () => {
      const videoDetail = await tmdbApi.detail(category, id, { params: {} });
      setVideo(videoDetail);
      window.scrollTo(0, 0);
    })();
  }, [category, id]);

  return (
    <>
      {video && (
        <div className="detail-movie">
          <div
            className="detail-movie__banner"
            style={{
              backgroundImage: `url(${apiConfig.originalImage(
                video.backdrop_path || video.poster_path
              )})`,
            }}
          >
            <div className="container">
              <div className="detail-movie__wrap">
                <div className="detail-movie__thumbnail">
                  <img
                    src={apiConfig.w500Image(
                      video.poster_path || video.backdrop_path
                    )}
                    alt={video.title || video.original_title}
                  />
                </div>
                <div className="detail-movie__info">
                  <h2 className="detail-movie__title">
                    {video.title || video.original_title}
                  </h2>
                  <div className="detail-movie__genres">
                    {video.genres.map((x) => (
                      <div className="detail-movie__genres-item" key={x.id}>
                        {x.name}
                      </div>
                    ))}
                  </div>
                  <p className="detail-movie__desc">{video.overview}</p>
                  <div className="detail-movie__cast">
                    <span>Casts</span>
                    <div className="detail-movie__cast-list">
                      <CastsList id={id} category={category} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="detail-movie__trailer">
            <TrailerList id={id} category={category} />
          </div>
          <div className="movie">
            <div className="movie__list">
              <h2 className="movie__name">Similar</h2>
              <MovieList id={id} category={category} type="similar" />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
