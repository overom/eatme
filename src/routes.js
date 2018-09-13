import { Route } from "react-router-dom";
import React from "react";
import PropTypes from "prop-types";

const NewRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => <Component {...props} {...rest} />} />
);

NewRoute.propTypes = {
  component: PropTypes.func.isRequired,
  rest: PropTypes.any
};

export const AuthUserRoads = props =>
  props.roadTab.map((route, key) => (
    <NewRoute {...props} {...route} key={`#road${route.path}`} />
  ));
