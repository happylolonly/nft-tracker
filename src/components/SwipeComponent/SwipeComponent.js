import React, {useEffect, useMemo, useRef, useState} from "react";
import TinderCard from 'react-tinder-card'
import classes from './SwipeComponent.module.scss';
import heartLogo from '../../assets/Heart.png';
import closeLogo from '../../assets/Close.png';
import Spinner from "../Spinner/Spinner";

const alreadyRemoved = []

const SwipeComponent = ({onLike, onDislike, item, isLoading}) => {
  const [lastDirection, setLastDirection] = useState()
  const [dislike, setDislike] = useState(false);
  const [like, setLike] = useState(false);
  const childRefs = useRef();

  useEffect(() => {
    setDislike(false)
    setLike(false)
  },[item]);

  const swiped = (direction, nameToDelete) => {
    setLastDirection(direction)
    alreadyRemoved.push(nameToDelete)
    if(direction === 'right') {
      setLike(true)
      onLike()
      return
    }
    if(direction === 'left') {
      setDislike(true)
      onDislike()
      return
    }
  }

  const outOfFrame = (dir) => {
    console.log(dir);
  }

  const swipe = (dir) => {
    if(dir === 'left') {
      setDislike(true)
    } else {
      setLike(true)
    }
    childRefs.current.swipe(dir).then(res => res)
  }

  return (
    <div className={classes.cardContainerWr}>
      {isLoading ? <Spinner /> : (
        <div className={classes.cardContainer}>
          <TinderCard ref={childRefs} className={classes.swipe} key={item?.name} onSwipe={(dir) => swiped(dir, item?.name)} onCardLeftScreen={() => outOfFrame()}>
            <div className={classes.card}>
              <img className={classes.cardImage} src={item?.image?.url?.BIG || item?.image?.url?.ORIGINAL} alt=""/>
              <h3 className={classes.cardName}>{item?.name}</h3>
            </div>
          </TinderCard>
        </div>
      )}
      <div className={classes.buttons}>
        <span className={dislike && classes.activeDislike} onClick={() => swipe('left')}>
          <img src={closeLogo} alt=""/>
        </span>
        <span className={like && classes.activeLike} onClick={() => swipe('right')}>
          <img src={heartLogo} alt=""/>
        </span>
      </div>
    </div>
  )
}

export default SwipeComponent;