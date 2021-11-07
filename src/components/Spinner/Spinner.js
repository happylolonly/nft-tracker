import React from 'react';
import classes from './Spinner.module.scss';

const Spinner = () => (
  <div className={classes.spinnerWr}>
    <div className={classes.loader} />
  </div>
);

export default Spinner;
