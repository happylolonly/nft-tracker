import React, { useEffect, useState, useCallback } from 'react';
import { useMoralis, useMoralisQuery, useNewMoralisObject } from 'react-moralis';
import * as raribleApi from '../../api/rarible';
import classes from './HomePage.module.scss';
import HeaderComponent from '../../components/Header/HeaderComponent';
import SwipeComponent from '../../components/SwipeComponent/SwipeComponent';
import FooterNav from '../../components/FooterNav/FooterNav';

const HomePage = () => {
  const [isLoading, setLoading] = useState(false);
  const [items, setItems] = useState({
    data: [],
    continuation: null,
  });
  const [activeItem, setActiveItem] = useState(0);
  // const [loadingItem, setLoadingItem] = useState(null);
  const [index, setIndex] = useState(null);

  const { user } = useMoralis();

  const Likes = useNewMoralisObject('Likes');
  const LikesQuery = useMoralisQuery(
    'Likes',
    (query) => {
      if (!(index === null || !items.data.length)) {
        return query.equalTo('user', user).equalTo('nftId', items.data[index].id);
      }
    },
    [user, index, items]
    // { autoFetch: false },
  );

  // function preloadItem() {}

  const getAllItems = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await raribleApi.getAllItems(items.continuation);

      setItems({
        data: data.items,
        continuation: data.continuation,
      });
      setIndex(0);
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  }, [items.continuation]);

  useEffect(() => {
    getAllItems();
  }, []);

  // check if user have had reaction to this item
  useEffect(() => {
    if (index === null || !items.data.length) {
      return;
    }

    if (LikesQuery.data.length > 0) {
      next();
    }

    const { id } = items.data[index];
    // setActiveItem(items.data[index]);
    getItemMetaById(id);
  }, [LikesQuery.data, items, index]);

  async function getItemMetaById(id) {
    try {
      const meta = await raribleApi.getItemMetaById(id);

      if (!meta.data.image) {
        next();
        return;
      }

      setActiveItem({
        ...items.data[index],
        meta: meta.data,
      });
    } catch (error) {
      console.error(error);
    }
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

  async function handleClick(isLike) {
    await saveReaction(isLike);
    next();
  }

  function next() {
    if (index === items.data.length - 1) {
      getAllItems();
      return;
    }
    setIndex(index + 1);
  }

  console.info('activeItem: ', activeItem);

  return (
    <div className={classes.homepageWrapper}>
      <HeaderComponent />
      <div className={classes.swipeWrapper}>
        <SwipeComponent
          isLoading={isLoading}
          item={activeItem}
          onLike={() => handleClick(true)}
          onDislike={() => handleClick(false)}
        />
      </div>
      <FooterNav />
    </div>
  );
};

export default HomePage;
