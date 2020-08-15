import React, { useReducer, createContext } from "react";
import produce from "immer";

export const actions = {
  SET_JWT: "SET_JWT",
};

export const UserContext = createContext();

const initialState = {
  jwt: null,
};

const reducer = produce((draft, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case actions.SET_JWT:
      draft.jwt = action.jwt;
  }
}, {});

export const UserContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <UserContext.Provider value={[state, dispatch]}>
      {props.children}
    </UserContext.Provider>
  );
};
