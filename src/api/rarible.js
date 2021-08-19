import axios from 'axios';

export function getAllItems(continuation, includeMeta) {
  return axios.get('https://api.rarible.com/protocol/v0.1/ethereum/nft/items/all', {
    params: {
      includeMeta,
      size: 25,
      continuation: continuation,
    },
  });
}

export function getItemMetaById(itemId) {
  return axios.get(`https://api.rarible.com/protocol/v0.1/ethereum/nft/items/${itemId}/meta`);
}

export function getItemById(itemId, includeMeta) {
  return axios.get(`https://api.rarible.com/protocol/v0.1/ethereum/nft/items/${itemId}`, {
    params: {
      includeMeta,
    },
  });
}
