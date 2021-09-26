import './App.scss';
import React, { useEffect } from 'react';

import { Switch, Route, useHistory, Redirect } from 'react-router-dom';
import LikedNfts from 'pages/LikedNfts/LikedNfts';
import HomePage from './pages/HomePage/HomePage';
import DetailPage from './pages/DetailPage/DetailPage';
// import HeaderComponent from "./components/Header/HeaderComponent";
import Login from './pages/Login/Login';
import { useMoralis } from 'react-moralis';
import Artboard from 'pages/Artboard/Artboard';

function App() {
  const { isAuthenticated, isAuthUndefined } = useMoralis();
  const history = useHistory();

  useEffect(() => {
    if (!isAuthenticated && !isAuthUndefined) {
      history.push('/login');
    }
  }, [history, isAuthenticated, isAuthUndefined]);

  if (isAuthUndefined) {
    return null; // TODO: what to render?
  }

  return (
    <div className="App">
      <Switch>
        <Route path="/home" component={HomePage} />
        <Route path="/detail/:id" component={DetailPage} />
        <Route path="/login" component={Login} />
        <Route path="/artboard/:id" component={Artboard} />

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
