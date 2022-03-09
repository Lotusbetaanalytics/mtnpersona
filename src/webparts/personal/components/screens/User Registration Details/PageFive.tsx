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
        <div>
          <div>
            <label className={styles.job__label} htmlFor="">
              We are all in different places of our career.
              <br /> Where art thou?
            </label>
            <div className={styles.space__gap}>
              <div className={styles.input__details}>
                <input type="checkbox" name="gender" id="" />
                <div>Priorities</div>
              </div>
              <div className={styles.input__details}>
                <input type="checkbox" name="gender" id="" />
                <div>Goal</div>
              </div>
            </div>
          </div>
          <div style={{ marginTop: "20px" }}>
            <label className={styles.job__label} htmlFor="">
              How do you prefer to learn?
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
              My Dream job?
            </label>
            <div className={styles.space__gap}>
              <div className={styles.input__details}>
                <input type="text" name="" id="" />
              </div>
            </div>
          </div>
          <div style={{ marginTop: "20px" }}>
            <label className={styles.job__label} htmlFor="">
              Comment on Employee Experience Definition
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
        <button className={styles.nobackground__button}>
          <Link to="/info/page4">Previous</Link>
        </button>
        <button className={styles.filled__button}>
          <Link to="/info/page6">Next</Link>
        </button>
      </div>
    </div>
  );
};

export default PageThree;
