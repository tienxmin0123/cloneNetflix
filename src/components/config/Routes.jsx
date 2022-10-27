import React from "react";

import { Route, Switch } from "react-router-dom";
import DetailMovie from "../../pages/detail/DetailMovie";
import HomePage from "../../pages/HomePage";
import MoiveListByCategory from "../../pages/MoiveListByCategory";
import MovieByTypeCate from "../../pages/MovieByTypeCate";

const Routes = () => {
  return (
    <Switch>
      <Route
        path="/:category/search/:keyword"
        component={MoiveListByCategory}
      />
      <Route path="/:category/type/:type" component={MovieByTypeCate} />
      <Route path="/:category/:id" component={DetailMovie} />
      <Route path="/:category" component={MoiveListByCategory} />
      <Route path="/" exact component={HomePage} />
    </Switch>
  );
};

export default Routes;
