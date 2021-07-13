import "./App.scss";
import React, { useEffect, useState } from "react";

import * as raribleApi from "api/rarible";
import { isEmpty } from "lodash";
import { useMoralis } from "react-moralis";

function App() {
  const [items, setItems] = useState([]);
  const [activeItem, setActiveItem] = useState({});
  const { authenticate, isAuthenticated, user, logout } = useMoralis();

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
      setActiveItem(meta.data);
    } catch (error) {
      console.error(error);
    }
  }

  function getRandomItem() {
    const index = Math.floor(Math.random() * items.length);
    return index;
  }

  function next() {
    const index = getRandomItem();
    // check !==
    getItemMetaById(items[index].id);
  }

  function handleClick(isLike) {
    if (isLike) {
      //
    }

    next();
  }

  if (isEmpty(activeItem)) {
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
      </header>
      <h3>{name}</h3>
      <p>{description}</p>

      <img src={BIG || ORIGINAL} alt="" />

      <div>
        <button onClick={() => handleClick(true)}>Like</button>
        <button onClick={() => handleClick(false)}>Dislike</button>
      </div>
    </div>
  );
}

export default App;
