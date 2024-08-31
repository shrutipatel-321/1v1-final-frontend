import classes from "./index.module.css";
export default function Loader() {
  return (
    <div className={classes.loadercontainer}>
    <div className={classes.loader}></div>
    <p>Loading ...</p>
  </div>
  );
}
