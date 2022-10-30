import React, { useEffect, useRef, useState } from "react";
import apiConfig from "../../api/apiConfig";
import tmdbApi from "../../api/defineTmdbApi";

export default function TrailerList(props) {
  const { id, category } = props;
  const [trailerList, setTrailerList] = useState(null);
  const [height, setHeight] = useState("");
  const videoRef = useRef(null);
  useEffect(() => {
    const clearTimeout = setTimeout(() => {
      if (videoRef.current !== null) {
        const clientHeght = (videoRef.current.offsetWidth * 9) / 16 + "px";
        setHeight(clientHeght);
      }
    }, 500);
    return () => clearTimeout;
  }, []);
  useEffect(() => {
    (async () => {
      const trailerList = await tmdbApi.getVideos(category, id, { params: {} });
      if (
        Array.isArray(trailerList.results) &&
        trailerList.results.length > 0 &&
        trailerList.results.length <= 5
      ) {
        return setTrailerList(trailerList.results);
      } else if (
        Array.isArray(trailerList.results) &&
        trailerList.results.length > 5
      ) {
        setTrailerList(trailerList.results.splice(0, 5));
      } else {
        setTrailerList([]);
      }
    })();
  }, [id, category]);
  return (
    <>
      {trailerList &&
        trailerList.map((movie) => (
          <div className="detail-movie__trailer-item" key={movie.id}>
            <h2 className="detail-movie__trailer-title">{movie.name}</h2>
            <div className="detail-movie__trailer-vid">
              <iframe
                src={apiConfig.videoTrailer(movie.key)}
                ref={videoRef}
                width="100%"
                height={height.length > 0 ? height : "600px"}
                title="video"
              ></iframe>
            </div>
          </div>
        ))}
    </>
  );
}
