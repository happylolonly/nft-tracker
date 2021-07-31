import "./App.scss";
import React, { useEffect } from "react";

import { Switch, Route, Redirect, useHistory } from "react-router-dom";
import LikedNfts from "pages/LikedNfts/LikedNfts";
import HomePage from "./pages/HomePage/HomePage";
import HeaderComponent from "./components/Header/HeaderComponent";
import Login from "./pages/Login/Login";
import { useMoralis } from "react-moralis";

function App() {
  const moralisData = useMoralis();
  const history = useHistory();

  useEffect(() => {
    if (!moralisData.isAuthenticated) {
      history.push("/login");
    }
  }, [history, moralisData.isAuthenticated]);

  console.log(moralisData.isAuthenticating, moralisData);

  if (moralisData.isAuthUndefined) {
    return null;
  }

  // if (!rest.isAuthenticated) {
  //   return <Redirect to="/login" />;
  // }

  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/login" component={Login} />

        <Route path="/liked">
          <LikedNfts />
        </Route>
      </Switch>
      <HeaderComponent />
    </div>
  );
}

export default App;
