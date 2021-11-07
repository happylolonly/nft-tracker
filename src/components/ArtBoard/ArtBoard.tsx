import React from 'react';
import { Link } from 'react-router-dom';

import classes from './ArtBoard.module.scss';

const ArtBoard: React.FC<any> = ({ attr }) => {
  const { items = [], name } = attr.attributes;
  return (
    <Link
      to={`/artboard/${attr.id}`}
      onClick={(e) => {
        if (items.length === 0) {
          e.preventDefault();
        }
      }}
      className={classes.artBoard}
    >
      <div className={classes.imageWrapper}>
        {items.slice(0, 3).map((i) => (
          <div className={classes.image}>
            <img src={i?.meta?.image?.url?.PREVIEW} alt={i} />
          </div>
        ))}
      </div>
      <div className={classes.name}>{name}</div>
      {/* <TelegramShareButton title={name} url={`https://nft-tracker.netlify.app/artboard/${attr.id}`}>
        <TelegramIcon size={32} round={true} />
      </TelegramShareButton> */}
      <div className={classes.items}>{items.length} items </div>

      {items.length === 0 && (
        <p
          style={{
            fontSize: 12,
            paddingLeft: 10,
          }}
        >
          Add some NFT to this artboard
        </p>
      )}
    </Link>
  );
};

export default ArtBoard;
