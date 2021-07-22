import React, {useEffect, useState} from 'react'
import Swipeable from "react-swipy";
import {useMoralis, useMoralisQuery, useNewMoralisObject} from "react-moralis";
import * as raribleApi from "../../api/rarible";
import classes from './HomePage.module.scss'
import {isEmpty} from "lodash";

const HomePage = () => {
  const [cards, setCards] = useState([
    <img src="https://source.unsplash.com/random/1080?sig=1" />,
    <img src="https://source.unsplash.com/random/1080?sig=2" />,
    <img src="https://source.unsplash.com/random/1080?sig=3" />,
    <img src="https://source.unsplash.com/random/1080?sig=4" />,
    <img src="https://source.unsplash.com/random/1080?sig=5" />,
    <img src="https://source.unsplash.com/random/1080?sig=6" />,
  ]);
  const [items, setItems] = useState([]);
  const [activeItem, setActiveItem] = useState(0);
  const { user, logout } = useMoralis();
  const Likes = useNewMoralisObject("Likes");
  const LikesQuery = useMoralisQuery(
    "Likes",
    (query) => query.equalTo("user", user),
    // .equalTo('nftId', activeItem.id),
    // .descending("score")
    [user]
    // { autoFetch: false },
  );
  const wrapperStyles = {position: "relative", width: "100%", height: "calc(100vh - 80px)"};
  const actionsStyles = {
    display: "flex",
    justifyContent: "space-between",
    marginTop: 12,
    position: 'absolute'
  };


  useEffect(() => {
    // if (activeItem.attributes?.length === 0) {
    //   next();
    //   return;
    // }
    const replyExists = LikesQuery.data.find((item) => {
      return item.attributes.nftId === activeItem.id;
    });

    if (replyExists) {
      next();
      return;
    }
  }, [activeItem, LikesQuery.data, next]);


  useEffect(() => {
    (async () => {
      const data = await raribleApi.getAllItems();
      setItems(data.data.items);
      const random = getRandomItem();

      // getItemMetaById(data.data.items[random].id);
    })();
    (async () => {
      const data = await fetch('https://picsum.photos/200/300?random=2');
      // setCards(data.data.items);
    })();
  }, []);

  // async function getItemMetaById(id) {
  //   try {
  //     const meta = await raribleApi.getItemMetaById(id);
  //     setActiveItem({
  //       id,
  //       ...meta.data,
  //     });
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  function getRandomItem() {
    const index = Math.floor(Math.random() * items.length);
    return index;
  }

  async function saveReaction(isLike) {
    try {
      await Likes.save({
        like: isLike,
        user,
        nftId: activeItem.id,
      });
    } catch (error) {
      console.error(error);
    }
  }

  function next() {
    const index = getRandomItem();
    // check !==
    // getItemMetaById(items[index].id);
  }

  async function handleClick(isLike) {
    await saveReaction(isLike);
    next();
  }

  // if (isEmpty(activeItem) || activeItem.attributes.length === 0) {
  //   return null;
  // }

  // const {
  //   name,
  //   description,
  //   image: {
  //     url: { ORIGINAL, BIG },
  //   },
  // } = activeItem;

  const remove = () => {
    console.log('remove');
  }

  const handleSwipe = () => {
    console.log(activeItem);
    if(activeItem === cards.length - 1) {
      console.log(123);
      setActiveItem(0)
      return
    }
    setActiveItem(activeItem + 1)
  }

  return (
    <div>
      <div style={wrapperStyles}>
        {cards.length > 0 ? (
          <div style={wrapperStyles}>
            <Swipeable
              buttons={({left, right}) => (
                <div>
                  <span className={classes.swipeLinkReject} onClick={handleSwipe}>Reject</span>
                  <span className={classes.swipeLinkAccept} onClick={handleSwipe}>Accept</span>
                </div>
              )}
              onAfterSwipe={remove}
              onSwipe={handleSwipe}
            >
              <div className={classes.imageWrapper}>
                {cards[activeItem]}
              </div>
            </Swipeable>
            {/*{cards.length > 1 && <div style={{zIndex: "-1"}}>{cards[1]}</div>}*/}
          </div>
        ) : (
          <div style={{zIndex: "-2"}}>No more cards</div>
        )}
      </div>
    </div>
  )
}

export default HomePage;