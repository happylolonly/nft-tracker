import React, { useState, useRef, useEffect } from 'react';
import classes from './BurgerBtn.module.scss';

const BurgerBtn = ({ onLogout }) => {
  const ref = useRef(null);
  const [showMenu, setShowMenu] = useState(false);
  const menuShowHandler = () => {
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    const handleClick = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        console.log(false);
        setShowMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClick);

    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [ref]);

  return (
    <>
      <div onClick={menuShowHandler} className={classes.burgerBtn}>
        <span className={classes.burgerDot}></span>
        <span className={classes.burgerDot}></span>
        <span className={classes.burgerDot}></span>
      </div>
      {showMenu && (
        <div className={classes.modalWrapper}>
          <div className={classes.footerMenu} ref={ref}>
            <span onClick={onLogout} className={classes.footerMenuLink}>
              Exit
            </span>
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
