import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import * as raribleApi from '../../api/rarible';
import HeaderComponent from '../../components/Header/HeaderComponent';
import Detail from '../../components/Detail/Detail';
import classes from './DetailPage.module.scss';
import { useMoralis, useNewMoralisObject } from 'react-moralis';

const DetailPage = () => {
  const { id } = useParams();
  const [item, setItem] = useState();
  const [isLoading, setLoading] = useState(false);
  const { user } = useMoralis();
  const Likes = useNewMoralisObject('Likes');

  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const meta = await raribleApi.getItemMetaById(id);
        const item = await raribleApi.getItemById(id);
        setItem({
          id,
          item: item.data,
          ...meta.data,
        });
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [id]);

  async function saveReaction(isLike) {
    try {
      await Likes.save({
        like: isLike,
        user,
        nftId: item.id,
      });

      history.push('/home');
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className={classes.detailPageWrapper}>
      <HeaderComponent />
      <Detail
        isLoading={isLoading}
        item={item}
        onLike={() => saveReaction(true)}
        onDislike={() => saveReaction(false)}
      />
    </div>
  );
};

export default DetailPage;
