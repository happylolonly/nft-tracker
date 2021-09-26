import React from 'react';
import classes from './ArtBoard.module.scss';
const ArtBoard: React.FC = ({ attr }) => {
  const { items = [], name } = attr;
  return (
    <div className={classes.artBoard}>
      <div className={classes.imageWrapper}>
        {items.slice(0, 3).map((i) => (
          <div className={classes.image}>
            <img src={i?.meta?.image?.url?.PREVIEW} alt={i} />
          </div>
        ))}
      </div>
      <div className={classes.name}>{name}</div>
      <div className={classes.items}>{items.length} items </div>
    </div>
  );
};

export default ArtBoard;
