import classes from "./GridBox.module.scss";

const GridBox = ({ children }) => {
  return <ul className={classes["list-container"]}>{children}</ul>;
};

export default GridBox;
