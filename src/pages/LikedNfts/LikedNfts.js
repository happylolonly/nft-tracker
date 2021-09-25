import React, { useEffect, useState } from 'react';
import { useMoralis, useMoralisQuery } from 'react-moralis';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { Link } from 'react-router-dom';
import classes from './LikedNfts.module.scss';

import * as raribleApi from 'api/rarible';
import HeaderComponent from '../../components/Header/HeaderComponent';
import FooterNav from '../../components/FooterNav/FooterNav';

function LikedNfts() {
  const [items, setItems] = useState([]);

  const { user } = useMoralis();

  const { data, isLoading, error } = useMoralisQuery(
    'Likes',
    (query) => query.equalTo('user', user).equalTo('like', true).exists('nftId'),
    [user]
  );

  async function getItemById(id) {
    try {
      const item = await raribleApi.getItemById(id, true);

      return item.data;
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    (async () => {
      if (!data.length) {
        return;
      }

      const promises = [];

      data.forEach((item) => {
        promises.push(getItemById(item.attributes.nftId));
      });

      try {
        const items = await Promise.all(promises);

        setItems(items);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [data]);

  return (
    <div className={classes.likedWrapper}>
      <HeaderComponent />
      {isLoading ? (
        'Loading...'
      ) : error ? (
        <p>Error: {error}</p>
      ) : data.length === 0 ? (
        'You not have nft'
      ) : (
        <div>
          <ResponsiveMasonry columnsCountBreakPoints={{ 100: 1, 400: 2, 700: 3, 1000: 4 }}>
            <Masonry>
              {items.map((item) => {
                const { name, image } = item.meta;
                if (
                  image?.url?.ORIGINAL.includes('mp4') ||
                  image?.url?.ORIGINAL.includes('ipfs://')
                )
                  return null;
                return (
                  <Link className={classes.card} to={`/detail/${item.id}`} key={name}>
                    <img src={image?.url?.ORIGINAL} alt={name} />
                    <p className={classes.cardName}>{name}</p>
                  </Link>
                );
              })}
            </Masonry>
          </ResponsiveMasonry>
        </div>
      )}
      <FooterNav />
    </div>
  );
}

export default LikedNfts;
