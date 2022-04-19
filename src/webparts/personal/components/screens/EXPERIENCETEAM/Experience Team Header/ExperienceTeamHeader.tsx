import * as React from "react";
import styles from "./header.module.scss";

const ExperienceTeamHeader = ({ title }) => {
  return (
    <div className={styles.header__container}>
      <h2>{title}</h2>
    </div>
  );
};

export default ExperienceTeamHeader;
