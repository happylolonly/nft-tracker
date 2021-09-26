import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import classes from './Filter.module.scss';
import FilterIcon from '../Icons/FilterIcon/FilterIcon';
import Dropdown from './components/Dropdown/Dropdown';
import Range from 'components/Filters/components/Dropdown/Range';

const Filter = ({ setFilter, showFilters, filterOpenHandler }) => {
  const ref = useRef(null);
  const [{ start, end }, setRangeValue] = useState(null);

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

  const handleRangeChange = (start, end) => {
    setRangeValue({ start, end });
  };

  useEffect(() => {
    const handleClick = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setFilter({ showFilters: false });
      }
    };

    document.addEventListener('mousedown', handleClick);

    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [ref]);

  return (
    <AnimatePresence>
      {showFilters && (
        <motion.div
          ref={ref}
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
            <li className={classes.filterItem}>
              <div>
                <h5>Price</h5>
                <p className={classes.count}>
                  {start} - {end} ETH
                </p>
                <div>
                  <Range onChange={handleRangeChange} />
                </div>
              </div>
            </li>
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Filter;
