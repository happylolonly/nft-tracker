import "./App.scss";
import React, { useEffect, useState } from "react";

import * as raribleApi from "api/rarible";
import { isEmpty } from "lodash";
import {
  useMoralis,
  useNewMoralisObject,
  useMoralisQuery,
} from "react-moralis";
import { Switch, Route, Link } from "react-router-dom";
import LikedNfts from "pages/LikedNfts/LikedNfts";
import Swipeable from "react-swipy/dist/react-swipy.esm";

function App() {
  const [items, setItems] = useState([]);
  const [cards, setCards] = useState([["First", "Second", "Third"]]);
  const [activeItem, setActiveItem] = useState({});
  const { authenticate, isAuthenticated, user, logout } = useMoralis();
  const wrapperStyles = {position: "relative", width: "250px", height: "250px"};
  const actionsStyles = {
    display: "flex",
    justifyContent: "space-between",
    marginTop: 12,
  };

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

      getItemMetaById(data.data.items[random].id);
    })();
    (async () => {
      const data = await fetch('https://picsum.photos/200/300?random=2');
      // setCards(data.data.items);
    })();
  }, []);

  async function getItemMetaById(id) {
    try {
      const meta = await raribleApi.getItemMetaById(id);
      setActiveItem({
        id,
        ...meta.data,
      });
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
    } catch (error) {
      console.error(error);
    }
  }

  function next() {
    const index = getRandomItem();
    // check !==
    if (items.length) {
      getItemMetaById(items[index].id);
    }
  }

  async function handleClick(isLike) {
    await saveReaction(isLike);

    next();
  }

  if (isEmpty(activeItem) || activeItem.attributes.length === 0) {
    return null;
  }

  const remove = () => {
    console.log('remove');
  }

  const handleSwipe = (direction) => {
    console.log(direction);
  }

  console.log(activeItem, 12312312);

  const {
    name,
    description,
    image: {
      url: { ORIGINAL, BIG },
    },
  } = activeItem;
  return (
    <div className="App">
      <header>
        <div>
          {!isAuthenticated ? (
            <button onClick={() => authenticate({ provider: "walletconnect" })}>
              Authenticate
            </button>
          ) : (
            <div>
              <h1>Welcome {user.get("username")}</h1>
              <button
                onClick={() => {
                  logout();
                }}
              >
                logout
              </button>
            </div>
          )}
        </div>

        <Link to="/">Home</Link>
        <br />

        <Link to="liked">Liked</Link>
      </header>

   

      <Switch>
        <Route exact path="/">

          <div>
            <div style={wrapperStyles}>
              123123213
              {cards.length > 0 ? (
                <div style={wrapperStyles}>
                  <Swipeable
                    buttons={({left, right}) => (
                      <div style={actionsStyles}>
                        <span onClick={left}>Reject</span>
                        <span onClick={right}>Accept</span>
                      </div>
                    )}
                    onAfterSwipe={remove}
                    onSwipe={handleSwipe}
                  >
                    <div>
                      <h3>{name}</h3>
                      <p>{description}</p>

                      <img src={BIG || ORIGINAL} alt="" />
                    </div>
                  </Swipeable>
                  {cards.length > 1 && <div style={{zIndex: "-1"}}>{cards[1]}</div>}
                </div>
              ) : (
                <div style={{zIndex: "-2"}}>No more cards</div>
              )}
            </div>
          </div>
        </Route>

        <Route path="/liked">
          <LikedNfts />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
