import * as React from "react";
import { Link } from "react-router-dom";
import styles from "./button.module.scss";

type Props = {
  text: String;
  to: String;
};

const Button = (props: Props) => {
  return (
    <button className={styles.btnComp}>
      <Link to={props.to}>{props.text}</Link>
    </button>
  );
};

export default Button;
