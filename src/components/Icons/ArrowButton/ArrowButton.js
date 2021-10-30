import classes from './ArrowButton.module.scss';

const ArrowButton = (props) => {
  return <button {...props} className={classes.arrowButton} />;
};

export default ArrowButton;
