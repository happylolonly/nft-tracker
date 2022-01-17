import React, { useState, useEffect, useRef, MutableRefObject } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import classes from './Filter.module.scss';
import FilterIcon from '../Icons/FilterIcon/FilterIcon';
import Dropdown from './components/Dropdown/Dropdown';
import Range from 'components/Filters/components/Dropdown/Range';
import { Categories, SaleType } from 'api/rarible';
import { ValueType } from 'types';

type FiltersType = {
  minPrice?: string;
  maxPrice?: string;
  categories: ValueType | undefined;
  saleType: ValueType | undefined;
};

const Filter = ({ showFilters, filterOpenHandler, getItems, setFilter }) => {
  const [showPrice, setShowPrice] = useState<boolean>(true);
  const [filters, setFilters] = useState<FiltersType>({
    categories: undefined,
    saleType: undefined,
  });

  const ref = useRef() as MutableRefObject<HTMLDivElement>;
  const [{ start, end }, setRangeValue] = useState({
    start: 0,
    end: 10,
  });

  function handleFitler(value, name) {
    setFilters({
      ...filters,
      [name]: value,
    });

    filterOpenHandler(false);
  }

  useEffect(() => {
    const { minPrice, maxPrice } = filters;
    getItems({
      //@ts-ignore
      category: filters.categories?.toLowerCase(),
      saleType: filters.saleType,
      minPrice,
      maxPrice,
    });
  }, [filters, getItems]);

  const handleRangeChange = (start, end) => {
    // setFilters({
    //   ...filters,
    //   minPrice: start,
    //   maxPrice: end,
    // });
    setRangeValue({ start: start.toFixed(2), end: end.toFixed(2) });
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
  }, [ref, setFilter]);

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
                setShowPrice={setShowPrice}
                label="Categories"
                value={filters.categories}
                options={[
                  { title: 'Art', value: 'Art' },
                  { title: 'Games', value: 'Games' },
                  { title: 'Metaverses', value: Categories.worlds },
                  { title: 'Music', value: 'Music' },
                  { title: 'Domains', value: Categories.domains },
                  { title: 'DeFi', value: 'DeFi' },
                  { title: 'Memes', value: 'Memes' },
                  { title: 'Punks', value: Categories.punks },
                  { title: '🔞 NSFW', value: Categories.nsfw },
                ]}
                onChange={(value: ValueType | null) => {
                  if (value) {
                    handleFitler(value.value, 'categories');
                  }
                }}
              />
            </li>
            <li className={classes.filterItem}>
              <Dropdown
                setShowPrice={setShowPrice}
                label="Sale type"
                value={filters.saleType}
                options={[
                  { title: 'Timed auction', value: SaleType.AUCTION },
                  { title: 'Fixed price', value: SaleType.FIXED_PRICE },
                  { title: 'Not for sale', value: SaleType.NOT_FOR_SALE },
                  { title: 'Open for offers', value: SaleType.OPEN_FOR_OFFERS },
                ]}
                onChange={(value: ValueType | null) => {
                  if (value) {
                    handleFitler(value.value, 'saleType');
                  }
                }}
              />
            </li>
            {showPrice && (
              <li className={classes.filterItem}>
                <div className={classes.priceBlock}>
                  <header>
                    <h5>Price</h5>
                    <span className={classes.count}>
                      {start} - {end} ETH
                    </span>
                  </header>
                  <Range onChange={handleRangeChange} />
                </div>
              </li>
            )}
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Filter;
