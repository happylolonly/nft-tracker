import React, {useEffect, useMemo, useState} from 'react'
import {useMoralis, useMoralisQuery, useNewMoralisObject} from "react-moralis";
import * as raribleApi from "../../api/rarible";
import classes from './HomePage.module.scss'
import HeaderComponent from "../../components/Header/HeaderComponent";
import SwipeComponent from "../../components/SwipeComponent/SwipeComponent";
import Spinner from "../../components/Spinner/Spinner";

const HomePage = () => {
  const [isLoading, setLoading] = useState(false);
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

  useEffect(() => {
    if (activeItem.attributes?.length === 0) {
      next();
      return;
    }
    const replyExists = LikesQuery.data.find((item) => {
      return item.attributes.nftId === activeItem.id;
    });

    if (replyExists) {
      return;
    }
  }, [activeItem, LikesQuery.data]);


  useEffect(() => {
    (async () => {
      setLoading(true)
      const data = await raribleApi.getAllItems();
      setItems(data.data.items);
      const random = getRandomItem();
      await getItemMetaById(data.data.items[random].id);
    })();
  }, []);

  async function getItemMetaById(id) {
    try {
      const meta = await raribleApi.getItemMetaById(id);
      setActiveItem({
        id,
        ...meta.data,
      });
      setLoading(false)
    } catch (error) {
      console.error(error);
    }
  }

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
      next()
    } catch (error) {
      console.error(error);
    }
  }

  function next() {
    setLoading(true)
    const index = getRandomItem();
    // check !==
    getItemMetaById(items[index].id);
  }

  async function handleClick(isLike) {
    await saveReaction(isLike);
    next();
  }

  console.log(isLoading);
  return (
    <div className={classes.homepageWrapper}>
      {/*<HeaderComponent />*/}
      {isLoading ? <Spinner /> : (
        <div className={classes.swipeWrapper}>
          <SwipeComponent item={activeItem} onLike={saveReaction} onDislike={next} />
        </div>
      )}
    </div>
  )
}

export default HomePage;