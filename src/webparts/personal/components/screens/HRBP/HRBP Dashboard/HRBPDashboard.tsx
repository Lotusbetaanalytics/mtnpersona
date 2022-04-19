import {
  BookSharp,
  CancelOutlined,
  QuestionAnswer,
  ReportTwoTone,
} from "@material-ui/icons";
import { DocumentCardDetails } from "office-ui-fabric-react";
import * as React from "react";
import { sp } from "sp-pnp-js";
import BarChart from "../../../Containers/Bar Chart/BarChart";
import Card from "../../../Containers/Card/Card";
import PieChart from "../../../Containers/Pie Chart/PieChart";
import { Context } from "../../../Personal";
import ExperienceTeamHeader from "../../EXPERIENCETEAM/Experience Team Header/ExperienceTeamHeader";
import HrbpNavbar from "../HRBP Navbar/HRBPNavbar";

import styles from "./dashboard.module.scss";

const HrbpDashboard = () => {
  const { allSurvey } = React.useContext(Context);
  const [numberofSurvey, setNumberOfSurvey] = React.useState(0);
  const [rejectedSurvey, setRejectedSurvey] = React.useState(0);
  const [pendingSurvey, setPendingSurvey] = React.useState(0);
  const [numberofQuestions, setNumberOfQuestions] = React.useState(0);

  const data = {
    numberofSurvey: [numberofSurvey],
    rejected: [rejectedSurvey],
    pending: [pendingSurvey],
  };
  const pieChartData = [
    { x: 2, y: numberofSurvey || 0, label: `All Surveys: ${numberofSurvey}` },
    {
      x: 3,
      y: pendingSurvey || 0,
      label: `Pending Surveys: ${pendingSurvey}`,
    },
    {
      x: 4,
      y: rejectedSurvey || 0,
      label: `Rejected Surveys: ${rejectedSurvey}`,
    },
  ];
  const [showChart, setShowChart] = React.useState(false);

  //Create Bar chart component
  const showBarChart = () => {
    return (
      <>
        <BarChart data={data} />
      </>
    );
  };

  //Create Pie chart component
  const showPieChart = () => {
    return (
      <>
        <PieChart data={pieChartData} />
      </>
    );
  };

  React.useEffect(() => {
    setNumberOfSurvey(allSurvey.length);
    setRejectedSurvey(
      allSurvey.filter((survey) => survey.EXApprovalStatus === "Yes").length
    );
    setPendingSurvey(
      allSurvey.filter((survey) => survey.EXApprovalStatus === "Pending").length
    );
  }, [allSurvey]);

  console.log(rejectedSurvey, "rejectedSurvey");

  React.useEffect(() => {
    sp.web.lists
      .getByTitle("Questions")
      .items.get()
      .then((items: any) => {
        setNumberOfQuestions(items.length);
      });
  }, []);

  return (
    <>
      <div className={styles.dashboard__container}>
        <HrbpNavbar />
        <div className={styles.dashboard__container__content}>
          <div style={{ position: "relative" }}>
            <ExperienceTeamHeader title="Dashboard" />
          </div>
          <div className={styles.dashboard__container__cards}>
            <Card
              title="Number of Survey"
              number={numberofSurvey}
              icon={<BookSharp style={{ fontSize: 60 }} />}
            />
            <Card
              title="Rejected Surveys"
              number={rejectedSurvey}
              icon={<CancelOutlined style={{ fontSize: 60 }} />}
            />
            <Card
              title="Total Questions"
              number={numberofQuestions}
              icon={<QuestionAnswer style={{ fontSize: 60 }} />}
            />
          </div>
          <div className={styles.dashboard__container__chart}>
            <div className={styles.chartButtonContainer}>
              <div
                onClick={() => {
                  setShowChart(false);
                }}
                className={styles.chartButton}
              >
                Pie Chart
              </div>
              <div
                onClick={() => {
                  setShowChart(true);
                }}
                className={styles.chartButton}
              >
                Bar Chart
              </div>
            </div>
            <div>
              {showChart ? (
                <div className={styles.barChart}>{showBarChart()}</div>
              ) : (
                <div className={styles.pieChart}>{showPieChart()}</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HrbpDashboard;
