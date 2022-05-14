import * as React from "react";
import styles from "./header.module.scss";
import { sp } from "@pnp/sp";
import { useHistory } from "react-router-dom";

const ExperienceTeamHeader = ({ title }) => {
  const history = useHistory();

  return (
    <div className={styles.header__container}>
      <h2>{title}</h2>
    </div>
  );
};

export default ExperienceTeamHeader;
