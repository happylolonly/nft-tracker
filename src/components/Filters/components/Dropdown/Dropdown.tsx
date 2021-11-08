import React, { useState, useEffect } from 'react';
import classes from './Dropdown.module.scss';
import { AnimatePresence, motion } from 'framer-motion';
import LeftIcon from '../../../Icons/LeftIcon/LeftIcon';
import { ValueType } from 'types';

type Props = {
  label: string;
  value: ValueType | undefined;
  options: Array<ValueType>;
  onChange: (value: ValueType | null) => void;
  setShowPrice: (price: boolean) => void;
};

const Dropdown: React.FC<Props> = ({ label, value, options, onChange, setShowPrice }: Props) => {
  const [showOptions, setShowOptions] = useState<boolean>(false);

  useEffect(() => {
    if (showOptions) {
      setShowPrice(false);
    } else {
      setShowPrice(true);
    }
  }, [setShowOptions, setShowPrice, showOptions]);

  return (
    <button
      className={classes.dropdown}
      onClick={() => {
        setShowOptions(true);
      }}
    >
      <div>
        <div className={classes.title}>{label}</div>
        <div className={classes.value}>{value ? value.title : 'All'}</div>
      </div>
      <LeftIcon mirrorX />
      <AnimatePresence>
        {showOptions && (
          <motion.div
            initial={{ y: '-100%' }}
            animate={{ y: '0%' }}
            exit={{ y: '-100%' }}
            className={classes.options}
          >
            <button
              className={classes.header}
              onClick={(e) => {
                e.stopPropagation();
                setShowOptions(false);
              }}
            >
              <LeftIcon />
              {label}
            </button>
            <ul className={classes.values}>
              <li className={classes.option}>
                <button
                  className={classes.optionButton}
                  onClick={() => {
                    onChange(null);
                    setShowOptions(false);
                  }}
                >
                  All
                  <div className={[classes.check, !value ? classes.selected : ''].join(' ')} />
                </button>
              </li>
              {options.map((v) => (
                <li className={classes.option} key={v.value}>
                  <button
                    className={classes.optionButton}
                    onClick={() => {
                      onChange(v);
                      setShowOptions(false);
                    }}
                  >
                    {v.title}
                    <div
                      className={[
                        classes.check,
                        v.value === String(value) ? classes.selected : '',
                      ].join(' ')}
                    />
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
};

export default Dropdown;
