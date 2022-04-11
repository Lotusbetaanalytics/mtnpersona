import { ReportTwoTone } from "@material-ui/icons";
import * as React from "react";
import Card from "../../../Containers/Card/Card";
import ExperienceTeamHeader from "../Experience Team Header/ExperienceTeamHeader";
import ExperienceTeamNavbar from "../Experience Team Navbar/ExperienceTeamNavbar";
import styles from "./dashboard.module.scss";

const ExperienceTeamDashboard = () => {
  const [numberofSurvey, setNumberOfSurvey] = React.useState(0);
  return (
    <>
      <div className={styles.dashboard__container}>
        <ExperienceTeamNavbar />
        <div className={styles.dashboard__container__content}>
          <ExperienceTeamHeader title="Dashboard" />
          <div className={styles.dashboard__container__cards}>
            <Card
              title="Number of Survey"
              number={numberofSurvey}
              icon={<ReportTwoTone />}
            />
            <Card
              title="Rejected Surveys"
              number={numberofSurvey}
              icon={<ReportTwoTone />}
            />
            <Card
              title="Total Questions"
              number={numberofSurvey}
              icon={<ReportTwoTone />}
            />
          </div>
          <div className={styles.dashboard__container__chart}></div>
        </div>
      </div>
    </>
  );
};

export default ExperienceTeamDashboard;
