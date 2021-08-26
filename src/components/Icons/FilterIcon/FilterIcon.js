import React from 'react';
import circleLogo from '../../../assets/filter02.png'
import classes from "./FilterIcon.module.scss";

const FilterIcon = () => {
  return (
    <div className={classes.imageWrapper} >
      <img src={circleLogo} alt='' />
    </div>
  )
}

export default FilterIcon;