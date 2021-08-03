import React, {useMemo, useRef, useState} from "react";
import TinderCard from 'react-tinder-card'
import classes from './SwipeComponent.module.scss';
import heartLogo from '../../assets/Heart.png';
import closeLogo from '../../assets/Close.png';

const alreadyRemoved = []

const SwipeComponent = ({onLike, onDislike, item}) => {
  const [lastDirection, setLastDirection] = useState()
  const childRefs = useRef();
  const swiped = (direction, nameToDelete) => {
    setLastDirection(direction)
    alreadyRemoved.push(nameToDelete)
    if(direction === 'right') {
      onLike()
      return
    }
    if(direction === 'left') {
      onDislike()
      return
    }
  }
  console.log(item);
  const outOfFrame = (name) => {
    console.log(name);
  }

  const swipe = (dir) => {
    childRefs.current.swipe(dir).then(res => res)
  }

  return (
    <div className={classes.cardContainerWr}>
      <div className={classes.cardContainer}>
        <TinderCard ref={childRefs} className={classes.swipe} key={item?.name} onSwipe={(dir) => swiped(dir, item?.name)} onCardLeftScreen={() => outOfFrame(item?.name)}>
          <div className={classes.card}>
            <img className={classes.cardImage} src={item?.image?.url?.BIG || item?.image?.url?.ORIGINAL} alt=""/>
            <h3 className={classes.cardName}>{item?.name}</h3>
          </div>
        </TinderCard>
      </div>
      <div className={classes.buttons}>
        <span onClick={() => swipe('left')}>
          <img src={closeLogo} alt=""/>
        </span>
        <span onClick={() => swipe('right')}>
          <img src={heartLogo} alt=""/>
        </span>
      </div>
    </div>
  )
}

export default SwipeComponent;