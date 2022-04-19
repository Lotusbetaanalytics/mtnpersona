import * as React from "react";
import { useHistory } from "react-router-dom";
import styles from "./hrstyles.module.scss";

const SideBar = ({ handleOpen }) => {
  const history = useHistory();

  const addQuestionHandler = () => {
    history.push("/hr/page1");
    handleOpen();
  };
  const viewQuestionHandler = () => {
    history.push("/hr/page6");
  };
  const reportHandler = () => {
    history.push("/hr/page7");
  };
  const gotoDashboard = () => {
    history.push("/experienceteam/dashboard");
  };

  return (
    <div className={styles.flex__buttons}>
      <button className={styles.hr__button} onClick={gotoDashboard}>
        Dashboard
      </button>
      <button className={styles.hr__button} onClick={addQuestionHandler}>
        Add Question
      </button>
      <button className={styles.hr__button} onClick={viewQuestionHandler}>
        View Questions
      </button>
      <button className={styles.hr__button} onClick={reportHandler}>
        Reports
      </button>
    </div>
  );
};

export default SideBar;
