import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "../search/searchMovie.scss";

export default function SearchMovie(props) {
  const history = useHistory();

  const [keyword, setKeyword] = useState(props.keyword ? props.keyword : "");
  const pushWord = useCallback(() => {
    if (keyword.trim().length > 0) {
      history.push(`/${props.category}/search/${keyword}`);
    }
  }, [keyword, history, props.category]);

  useEffect(() => {
    const handleEnterKey = (e) => {
      e.preventDefault();
      if (e.keyCode === 13) {
        pushWord();
      }
    };
    document.addEventListener("keyup", handleEnterKey);
    return () => {
      document.removeEventListener("keyup", handleEnterKey);
    };
  }, [keyword, pushWord]);

  return (
    <div className="category__search">
      <input
        type="text"
        value={keyword}
        className="category__search-input"
        placeholder="Please Enter Keywords"
        onChange={(e) => setKeyword(e.target.value)}
      />
      <span onClick={() => pushWord()}>search</span>
    </div>
  );
}
