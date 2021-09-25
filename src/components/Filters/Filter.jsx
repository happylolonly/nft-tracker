import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import classes from './Filter.module.scss';
import FilterIcon from '../Icons/FilterIcon/FilterIcon';

const Filter = ({ showFilters, filterOpenHandler }) => {
  return (
    <AnimatePresence>
      {showFilters && (
        <motion.div
          initial={{ y: '-100%' }}
          animate={{ y: '0%' }}
          exit={{ y: '-100%' }}
          className={classes.filter}
        >
          <FilterIcon
            onClick={() => {
              filterOpenHandler(false);
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Filter;
