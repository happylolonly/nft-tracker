import React from 'react';
import circleLogo from '../../../assets/filter02.png';
import classes from './FilterIcon.module.scss';

const FilterIcon = ({ onClick }) => {
  return (
    <button onClick={onClick} aria-label="open filter" className={classes.imageWrapper}>
      <img src={circleLogo} alt="" />
    </button>
  );
};

export default FilterIcon;
