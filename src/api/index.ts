import Moralis from 'moralis';

const ArtboardObject = Moralis.Object.extend('Artboard');

// export type Artboard = {
//   name: string;
//   owner: object; // user
//   items: string[];
// };

export async function getArtboards(user) {
  try {
    const query = new Moralis.Query(ArtboardObject);
    query.equalTo('owner', user);

    const artboards = await query.find();

    return artboards;
  } catch (error) {
    console.log(error);
  }
}

export async function createArtboard(name: string, owner: object) {
  try {
    const artboard = new ArtboardObject();
    await artboard.save({
      name,
      owner,
    });
  } catch (error) {
    console.log(error);
  }
}
// export async function updateArtboard(artboard: any) {
//   try {
//     await artboard.save();
//   } catch (error) {
//     console.log(error);
//   }
// }
