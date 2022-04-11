import * as React from "react";
import styles from "./header.module.scss";

const ExperienceTeamHeader = ({ title }) => {
  return (
    <div className={styles.header__container}>
      <h3>{title}</h3>
    </div>
  );
};

export default ExperienceTeamHeader;
