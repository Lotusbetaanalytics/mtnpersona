import * as React from "react";
import styles from "./navbar.module.scss";
import {
  AiFillAppstore,
  AiOutlinePieChart,
  AiOutlineClose,
  AiOutlineQuestionCircle,
  AiOutlineSetting,
  AiOutlineEye,
  AiOutlineUserAdd,
} from "react-icons/ai";
import { useHistory } from "react-router-dom";

const ExperienceTeamNavbar = () => {
  const history = useHistory();
  return (
    <div className={styles.navbar__container}>
      <div className={styles.navbar__container__logo}>
        <img src="https://lotusbetaanalytics.com/mtn/logo.jpg" alt="MTN" />
      </div>
      <div className={styles.navbar__container__textarea}>
        <div
          onClick={() => {
            history.push("/experienceteam/dashboard");
          }}
        >
          <span>
            <AiFillAppstore />
          </span>
          <span> Dashboard</span>
        </div>
        <div
          onClick={() => {
            history.push("/experienceteam/report");
          }}
        >
          <span>
            <AiOutlinePieChart />
          </span>
          <span> Report</span>
        </div>
        <div
          onClick={() => {
            history.push("/experienceteam/rejected");
          }}
        >
          <span>
            <AiOutlineClose />
          </span>
          <span> Rejected Survey</span>
        </div>
        <div
          onClick={() => {
            history.push("/experienceteam/question");
          }}
        >
          <span>
            <AiOutlineQuestionCircle />
          </span>
          <span> Question</span>
        </div>
        <div
          onClick={() => {
            history.push("/experienceteam/configure");
          }}
        >
          <span>
            <AiOutlineSetting />
          </span>
          <span> Configure Roles</span>
        </div>
        <div
          onClick={() => {
            history.push("/experienceteam/viewroles");
          }}
        >
          <span>
            <AiOutlineEye />
          </span>
          <span> View Roles</span>
        </div>
        <div
          onClick={() => {
            history.push("/experienceteam/addroles");
          }}
        >
          <span>
            <AiOutlineUserAdd />
          </span>
          <span> Add Roles</span>
        </div>
      </div>
    </div>
  );
};

export default ExperienceTeamNavbar;
