import * as React from "react";
import styles from "./card.module.scss";

const Card = ({ title, number, icon }) => {
  return (
    <div className={styles.card__container}>
      <div className={styles.card__container__text}>
        <span>{title}</span>
        <h1>{number}</h1>
      </div>
      <div className={styles.cardIcon}>{icon}</div>
    </div>
  );
};

export default Card;
