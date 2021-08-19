import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import * as raribleApi from "../../api/rarible";
import HeaderComponent from "../../components/Header/HeaderComponent";
import FooterNav from "../../components/FooterNav/FooterNav";
import Detail from "../../components/Detail/Detail";
import classes from "./DetailPage.module.scss";

const DetailPage = () => {
  const {id} = useParams();
  const [item, setItem] = useState();
  const [isLoading, setLoading] = useState(false);

  useEffect(async () => {
    try {
      setLoading(true);
      const meta = await raribleApi.getItemMetaById(id);
      setItem({
        id,
        ...meta.data,
      });
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <div className={classes.detailPageWrapper}>
      <HeaderComponent />
      <Detail isLoading={isLoading} item={item}/>
    </div>
  );
}

export default DetailPage;