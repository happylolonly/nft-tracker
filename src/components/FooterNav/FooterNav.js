import React from "react";
import classes from './FooterNav.module.scss';
import profileImage from '../../assets/profile.png';
import tabSwiper from '../../assets/tabSwiper.png';

const FooterNav = () => {
  const goToPage = () => {
    console.log(123);
  }
  return (
    <div className={classes.footer}>
      <div onClick={goToPage}>
        <img src={tabSwiper} alt=""/>
      </div>
      <div>
        <img src={profileImage} alt=""/>
      </div>
    </div>
  )
}

export default FooterNav;