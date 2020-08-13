import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AppLayout } from "./components/AppLayout";
import { Login } from "./screens/Login";
import { AuthRoute } from "./components/AuthRoute";

function App() {
  return (
    <Router>
      <Switch>
        <AuthRoute path="/" exact>
          <AppLayout />
        </AuthRoute>
        <Route path="/login">
          <Login />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
