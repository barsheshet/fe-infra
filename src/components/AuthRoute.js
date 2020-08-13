import React from "react";
import { Route, Redirect } from "react-router-dom";

const isAuthenticated = false;
export const AuthRoute = ({ children, ...rest }) => {
  return (
    <Route
      {...rest}
      render={({ location }) => {
        console.log(location);
        if (isAuthenticated) {
          return children;
        }
        return (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
};
