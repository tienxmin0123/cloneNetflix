import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import apiConfig from "../../api/apiConfig";
import tmdbApi from "../../api/defineTmdbApi";

export default function CastsList(props) {
  const history = useHistory();
  const { id, category } = props;
  const [castList, setCastList] = useState([]);
  console.log(history);
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
        </div>
      ))}
    </>
  );
}
