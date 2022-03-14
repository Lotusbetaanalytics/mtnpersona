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
          <div style={{ marginTop: "20px" }}>
            <label className={styles.job__label} htmlFor="">
              Let’s do some carbon dating shall we, so what’s your age range?
            </label>
            <div className={styles.select}>
              <select name="" id="" onChange={(e) => {}}>
                <option>Select...</option>
                <option value="20-30 Years">20 - 30 Years</option>
                <option value="31-40 Years">31 - 40 Years</option>
                <option value="41-50 Years">41 - 50 Years</option>
                <option value="51-60 Years">51 - 60 Years</option>
              </select>
              <span className={styles.focus}></span>
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
