import { getArtboards } from 'api';
import { mapMarketplaceItems } from 'api/rarible';
import React, { useState, useEffect } from 'react';
import { useMoralis } from 'react-moralis';
import { useParams, Link } from 'react-router-dom';

import classes from '../LikedNfts/LikedNfts.module.scss';
import styles from './Artboard.module.scss';
import { TelegramIcon, TelegramShareButton } from 'react-share';
import {
  VKIcon,
  VKShareButton,
  TwitterShareButton,
  TwitterIcon,
  FacebookShareButton,
  FacebookIcon,
} from 'react-share';
import { ArtboardType } from 'types';

function Artboard() {
  const { user } = useMoralis();

  const { id } = useParams();
  const [artboard, setArtboard] = useState<ArtboardType>({});

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
  }, [id, user]);

  return (
    <div className={styles.wrraper}>
      <h3>Artboard {artboard.name}</h3>
      <div>
        {artboard.items?.map((item) => {
          const { name, imagePreview } = item.properties;

          // debugger;

          // const { ORIGINAL, BIG } = image.url;

          // if ([ORIGINAL || 'ipfs:', BIG || 'ipfs:'].every((image) => image.includes('ipfs:'))) {
          //   return null;
          // }

          return (
            <div className={classes.card} key={name}>
              <Link to={`/detail/${item.id}`}>
                <img src={imagePreview} alt={name} />
              </Link>
              <div className={classes.cardName}>{name} </div>
            </div>
          );
        })}
      </div>
      <p
        style={{
          color: 'white',
          paddingLeft: 10,
        }}
      >
        Share to your audience
      </p>
      <TwitterShareButton title={artboard.name} url={document.URL}>
        <TwitterIcon size={32} round={true} />
      </TwitterShareButton>{' '}
      <TelegramShareButton title={artboard.name} url={document.URL}>
        <TelegramIcon size={32} round={true} />
      </TelegramShareButton>{' '}
      <FacebookShareButton title={artboard.name} url={document.URL}>
        <FacebookIcon size={32} round={true} />
      </FacebookShareButton>{' '}
    </div>
  );
}

export default Artboard;
