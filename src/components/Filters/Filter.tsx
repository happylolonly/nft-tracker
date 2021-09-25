import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import classes from './Filter.module.scss';
import FilterIcon from '../Icons/FilterIcon/FilterIcon';
import Dropdown from './components/Dropdown/Dropdown';

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
                value={{ title: 'lol', value: 'lol' }}
                options={[
                  { title: 'Art', value: 'Art' },
                  { title: 'Games', value: 'Games' },
                  { title: 'Metaverses', value: 'Metaverses' },
                  { title: 'Music', value: 'Music' },
                  { title: 'Domains', value: 'Domains' },
                  { title: 'DeFi', value: 'DeFi' },
                  { title: 'Memes', value: 'Memes' },
                ]}
                onChange={() => {}}
              />
            </li>
            <li className={classes.filterItem}>
              <Dropdown
                label="Sale type"
                value={{ title: 'lol', value: 'lol' }}
                options={[
                  { title: 'Timed auction', value: 'Timed auction' },
                  { title: 'Fixed price', value: 'Fixed price' },
                  { title: 'Not for sale', value: 'Not for sale' },
                  { title: 'Open for offers', value: 'Open for offers' },
                ]}
                onChange={() => {}}
              />
            </li>
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Filter;
