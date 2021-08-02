import React, {useMemo, useState} from "react";
import TinderCard from 'react-tinder-card'
import classes from './SwipeComponent.module.scss';
import heartLogo from '../../assets/Heart.png';
import closeLogo from '../../assets/Close.png';

const db = [
  {
    name: 'Richard Hendricks',
    url: 'https://source.unsplash.com/random/1080?sig=1'
  },
  {
    name: 'Erlich Bachman',
    url: 'https://source.unsplash.com/random/1080?sig=1'
  },
  {
    name: 'Monica Hall',
    url: 'https://source.unsplash.com/random/1080?sig=1'
  },
  {
    name: 'Jared Dunn',
    url: 'https://source.unsplash.com/random/1080?sig=1'
  },
  {
    name: 'Dinesh Chugtai',
    url: 'https://source.unsplash.com/random/1080?sig=1'
  }
]

const alreadyRemoved = []
let charactersState = db // This fixes issues with updating characters state forcing it to use the current state and not the state that was active when the card was created.

const SwipeComponent = () => {
  const [characters, setCharacters] = useState(db)
  const [lastDirection, setLastDirection] = useState()

  const childRefs = useMemo(() => Array(db.length).fill(0).map(i => React.createRef()), [])

  const swiped = (direction, nameToDelete) => {
    setLastDirection(direction)
    alreadyRemoved.push(nameToDelete)
  }

  const outOfFrame = (name) => {
    charactersState = charactersState.filter(character => character.name !== name)
    setCharacters(charactersState)
  }

  const swipe = (dir) => {
    const cardsLeft = characters.filter(person => !alreadyRemoved.includes(person.name))
    if (cardsLeft.length) {
      const toBeRemoved = cardsLeft[cardsLeft.length - 1].name // Find the card object to be removed
      const index = db.map(person => person.name).indexOf(toBeRemoved) // Find the index of which to make the reference to
      alreadyRemoved.push(toBeRemoved) // Make sure the next card gets removed next time if this card do not have time to exit the screen
      childRefs[index].current.swipe(dir) // Swipe the card!
    }
  }

  return (
    <div>
      <h1>React Tinder Card</h1>
      <div className={classes.cardContainer}>
        {characters.map((character, index) =>
          <TinderCard ref={childRefs[index]} className={classes.swipe} key={character.name} onSwipe={(dir) => swiped(dir, character.name)} onCardLeftScreen={() => outOfFrame(character.name)}>
            <div style={{ backgroundImage: 'url(' + character.url + ')' }} className={classes.card}>
              <h3>{character.name}</h3>
            </div>
          </TinderCard>
        )}
      </div>
      <div className={classes.buttons}>
        <span onClick={() => swipe('left')}>
          <img src={closeLogo} alt=""/>
        </span>
        <span onClick={() => swipe('right')}>
          <img src={heartLogo} alt=""/>
        </span>
      </div>
      {/*{lastDirection ? <h2 key={lastDirection} className='infoText'>You swiped {lastDirection}</h2> : <h2 className='infoText'>Swipe a card or press a button to get started!</h2>}*/}
    </div>
  )
}

export default SwipeComponent;