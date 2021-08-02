import React from "react";
import { Link } from "react-router-dom";
import { useMoralis } from "react-moralis";
import classes from "./HeaderComponent.module.scss";
import BurgerBtn from "../BurgerBtn/BurgerBtn";
import CircleComponent from "../CircleComponent/CircleComponent";

const HeaderComponent = () => {
  const { user, logout, isAuthenticated } = useMoralis();

  // if (!isAuthenticated) {
  //   return null;
  // }

  return (
    <header className={classes.header}>
      <CircleComponent />
      <BurgerBtn onLogout={logout} />
      {/*<div className={classes.headerLink}>*/}
      {/*  <div>*/}
      {/*    {user && <h1>Welcome {user.get("username")}</h1>}*/}
      {/*    <span*/}
      {/*      onClick={() => {*/}
      {/*        logout();*/}
      {/*      }}*/}
      {/*    >*/}
      {/*      logout*/}
      {/*    </span>*/}
      {/*  </div>*/}
      {/*</div>*/}

      {/*<Link to="/home" className={classes.headerLink}>*/}
      {/*  Home*/}
      {/*</Link>*/}
      {/*<br />*/}
      
      {/*<Link to="liked" className={classes.headerLink}>*/}
      {/*  Liked*/}
      {/*</Link>*/}
    </header>
  );
};

export default HeaderComponent;
