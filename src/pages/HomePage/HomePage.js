import React, { useEffect, useState, useCallback } from 'react';
import { useMoralis, useNewMoralisObject } from 'react-moralis';

import HeaderComponent from 'components/Header/HeaderComponent';
import SwipeComponent from 'components/SwipeComponent/SwipeComponent';
import FooterNav from 'components/FooterNav/FooterNav';
import * as raribleApi from 'api/rarible';
import { checkLike } from 'api';

import classes from './HomePage.module.scss';

const HomePage = () => {
  const [isLoading, setLoading] = useState(false);
  const [items, setItems] = useState({
    data: [],
    continuation: null,
  });
  const [activeItem, setActiveItem] = useState(0);
  const [dislikeItem, setDislikeItem] = useState({});

  const [index, setIndex] = useState(null);

  const { user } = useMoralis();

  const Likes = useNewMoralisObject('Likes');

  const getAllItems = useCallback(async (filters) => {
    setLoading(true);
    try {
      const { data } = await raribleApi.searchMarketplaceItems({
        size: 20,
        filter: filters,
      });

      setItems({
        data: data,
        continuation: data.continuation,
      });
      setIndex(0);
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    getAllItems();
  }, [getAllItems]);

  const next = useCallback(() => {
    if (index === items.data.length - 1) {
      getAllItems();
      return;
    }
    setIndex(index + 1);
  }, [index, items.data.length, getAllItems]);

  const prev = useCallback(() => {
    setActiveItem(dislikeItem);
  }, [dislikeItem]);

  const getItemMetaById = useCallback(
    async (id) => {
      try {
        const meta = await raribleApi.getItemMetaById(id);

        if (!meta.data.image) {
          next();
          return;
        }

        // const { ORIGINAL, BIG } = meta.data.image.url;

        // if ([ORIGINAL || 'ipfs:', BIG || 'ipfs:'].every((image) => image.includes('ipfs:'))) {
        //   return next();
        // }

        setActiveItem({
          ...items.data[index],
          meta: meta.data,
        });
      } catch (error) {
        console.error(error);
      }
    },
    [index, items.data, next]
  );

  // check if user have had reaction to this item
  useEffect(() => {
    if (index === null || !items.data.length) {
      return;
    }

    (async () => {
      const { id } = items.data[index];

      try {
        const isLiked = await checkLike(user, id);

        if (isLiked) {
          next();
        }

        getItemMetaById(id);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [items, index, getItemMetaById, next, user]);

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
    if (!isLike) {
      setDislikeItem(activeItem);
      next();
    } else {
      await saveReaction(isLike);
      next();
    }
  }

  console.info('activeItem: ', activeItem);

  return (
    <div className={classes.homepageWrapper}>
      <HeaderComponent prev={prev} getItems={getAllItems} index={index} />
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
