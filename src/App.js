import "./App.scss";
import React from "react";

import {
  useMoralis
} from "react-moralis";
import { Switch, Route, Link } from "react-router-dom";
import LikedNfts from "pages/LikedNfts/LikedNfts";
import HomePage from "./pages/HomePage/HomePage";
import HeaderComponent from "./components/Header/HeaderComponent";

function App() {


  return (
    <div className="App">
      <HeaderComponent />
      <Switch>
        <Route exact path="/home" component={HomePage} />
        <Route path="/liked">
          <LikedNfts />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
