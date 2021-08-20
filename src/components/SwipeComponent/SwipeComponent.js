import React, { useEffect, useRef, useState } from 'react';
import TinderCard from 'react-tinder-card';
import { Link } from 'react-router-dom';
import classes from './SwipeComponent.module.scss';
import heartLogo from '../../assets/Heart.png';
import closeLogo from '../../assets/Close.png';
import Spinner from '../Spinner/Spinner';
import ArrowButton from '../ArrowButton/ArrowButton';
import cn from 'classnames';

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

  const { meta } = item;
  const { image } = meta;

  return (
    <div className={classes.cardContainerWr}>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className={classes.cardContainer}>
          <TinderCard
            ref={childRefs}
            className={classes.swipe}
            key={meta.name}
            onSwipe={(dir) => swiped(dir, meta.name)}
            onCardLeftScreen={() => outOfFrame()}
          >
            <div className={classes.card}>
              <img
                className={classes.cardImage}
                src={image.url?.BIG || image.url?.ORIGINAL}
                alt={meta.name}
              />
              <div className={classes.cardNameWrapper}>
                <h3 className={classes.cardName}>
                  <Link to={`/detail/${item.id}`} className={classes.detailLink}>
                    {meta.name}
                  </Link>
                </h3>

                <ArrowButton onClick={toggleDescription} />
              </div>
              {descriptionVisible && meta.description && (
                <p className={classes.description}>{meta.description}</p>
              )}

              <a
                href={`https://rarible.com/token/${item.contract}:${item.tokenId}`}
                target="_blank"
                rel="noreferrer"
                className={classes.buy}
              >
                Buy
              </a>
            </div>
          </TinderCard>
        </div>
      )}
      <div className={classes.buttons}>
        <span className={cn({ [classes.activeDislike]: dislike })} onClick={() => swipe('left')}>
          <img src={closeLogo} alt="" />
        </span>
        <span className={cn({ [classes.activeLike]: like })} onClick={() => swipe('right')}>
          <img src={heartLogo} alt="" />
        </span>
      </div>
    </div>
  );
};

export default SwipeComponent;
