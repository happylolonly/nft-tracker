import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import classes from './Filter.module.scss';
import FilterIcon from '../Icons/FilterIcon/FilterIcon';
import Dropdown from './components/Dropdown/Dropdown';
import { SaleType } from 'api/rarible';

const Filter = ({ showFilters, filterOpenHandler, getItems }) => {
  const [filters, setFilters] = useState({
    categories: undefined,
    saleType: undefined,
  });

  function handleFitler(value, name) {
    setFilters({
      ...filters,
      [name]: value,
    });
  }

  useEffect(() => {
    getItems({
      category: filters.categories?.toLowerCase(),
      saleType: filters.saleType,
    });
  }, [filters, getItems]);

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
                value={filters.categories}
                options={[
                  { title: 'Art', value: 'Art' },
                  { title: 'Games', value: 'Games' },
                  { title: 'Metaverses', value: 'Metaverses' },
                  { title: 'Music', value: 'Music' },
                  { title: 'Domains', value: 'Domains' },
                  { title: 'DeFi', value: 'DeFi' },
                  { title: 'Memes', value: 'Memes' },
                ]}
                onChange={(value) => handleFitler(value.value, 'categories')}
              />
            </li>
            <li className={classes.filterItem}>
              <Dropdown
                label="Sale type"
                value={filters.saleType}
                options={[
                  { title: 'Timed auction', value: SaleType.AUCTION },
                  { title: 'Fixed price', value: SaleType.FIXED_PRICE },
                  { title: 'Not for sale', value: SaleType.NOT_FOR_SALE },
                  { title: 'Open for offers', value: SaleType.OPEN_FOR_OFFERS },
                ]}
                onChange={(value) => handleFitler(value.value, 'saleType')}
              />
            </li>
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Filter;
