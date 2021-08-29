import React from "react";
import { useMoralis } from "react-moralis";
import classes from "./HeaderComponent.module.scss";
import BurgerBtn from "../Icons/BurgerBtn/BurgerBtn";
import CircleComponent from "../Icons/CircleComponent/CircleComponent";
import { useLocation } from 'react-router-dom';
import RefreshIcon from '../Icons/RefreshIcon/RefreshIcon';
import FilterIcon from '../Icons/FilterIcon/FilterIcon';

const HeaderComponent = ({prev}) => {
  const location = useLocation();
  const currentRoute = location.pathname.split('/').slice(-1)[0]
  const { logout } = useMoralis();

  return (
    <header className={classes.header}>
      {currentRoute === 'home' ? (
          <div  className={classes.headerInner}>
            <RefreshIcon onClick={prev} />
            <span className={classes.mainTitle}>Tracker</span>
            <FilterIcon />
          </div>
      ) :
        <>
          <CircleComponent />
          <BurgerBtn onLogout={logout} />
        </>
      }
    </header>
  );
};

export default HeaderComponent;
