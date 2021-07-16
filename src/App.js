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

function App() {
  const [items, setItems] = useState([]);
  const [activeItem, setActiveItem] = useState({});
  const { authenticate, isAuthenticated, user, logout } = useMoralis();

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
    getItemMetaById(items[index].id);
  }

  async function handleClick(isLike) {
    await saveReaction(isLike);

    next();
  }

  if (isEmpty(activeItem) || activeItem.attributes.length === 0) {
    debugger;
    return null;
  }

  console.log(activeItem);

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
            <button onClick={() => authenticate()}>Authenticate</button>
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
          <h3>{name}</h3>
          <p>{description}</p>

          <img src={BIG || ORIGINAL} alt="" />

          <div>
            <button onClick={() => handleClick(true)}>Like</button>
            <button onClick={() => handleClick(false)}>Dislike</button>
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
