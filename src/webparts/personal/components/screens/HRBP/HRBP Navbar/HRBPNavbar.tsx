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
import { sp } from "@pnp/sp";

const HrbpNavbar = () => {
  const history = useHistory();
  const [matches, setMatches] = React.useState(
    window.matchMedia("(min-width: 768px)").matches
  );

  React.useEffect(() => {
    window
      .matchMedia("(min-width: 768px)")
      .addEventListener("change", (e) => setMatches(e.matches));
  }, []);

  return (
    <div className={`${styles.navbar__container} `}>
      <div className={styles.navbar__container__logo}>
        <img src="https://lotusbetaanalytics.com/mtn/logo.jpg" alt="MTN" />
      </div>
      <div className={styles.navbar__container__textarea}>
        <div
          onClick={() => {
            history.push("/hrbp/dashboard");
          }}
        >
          <span>
            <AiFillAppstore />
          </span>
          <span> Dashboard</span>
        </div>
        <div
          onClick={() => {
            history.push("/hrbp/report");
          }}
        >
          <span>
            <AiOutlinePieChart />
          </span>
          <span> Report</span>
        </div>
      </div>
    </div>
  );
};

export default HrbpNavbar;
