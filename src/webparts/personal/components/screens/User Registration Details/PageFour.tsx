import * as React from "react";
import { Link } from "react-router-dom";
import { Header } from "../../Containers";
import styles from "./userRegistration.module.scss";

type Props = {};

const PageThree = (props: Props) => {
  return (
    <div className={styles.screen3__container}>
      <Header />
      <form className={styles.job__form}>
        <div className={styles.gridItem}>
          <div>
            <label className={styles.job__label} htmlFor="">
              What's your superpower? Please select one that best describes you.
            </label>
            <div className={styles.space__gap}>
              <div className={styles.input__details}>
                <input type="radio" name="gender" id="" />
                <div>Male</div>
              </div>
              <div className={styles.input__details}>
                <input type="radio" name="gender" id="" />
                <div>Female</div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div>
            <label className={styles.job__label} htmlFor="">
              What adjective best describes you?
            </label>
            <div className={styles.space__gap}>
              <div className={styles.input__details}>
                <input type="checkbox" name="" id="" />
                <div>Good</div>
              </div>
              <div className={styles.input__details}>
                <input type="checkbox" name="" id="" />
                <div>Bad</div>
              </div>
              <div className={styles.input__details}>
                <input type="checkbox" name="" id="" />
                <div>Ugly</div>
              </div>
            </div>
          </div>
        </div>
      </form>
      <div className={styles.nav__buttons}>
        <button className={styles.nobackground__button}>
          <Link to="/info/page3">Previous</Link>
        </button>
        <button className={styles.filled__button}>
          <Link to="/info/page5">Next</Link>
        </button>
      </div>
    </div>
  );
};

export default PageThree;
