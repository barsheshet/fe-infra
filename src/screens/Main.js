import React, { useContext, useEffect, useState } from "react";
import * as jwtDecode from "jwt-decode";
import { useMutation } from "react-query";
import { UserContext, actions } from "../context/user-context";
import { refreshToken as refreshTokenMutation } from "../api";
import { useLocation, useHistory } from "react-router-dom";
import { AppLayout } from "../components/AppLayout";

const getExpiration = (jwt) => {
  const decoded = jwtDecode(jwt);
  return decoded.exp * 1000 - Date.now();
};

export const Main = () => {
  const [autoRefresh, setAutoRefresh] = useState(null);
  const location = useLocation();
  const history = useHistory();
  const [user, dispatch] = useContext(UserContext);

  const onRefreshTokenSuccess = (data) => {
    dispatch({ type: actions.SET_JWT, jwt: data.jwt });
    setAutoRefresh(null);
    const expiration = getExpiration(data.jwt);
    setAutoRefresh(setTimeout(refreshToken, expiration - 5000));
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
      const expiration = getExpiration(user.jwt);

      if (expiration < 0) {
        refreshToken();
      }
      if (!autoRefresh) {
        setAutoRefresh(setTimeout(refreshToken, expiration - 5000));
      }
    }
    return () => setAutoRefresh(clearTimeout(autoRefresh));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!user.jwt) return "Loading....";

  return <AppLayout />;
};
