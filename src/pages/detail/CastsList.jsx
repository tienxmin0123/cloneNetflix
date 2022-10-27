import React, { useEffect, useState } from "react";
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
        <div className="detail-movie__cast-item" key={item.id}>
          <div className="detail-movie__cast-item-img">
            <img src={apiConfig.w500Image(item.profile_path)} alt={item.name} />
          </div>
          <div className="detail-movie__cast-item-actor">{item.name}</div>
        </div>
      ))}
    </>
  );
}
