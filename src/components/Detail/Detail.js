import React, { useState } from 'react';
import ArrowButton from '../Icons/ArrowButton/ArrowButton';
import Spinner from '../Spinner/Spinner';
import classes from './Detail.module.scss';
import FooterNav from '../FooterNav/FooterNav';

const Detail = ({ item, isLoading, onDislike, onLike }) => {
  const [descriptionVisible, setDescriptionVisible] = useState(false);
  const buyLink = `https://rarible.com/token/${item?.item?.contract}:${item?.item?.tokenId}`;

  const toggleDescription = () => {
    setDescriptionVisible(!descriptionVisible);
  };

  return isLoading ? (
    <Spinner />
  ) : (
    <main className={classes.detailWrapper}>
      <div className={classes.image}>
        <img src={item?.image?.url?.BIG || item?.image?.url?.ORIGINAL} alt="" />
      </div>
      <div className={classes.allInfo}>
        <div className={classes.titleWrapper}>
          <div className={classes.titleInfo}>
            <h1 className={classes.title}>{item?.name}</h1>
            {/*<p className={classes.secondaryInfo}>0.15 ETH</p>*/}
          </div>
          <ArrowButton onClick={toggleDescription} />
        </div>

        {descriptionVisible && <p className={classes.description}>{item?.description}</p>}
        {/* <p className={classes.saleInfo}>15% of sales will go to creator</p> */}
        <dl className={classes.productInfo}>
          <div className={classes.infoItem}>
            <dt className={classes.infoTitle}>Creator</dt>
            <dd className={classes.infoValue}>
              <a href={buyLink} target="_blank" rel="noreferrer">
                {item && `${item.item.creators[0].account.slice(0, 5)}...`}
              </a>
            </dd>
          </div>
          <div className={classes.infoItem}>
            <dt className={classes.infoTitle}>Collection</dt>
            <dd className={classes.infoValue}>
              <a href={buyLink} target="_blank" rel="noreferrer">
                {item && `${item.item.contract.slice(0, 5)}...`}
              </a>
            </dd>
          </div>
          <div className={classes.infoItem}>
            <dt className={classes.infoTitle}>Owner</dt>
            <dd className={classes.infoValue}>
              <a href={buyLink} target="_blank" rel="noreferrer">
                {item && `${item.item.owners[0].slice(0, 5)}...`}
              </a>
            </dd>
          </div>
        </dl>
        <FooterNav />
        <div className={classes.actions}>
          <button className={classes.dislike} onClick={onDislike} />
          <a href={buyLink} target="_blank" rel="noreferrer" className={classes.buy}>
            Buy
          </a>
          {/*<button className={classes.bid}>Bid</button>*/}
          <button className={classes.like} onClick={onLike} />
        </div>
      </div>
    </main>
  );
};

export default Detail;
