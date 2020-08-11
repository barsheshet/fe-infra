import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AppLayout } from "./components/AppLayout";
import { LoginForm } from "./components/LoginForm";
import { AuthRoute } from "./components/AuthRoute";

function App() {
  return (
    <Router>
      <Switch>
        <AuthRoute path="/home">
          <AppLayout />
        </AuthRoute>
        <Route path="/login">
          <LoginForm />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
