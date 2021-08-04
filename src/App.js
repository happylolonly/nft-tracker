import "./App.scss";
import React, { useEffect } from "react";

import { Switch, Route, useHistory, Redirect } from "react-router-dom";
import LikedNfts from "pages/LikedNfts/LikedNfts";
import HomePage from "./pages/HomePage/HomePage";
import HeaderComponent from "./components/Header/HeaderComponent";
import Login from "./pages/Login/Login";
import { useMoralis } from "react-moralis";

function App() {
  const { isAuthenticated, isAuthUndefined } = useMoralis();
  const history = useHistory();

  useEffect(() => {
    if (!isAuthenticated) {
      history.push("/login");
    }
  }, [history, isAuthenticated]);

  if (isAuthUndefined) {
    return null; // TODO: what to render?
  }

  return (
    <div className="App">
      <Switch>
        <Route path="/home" component={HomePage} />
        <Route path="/login" component={Login} />

        <Route path="/liked">
          <LikedNfts />
        </Route>

        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
