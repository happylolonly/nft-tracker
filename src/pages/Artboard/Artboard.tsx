import { getArtboards } from 'api';
import { mapMarketplaceItems } from 'api/rarible';
import React, { useState, useEffect } from 'react';
import { useMoralis } from 'react-moralis';
import { useParams, Link } from 'react-router-dom';

import classes from '../LikedNfts/LikedNfts.module.scss';
import styles from './Artboard.module.scss';
import { TelegramIcon, TelegramShareButton } from 'react-share';

function Artboard() {
  const { user } = useMoralis();

  const { id } = useParams();
  const [artboard, setArtboard] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const artboards = await getArtboards(user);

        const artboard = artboards?.find((artboard) => artboard.id === id);

        const d = await mapMarketplaceItems(
          artboard?.attributes?.items?.map((item) => {
            return item.id || item;
          })
        );

        setArtboard({
          ...artboard?.attributes,
          items: d.data,
        });
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <div className={styles.wrraper}>
      <h3>Artboard {artboard.name}</h3>
      {artboard.items?.map((item) => {
        const { name, image } = item.properties;

        // const { ORIGINAL, BIG } = image.url;

        // if ([ORIGINAL || 'ipfs:', BIG || 'ipfs:'].every((image) => image.includes('ipfs:'))) {
        //   return null;
        // }

        return (
          <div className={classes.card} to={`/detail/${item.id}`} key={name}>
            <Link to={`/detail/${item.id}`} key={name}>
              <img src={image} alt={name} />
            </Link>
            <div className={classes.cardName}>{name} </div>
          </div>
        );
      })}

      <TelegramShareButton title={artboard.name} url={document.URL}>
        <TelegramIcon size={32} round={true} />
      </TelegramShareButton>
    </div>
  );
}

export default Artboard;
