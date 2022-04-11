import * as React from "react";
import styles from "./landing.module.scss";
import { Link } from "react-router-dom";
type Props = {};

const Landing = (props: Props) => {
  return (
    <>
      <div className={`${styles.landing__container}`}>
        <div className={`${styles.landing__contents}`}>
          <div className={`${styles.landing__logo}`}>
            <img src="https://lotusbetaanalytics.com/mtn/logo.jpg" alt="MTN" />
          </div>
          <div className={`${styles.landing__title}`}>
            <h6>Welcome to the</h6>
            <h1 style={{ marginBottom: "30px" }}>PERSONA PORTAL</h1>
            <button>
              <Link to="/info/personal">Discover Persona</Link>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Landing;
