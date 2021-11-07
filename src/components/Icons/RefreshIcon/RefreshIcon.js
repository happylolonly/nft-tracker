import React from 'react';
import circleLogo from '../../../assets/back.png';
import classes from './RefreshIcon.module.scss';

const RefreshIcon = ({ onClick }) => {
  return (
    <div className={classes.imageWrapper} onClick={onClick}>
      <img src={circleLogo} alt="" />
    </div>
  );
};

export default RefreshIcon;
