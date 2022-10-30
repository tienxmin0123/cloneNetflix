import React from "react";

import { Route, Switch } from "react-router-dom";
import MovieOfActor from "../../pages/actor/MovieOfActor";
import DetailMovie from "../../pages/detail/DetailMovie";
import HomePage from "../../pages/HomePage";
import MoiveListByCategory from "../../pages/MoiveListByCategory";
import MovieByTypeCate from "../../pages/MovieByTypeCate";

const Routes = () => {
  return (
    <Switch>
      <Route
        path="/watch/:category/search/:keyword"
        component={MoiveListByCategory}
      />
      <Route path="/watch/:category/type/:type" component={MovieByTypeCate} />
      <Route path="/watch/:category/:id" component={DetailMovie} />
      <Route path="/watch/:category" component={MoiveListByCategory} />
      <Route path="/actor/:id" component={MovieOfActor} />
      <Route path="/" exact component={HomePage} />
    </Switch>
  );
};

export default Routes;
