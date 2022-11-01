import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import apiConfig from "../../api/apiConfig";
import tmdbApi from "../../api/defineTmdbApi";

export default function CastsList(props) {
  const { id, category } = props;
  const [castList, setCastList] = useState([]);
  useEffect(() => {
    (async () => {
      const castsList = await tmdbApi.credits(category, id);
      setCastList(castsList.cast.slice(0, 5));
    })();
  }, [category, id]);
  return (
    <>
      {castList.map((item) => (
        <Link
          to={`/actor/${item.credit_id}`}
          key={item.id}
          className="detail-movie__cast-item"
        >
          <div className="detail-movie__cast-item-img">
            <img
              src={
                item.profile_path !== null
                  ? apiConfig.w500Image(item.profile_path)
                  : "https://via.placeholder.com/90x160"
              }
              alt={item.name}
            />
          </div>
          <div className="detail-movie__cast-item-actor">{item.name}</div>
        </Link>
      ))}
    </>
  );
}
