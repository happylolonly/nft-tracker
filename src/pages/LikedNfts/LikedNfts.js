import React from "react";

import { useMoralis, useMoralisQuery } from "react-moralis";

function LikedNfts() {
  const { user } = useMoralis();

  const { data, isLoading, error } = useMoralisQuery(
    "Likes",
    (query) => query.equalTo("user", user).equalTo("like", true),
    // .descending("score")
    [user]
    // { autoFetch: false },
  );

  return (
    <div>
      <h3>Liked Nft</h3>
      {isLoading ? (
        "Loading..."
      ) : error ? (
        <p>Error: {error}</p>
      ) : data.length === 0 ? (
        "You not have nft"
      ) : (
        <div>
          <h5>You have {data.length} liked</h5>
          {data.map((nft) => {
            return (
              <div>
                <p>{JSON.stringify(nft.attributes)}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default LikedNfts;
