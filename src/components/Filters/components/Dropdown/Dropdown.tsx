import React, { useState } from 'react';
import classes from './Dropdown.module.scss';
import { AnimatePresence, motion } from 'framer-motion';
import LeftIcon from '../../../Icons/LeftIcon/LeftIcon';

type Value = {
  title: string;
  value: string | number;
};

type Props = {
  label: string;
  value: Value | undefined;
  options: Array<Value>;
  onChange: (value: Value | false) => void;
};

const Dropdown: React.FC<Props> = ({ label, value, options, onChange }: Props) => {
  const [showOptions, setShowOptions] = useState(false);
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
                    onChange(false);
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
