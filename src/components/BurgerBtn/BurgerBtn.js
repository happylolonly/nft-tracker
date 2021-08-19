import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import classes from './BurgerBtn.module.scss';

const BurgerBtn = ({ onLogout }) => {
  const [showMenu, setShowMenu] = useState(false);
  const menuShowHandler = () => {
    setShowMenu(!showMenu);
  };
  return (
    <>
      <div onClick={menuShowHandler} className={classes.burgerBtn}>
        <span className={classes.burgerDot}></span>
        <span className={classes.burgerDot}></span>
        <span className={classes.burgerDot}></span>
      </div>
      {showMenu && (
        <div className={classes.modalWrapper}>
          <div className={classes.footerMenu}>
            <span onClick={onLogout} className={classes.footerMenuLink}>
              Exit
            </span>
            <Link to="/liked" className={classes.footerMenuLink}>
              Liked
            </Link>
            <span onClick={menuShowHandler} className={classes.footerMenuLink}>
              Close
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default BurgerBtn;
