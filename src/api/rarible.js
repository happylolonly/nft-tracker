import axios from "axios";

export function getAllItems() {
  return axios.get(
    "https://api.rarible.com/protocol/v0.1/ethereum/nft/items/all"
  );
}

export function getItemMetaById(itemId) {
  return axios.get(
    `https://api.rarible.com/protocol/v0.1/ethereum/nft/items/${itemId}/meta`
  );
}
