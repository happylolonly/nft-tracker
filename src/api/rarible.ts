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

export enum Categories {
  art = 'art',
  photography = 'photography',
  games = 'games',
  worlds = 'worlds',
  music = 'music',
  domains = 'ens',
  defi = 'defi',
  memes = 'memes',
  punks = 'punks',
  nsfw = 'nsfw',
}

export enum SaleType {
  FIXED_PRICE = 'FIXED_PRICE',
  NOT_FOR_SALE = 'NOT_FOR_SALE',
  OPEN_FOR_OFFERS = 'OPEN_FOR_OFFERS',
  AUCTION = 'AUCTION',
}

export function searchMarketplaceItems(params?: {
  size?: number;
  filter?: {
    category?: Categories;
    statuses?: SaleType;
    maxPrice?: number;
    minPrice?: number;
  };
}) {
  const { filter, size = 20 } = params || {};

  return axios.post('https://api-mainnet.rarible.com/marketplace/search/v1/items', {
    filter: {
      ...filter,
      sort: 'LATEST',
      traits: [],
      verifiedOnly: true,
    },
    size,
  });
}

export function mapMarketplaceItems(items: string[]) {
  return axios.post('https://api-mainnet.rarible.com/marketplace/api/v4/items/map', items);
}

// (async () => {
//   try {
//     const data = await searchMarketplaceItems({
//       size: 50,
//       filter: {
//         minPrice: 1,
//         category: Categories.art,
//       },
//     });

//     const items = await mapMarketplaceItems(data.data.map((item) => item.id));

//     debugger;
//   } catch (error) {}
// })();
