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
  value: Value;
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
        <div className={classes.value}>{value.title}</div>
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
            <div className={classes.header}>
              <LeftIcon
                onClick={(e) => {
                  e.stopPropagation();
                  setShowOptions(false);
                }}
              />
              {label}
            </div>
            <ul className={classes.values}>
              <li className={classes.option}>
                <button
                  className={classes.optionButton}
                  onClick={() => {
                    onChange(false);
                  }}
                >
                  All
                  <div className={classes.check} />
                </button>
              </li>
              {options.map((v) => (
                <li className={classes.option}>
                  <button
                    className={classes.optionButton}
                    onClick={() => {
                      onChange(v);
                    }}
                  >
                    {v.title}
                    <div className={classes.check} />
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
