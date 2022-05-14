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
import { Menu } from "@material-ui/icons";

const ExperienceTeamNavbar = () => {
  const history = useHistory();
  const [matches, setMatches] = React.useState(
    window.matchMedia("(min-width: 768px)").matches
  );

  const [role, setRole] = React.useState("");

  React.useEffect(() => {
    window
      .matchMedia("(min-width: 768px)")
      .addEventListener("change", (e) => setMatches(e.matches));
  }, []);

  React.useEffect(() => {
    sp.profiles.myProperties.get().then((profile) => {
      sp.web.lists
        .getByTitle("Roles")
        .items.filter(`Email eq '${profile.Email}'`)
        .get()
        .then((lists: any) => {
          setRole(lists[0].Role);
        });
    });
  }, []);

  const [showNav, setShowNav] = React.useState(false);

  return (
    <>
      <div className={styles.navbar__btn} onClick={() => setShowNav(!showNav)}>
        <Menu />
      </div>
      <div
        className={`${styles.navbar__container} ${
          showNav && styles.navbar__mobile
        } `}
      >
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
              history.push("/experienceteam/report");
            }}
          >
            <span>
              <AiOutlinePieChart />
            </span>
            <span> Analytics</span>
          </div>
          <div
            onClick={() => {
              history.push("/experienceteam/analytics");
            }}
          >
            <span>
              <AiOutlineClose />
            </span>
            <span> Rejected Survey</span>
          </div>
          <div
            onClick={() => {
              history.push("/hr/page1");
            }}
          >
            <span>
              <AiOutlineQuestionCircle />
            </span>
            <span> Question</span>
          </div>
          {role == "Super Admin" && (
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
          )}
          {role == "Super Admin" && (
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
          )}
        </div>
      </div>
    </>
  );
};

export default ExperienceTeamNavbar;
