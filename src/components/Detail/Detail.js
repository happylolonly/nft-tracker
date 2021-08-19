import React, {useState} from "react";
import ArrowButton from "../ArrowButton/ArrowButton";
import Spinner from "../Spinner/Spinner";
import classes from "./Detail.module.scss";
import FooterNav from "../FooterNav/FooterNav";

const Detail = ({item, isLoading}) => {
  const [descriptionVisible, setDescriptionVisible] = useState(false);

  const toggleDescription = () => {
    setDescriptionVisible(!descriptionVisible);
  }

  return isLoading ? <Spinner /> : (
    <main className={classes.detailWrapper}>
      <div>
        <img src={item?.image?.url?.BIG || item?.image?.url?.ORIGINAL} alt=""/>
      </div>
      <div>
        <div className={classes.titleWrapper}>
          <div className={classes.titleInfo}>
            <h1 className={classes.title}>{item?.name}</h1>
            <p className={classes.secondaryInfo}>0.15 ETH</p>
          </div>
          <ArrowButton onClick={toggleDescription}/>
        </div>

        {descriptionVisible && (
          <p className={classes.description}>
            {item?.description}
          </p>
        )}
        <p className={classes.saleInfo}>15% of sales will go to creator</p>
        <dl className={classes.productInfo}>
          <div className={classes.infoItem}>
            <dt className={classes.infoTitle}>Creator</dt>
            <dd className={classes.infoValue}>PlacePeak</dd>
          </div>
          <div className={classes.infoItem}>
            <dt className={classes.infoTitle}>Collection</dt>
            <dd className={classes.infoValue}>Rarible</dd>
          </div>
          <div className={classes.infoItem}>
            <dt className={classes.infoTitle}>Owner</dt>
            <dd className={classes.infoValue}>PlacePeak</dd>
          </div>
        </dl>
        <FooterNav />
      </div>
    </main>
  )
}

export default Detail;
