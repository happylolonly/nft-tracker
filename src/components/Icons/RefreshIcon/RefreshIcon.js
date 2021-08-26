import React from 'react';
import circleLogo from '../../../assets/back.png'
import classes from "./RefreshIcon.module.scss";

const RefreshIcon = () => {
  return (
    <div className={classes.imageWrapper} >
      <img src={circleLogo} alt='' />
    </div>
  )
}

export default RefreshIcon;