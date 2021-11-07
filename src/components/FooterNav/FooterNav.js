import React from 'react';
import { Link } from 'react-router-dom';
import classes from './FooterNav.module.scss';
import profileImage from '../../assets/profile.png';
import home from '../../assets/home.svg';

const FooterNav = () => {
  return (
    <footer className={classes.footer}>
      <div>
        <Link to="/home">
          <img className={classes.homeImage} src={home} alt="" />
        </Link>
      </div>
      <div>
        <Link to="/liked">
          <img className={classes.profileImage} src={profileImage} alt="" />
        </Link>
      </div>
    </footer>
  );
};

export default FooterNav;
