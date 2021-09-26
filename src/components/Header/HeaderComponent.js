import React, { useState } from 'react';
import { useMoralis } from 'react-moralis';
import classes from './HeaderComponent.module.scss';
import BurgerBtn from '../Icons/BurgerBtn/BurgerBtn';
import CircleComponent from '../Icons/CircleComponent/CircleComponent';
import { useLocation } from 'react-router-dom';
import RefreshIcon from '../Icons/RefreshIcon/RefreshIcon';
import FilterIcon from '../Icons/FilterIcon/FilterIcon';
import Filter from '../Filters/Filter';

const HeaderComponent = ({ prev, getItems, index }) => {
  const location = useLocation();
  const [{ showFilters }, setState] = useState({ showFilters: false });
  const currentRoute = location.pathname.split('/').slice(-1)[0];
  const { logout } = useMoralis();
  const filterOpenHandler = (value = !showFilters) => {
    setState((prevState) => ({ ...prevState, showFilters: value }));
  };

  return (
    <header className={classes.header}>
      {currentRoute === 'home' ? (
        <div className={classes.headerInner}>
          {prev && index > 0 && <RefreshIcon onClick={prev} />}
          <span className={classes.mainTitle}>Tracker</span>
          <FilterIcon
            onClick={() => {
              filterOpenHandler();
            }}
          />
          <Filter
            filterOpenHandler={filterOpenHandler}
            showFilters={showFilters}
            getItems={getItems}
            setFilter={setState}
          />
        </div>
      ) : (
        <>
          {/* <CircleComponent /> */}
          <BurgerBtn onLogout={logout} />
        </>
      )}
    </header>
  );
};

export default HeaderComponent;
