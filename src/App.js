import React from "react";
import { AppLayout } from "./components/AppLayout";
import { LoginForm } from "./components/LoginForm";

function App() {
  const isLoggedIn = false;

  return (
    <>
      {isLoggedIn && <AppLayout />}
      {!isLoggedIn && <LoginForm />}
    </>
  );
}

export default App;
