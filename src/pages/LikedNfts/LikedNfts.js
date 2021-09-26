import React, { useEffect, useState } from 'react';
import { useMoralis, useMoralisQuery } from 'react-moralis';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { Link } from 'react-router-dom';
import classes from './LikedNfts.module.scss';
import * as raribleApi from 'api/rarible';
import HeaderComponent from '../../components/Header/HeaderComponent';
import FooterNav from '../../components/FooterNav/FooterNav';
import { createArtboard, getArtboards } from '../../api';
import ArtBoard from '../../components/ArtBoard/ArtBoard';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

function LikedNfts() {
  const [items, setItems] = useState([]);
  const [artboards, setArtboards] = useState([]);
  const [modalIsOpen, setIsOpen] = React.useState(false);

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

  const addArtboard = async () => {
    const d = await createArtboard('lol', user);
  };

  const addToArtboard = async (items, id = 0) => {
    artboards[id].save({
      items: [...artboards[0].attributes.items, items],
    });
  };

  useEffect(async () => {
    if (user) {
      const d = await getArtboards(user);
      console.log('d', d);
      setArtboards(d);
    }
  }, [user]);

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
          <div className={classes.topWrapper}>
            <div className={classes.topHeader}>
              <span>Art Boards: {artboards.length} boards</span>
              <button
                className={classes.topButton}
                onClick={() => {
                  setIsOpen(true);
                }}
              >
                add artBoard
              </button>
            </div>
            <Modal
              open={modalIsOpen}
              onClose={() => {
                setIsOpen(false);
              }}
              center
            >
              <h2>Simple centered modal</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar risus non
                risus hendrerit venenatis. Pellentesque sit amet hendrerit risus, sed porttitor
                quam.
              </p>
            </Modal>
            <div className={classes.artBoardWrapper}>
              {artboards.map((art) => (
                <ArtBoard attr={art.attributes} />
              ))}
            </div>
          </div>
          <ResponsiveMasonry columnsCountBreakPoints={{ 100: 1, 400: 2, 700: 3, 1000: 4 }}>
            <Masonry>
              {items.map((item) => {
                const { name, image } = item.meta;

                const { ORIGINAL, BIG } = image.url;

                if (
                  [ORIGINAL || 'ipfs:', BIG || 'ipfs:'].every((image) => image.includes('ipfs:'))
                ) {
                  return null;
                }

                // if (
                //   image?.url?.ORIGINAL.includes('mp4') ||
                //   image?.url?.ORIGINAL.includes('ipfs://')
                // )
                //   return null;
                return (
                  <Link className={classes.card} to={`/detail/${item.id}`} key={name}>
                    <img src={ORIGINAL.includes('ipfs:') ? BIG : ORIGINAL} alt={name} />
                    <div className={classes.cardName}>
                      {name}{' '}
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          addToArtboard(item);
                        }}
                      >
                        Добавить в
                      </button>
                    </div>
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
