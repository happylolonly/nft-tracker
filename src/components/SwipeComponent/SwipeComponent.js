import React, { useEffect, useRef, useState } from 'react';
import TinderCard from 'react-tinder-card';
import { Link } from 'react-router-dom';
import classes from './SwipeComponent.module.scss';
import heartLogo from '../../assets/Heart.png';
import closeLogo from '../../assets/Close.png';
import Spinner from '../Spinner/Spinner';
import ArrowButton from '../ArrowButton/ArrowButton';

const alreadyRemoved = [];

const SwipeComponent = ({ onLike, onDislike, item, isLoading }) => {
  const [lastDirection, setLastDirection] = useState();
  const [dislike, setDislike] = useState(false);
  const [like, setLike] = useState(false);
  const [descriptionVisible, setDescriptionVisible] = useState(false);
  const childRefs = useRef();

  useEffect(() => {
    setDislike(false);
    setLike(false);
  }, [item]);

  const swiped = (direction, nameToDelete) => {
    setLastDirection(direction);
    alreadyRemoved.push(nameToDelete);
    if (direction === 'right') {
      setLike(true);
      onLike();
      return;
    }
    if (direction === 'left') {
      setDislike(true);
      onDislike();
      return;
    }
  };

  const outOfFrame = (dir) => {
    console.log(dir);
  };

  const swipe = (dir) => {
    if (dir === 'left') {
      setDislike(true);
    } else {
      setLike(true);
    }
    childRefs.current.swipe(dir).then((res) => res);
  };

  const toggleDescription = () => {
    setDescriptionVisible(!descriptionVisible);
  };

  if (!item?.meta?.image) {
    return null;
  }

  const { image } = item.meta;

  const buyLink = `https://rarible.com/token/${item.contract}:${item.tokenId}`;

  return (
    <div className={classes.cardContainerWr}>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className={classes.cardContainer}>
          <TinderCard
            ref={childRefs}
            className={classes.swipe}
            key={item?.name}
            onSwipe={(dir) => swiped(dir, item?.name)}
            onCardLeftScreen={() => outOfFrame()}
          >
            <div className={classes.card}>
              <img
                className={classes.cardImage}
                src={image?.url?.BIG || image?.url?.ORIGINAL}
                alt=""
              />
              <div className={classes.cardNameWrapper}>
                <h3 className={classes.cardName}>
                  <Link to={`/detail/${item?.id}`} className={classes.detailLink}>
                    {item?.name}
                  </Link>
                </h3>

                <a href={buyLink} target="_blank" rel="noreferrer" className={classes.buy}>
                  Buy
                </a>

                <ArrowButton onClick={toggleDescription} />
              </div>
              {descriptionVisible && <p className={classes.description}>{item?.description}</p>}
            </div>
          </TinderCard>
        </div>
      )}
      <div className={classes.buttons}>
        <button className={dislike && classes.activeDislike} onClick={() => swipe('left')}>
          <img src={closeLogo} alt="" />
        </button>
        <button className={like && classes.activeLike} onClick={() => swipe('right')}>
          <img src={heartLogo} alt="" />
        </button>
      </div>
    </div>
  );
};

export default SwipeComponent;
