import React, { useContext, useEffect } from "react";
import * as jwtDecode from "jwt-decode";
import { useMutation } from "react-query";
import { UserContext, actions } from "../context/user-context";
import { refreshToken as refreshTokenMutation } from "../api";
import { useLocation, useHistory } from "react-router-dom";
import { AppLayout } from "../components/AppLayout";

export const Main = () => {
  const location = useLocation();
  const history = useHistory();
  const [user, dispatch] = useContext(UserContext);

  const onRefreshTokenSuccess = (data) => {
    dispatch({ type: actions.SET_JWT, jwt: data.jwt });
  };

  const onRefreshTokenError = () => {
    history.push("login", { from: location.pathname });
  };

  const [refreshToken] = useMutation(refreshTokenMutation, {
    onSuccess: onRefreshTokenSuccess,
    onError: onRefreshTokenError,
  });

  useEffect(() => {
    if (!user.jwt) {
      refreshToken();
    } else {
      const decoded = jwtDecode(user.jwt);
      const isExpired = Date.now() >= decoded.exp * 1000;
      if (isExpired) {
        refreshToken();
      }
    }
  }, []);

  return <AppLayout />;
};
