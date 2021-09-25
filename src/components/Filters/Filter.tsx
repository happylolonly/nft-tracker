import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import classes from './Filter.module.scss';
import FilterIcon from '../Icons/FilterIcon/FilterIcon';
import Dropdown from './components/Dropdown/Dropdown';

const Filter = ({ showFilters, filterOpenHandler }) => {
  const [{ categories, saleType }, setState] = useState({
    categories: undefined,
    saleType: undefined,
  });

  const setCategories = (value) => {
    setState((prevState) => ({ ...prevState, categories: value }));
  };

  const setSaleType = (value) => {
    setState((prevState) => ({ ...prevState, saleType: value }));
  };
  return (
    <AnimatePresence>
      {showFilters && (
        <motion.div
          initial={{ y: '-100%' }}
          animate={{ y: '0%' }}
          exit={{ y: '-100%' }}
          className={classes.filter}
        >
          <ul className={classes.filterList}>
            <li className={classes.filterItem}>
              <span className={classes.title}>Filter Settings</span>
              <FilterIcon
                onClick={() => {
                  filterOpenHandler(false);
                }}
              />
            </li>
            <li className={classes.filterItem}>
              <Dropdown
                label="Categories"
                value={categories}
                options={[
                  { title: 'Art', value: 'Art' },
                  { title: 'Games', value: 'Games' },
                  { title: 'Metaverses', value: 'Metaverses' },
                  { title: 'Music', value: 'Music' },
                  { title: 'Domains', value: 'Domains' },
                  { title: 'DeFi', value: 'DeFi' },
                  { title: 'Memes', value: 'Memes' },
                ]}
                onChange={setCategories}
              />
            </li>
            <li className={classes.filterItem}>
              <Dropdown
                label="Sale type"
                value={saleType}
                options={[
                  { title: 'Timed auction', value: 'Timed auction' },
                  { title: 'Fixed price', value: 'Fixed price' },
                  { title: 'Not for sale', value: 'Not for sale' },
                  { title: 'Open for offers', value: 'Open for offers' },
                ]}
                onChange={setSaleType}
              />
            </li>
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Filter;
