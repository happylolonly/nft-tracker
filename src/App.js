import "./App.scss";
import React from "react";

import { Switch, Route } from "react-router-dom";
import LikedNfts from "pages/LikedNfts/LikedNfts";
import HomePage from "./pages/HomePage/HomePage";
import HeaderComponent from "./components/Header/HeaderComponent";
import Login from "./pages/Login/Login";

function App() {


  return (
    <div className="App">
      {/*<HeaderComponent />*/}
      <Switch>
        <Route exact path="/home" component={HomePage} />
        <Route exact path="/login" component={Login} />
        <Route path="/liked">
          <LikedNfts />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
