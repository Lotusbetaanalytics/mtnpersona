import * as React from "react";
import styles from "./header.module.scss";

const Header = ({ title = "Persona Questionnaire" }) => {
  return (
    <div className={`${styles.header__container}`}>
      <div className={`${styles.header__title}`}>{title}</div>
      <div className={`${styles.header__logo}`}>
        <img src="https://lotusbetaanalytics.com/mtn/logo.jpg" alt="MTN" />
      </div>
    </div>
  );
};

export default Header;
