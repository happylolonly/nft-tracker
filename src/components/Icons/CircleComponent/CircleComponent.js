import React from 'react';
import circleLogo from '../../../assets/Avatar.png';
import classes from './CircleComponent.module.scss';

const CircleComponent = () => {
  return (
    <div className={classes.circleImage}>
      <img src={circleLogo} alt="" />
    </div>
  );
};

export default CircleComponent;
