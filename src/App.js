import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Login } from "./screens/Login";
import { Register } from "./screens/Register";
import { VerifyEmail } from "./screens/VerifyEmail";
import { Main } from "./screens/Main";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login" exact>
          <Login />
        </Route>
        <Route path="/register" exact>
          <Register />
        </Route>
        <Route path="/verify-email" exact>
          <VerifyEmail />
        </Route>
        <Route path="/">
          <Main />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
