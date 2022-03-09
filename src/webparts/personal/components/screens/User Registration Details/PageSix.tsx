import * as React from "react";
// import { Link } from "react-router-dom";
import { Header } from "../../Containers";
import MyModal from "../../Containers/Modal/Modal";
import styles from "./userRegistration.module.scss";
MyModal;
type Props = {};

const PageSix = (props: Props) => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={styles.screen3__container}>
      <Header />
      <form className={styles.job__form}>
        <div>
          <div>
            <label className={styles.job__label} htmlFor="">
              1 – 2 of your saddest moments in our MTN World are…the kind that
              left a nail in your heart
            </label>
            <div className={styles.space__gap}>
              <div className={styles.input__details}>
                <input type="text" name="" id="" />
              </div>
            </div>
          </div>
          <div style={{ marginTop: "20px" }}>
            <label className={styles.job__label} htmlFor="">
              What is your most desired channel for knowing what’s buzzing in
              the Y’elloverse?
            </label>
            <div className={styles.space__gap}>
              <div className={styles.input__details}>
                <input type="text" name="" id="" />
              </div>
            </div>
          </div>
        </div>
        <div>
          <div>
            <label className={styles.job__label} htmlFor="">
              In your experience so far, what 1 - 2 things from the list below,
              make work for you almost unbearable?
            </label>
            <div className={styles.space__gap}>
              <div className={styles.input__details}>
                <input type="text" name="" id="" />
              </div>
            </div>
          </div>
        </div>
      </form>
      <div className={styles.nav__buttons} style={{ bottom: "-10px" }}>
        <button className={styles.nobackground__button} onClick={handleOpen}>
          Cancel
        </button>
        <button className={styles.filled__button}>Submit</button>
      </div>
      <MyModal open={open} handleClose={handleClose} />
    </div>
  );
};

export default PageSix;
