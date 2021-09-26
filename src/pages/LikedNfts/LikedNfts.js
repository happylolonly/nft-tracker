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
  const [newName, setNewName] = useState('');
  const [modalIsOpen, setIsOpen] = useState(false);
  const [addToArtboardModalIsOpen, setAddToArtboardModalIsOpen] = useState(false);

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

  const addArtboard = async (name) => {
    if (!name) return;
    setNewName('');
    setIsOpen(false);
    const d = await createArtboard(name, user);
    await getData();
  };

  const addToArtboard = async (itemId, id) => {
    let images = [items[itemId]];
    if (artboards[id]?.attributes?.items) {
      images = [...artboards[id].attributes.items, ...images];
    }
    artboards[id].save({
      items: images,
    });
  };
  const getData = async () => {
    if (user) {
      const d = await getArtboards(user);
      console.log('d', d);
      setArtboards(d);
    }
  };
  useEffect(async () => {
    await getData();
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
                onClick={() => {
                  setIsOpen(true);
                }}
                className={classes.topButton}
              >
                Create Artboard
              </button>
            </div>
            <Modal
              open={modalIsOpen}
              onClose={() => {
                setIsOpen(false);
              }}
              center
            >
              <div className={classes.addArtboardContainer}>
                <input
                  placeholder="Artboard name"
                  type="text"
                  value={newName}
                  onChange={(e) => {
                    setNewName(e.target.value);
                  }}
                />
                <button
                  className={classes.topButton}
                  onClick={() => {
                    addArtboard(newName);
                  }}
                >
                  Создать
                </button>
              </div>
            </Modal>
            <div className={classes.artBoardWrapper}>
              {artboards.map((art) => (
                <ArtBoard attr={art} />
              ))}
            </div>
          </div>
          <ResponsiveMasonry columnsCountBreakPoints={{ 100: 1, 400: 2, 700: 3, 1000: 4 }}>
            <Masonry>
              {items.map((item, itemID) => {
                const { name, image } = item.meta;

                const { ORIGINAL, BIG } = image?.url;

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
                  <div className={classes.card} to={`/detail/${item.id}`} key={name}>
                    <Link to={`/detail/${item.id}`} key={name}>
                      <img src={ORIGINAL.includes('ipfs:') ? BIG : ORIGINAL} alt={name} />
                    </Link>
                    <div className={classes.cardName}>
                      {name}{' '}
                      <button
                        className={classes.topButton}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setAddToArtboardModalIsOpen(itemID);
                        }}
                      >
                        Add to ... {itemID}
                      </button>
                    </div>
                  </div>
                );
              })}
              <Modal
                open={addToArtboardModalIsOpen !== false}
                onClose={() => {
                  setAddToArtboardModalIsOpen(false);
                }}
                center
              >
                <div className={classes.artModalContainer}>
                  {artboards.map((art, index) => (
                    <button
                      className={classes.topButton}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        addToArtboard(addToArtboardModalIsOpen, index);
                        setAddToArtboardModalIsOpen(false);
                      }}
                    >
                      {art.attributes.name}
                    </button>
                  ))}
                </div>
              </Modal>
            </Masonry>
          </ResponsiveMasonry>
        </div>
      )}
      <FooterNav />
    </div>
  );
}

export default LikedNfts;
