import React, { useEffect, useState } from 'react';
import { useMoralis, useMoralisQuery } from 'react-moralis';

import * as raribleApi from 'api/rarible';

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
    <div>
      <h3>Liked Nft</h3>
      {isLoading ? (
        'Loading...'
      ) : error ? (
        <p>Error: {error}</p>
      ) : data.length === 0 ? (
        'You not have nft'
      ) : (
        <div>
          <h5>You have {data.length} liked</h5>
          {items.map(({ meta }) => {
            const { name, image } = meta;
            return (
              <div>
                <h3>{name}</h3>
                <img src={image?.url?.ORIGINAL} alt="" width="200" height="200" />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default LikedNfts;
