import { BookSharp, CancelOutlined, QuestionAnswer } from "@material-ui/icons";
import * as React from "react";
import { sp } from "sp-pnp-js";
import BarChart from "../../../Containers/Bar Chart/BarChart";
import Card from "../../../Containers/Card/Card";
import PieChart from "../../../Containers/Pie Chart/PieChart";
import { Context } from "../../../Personal";
import ExperienceTeamHeader from "../Experience Team Header/ExperienceTeamHeader";
import ExperienceTeamNavbar from "../Experience Team Navbar/ExperienceTeamNavbar";
import styles from "./dashboard.module.scss";

const ExperienceTeamDashboard = () => {
  const { allSurvey, rejectedSurvey, allQuestions } = React.useContext(Context);
  const [numberofSurvey, setNumberOfSurvey] = React.useState(0);
  const [pendingSurvey, setPendingSurvey] = React.useState(0);

  const data = {
    numberofSurvey: [numberofSurvey + rejectedSurvey.length],
    rejected: [rejectedSurvey.length],
    pending: [pendingSurvey],
  };
  const pieChartData = [
    {
      x: 2,
      y: numberofSurvey + rejectedSurvey.length || 0,
      label: `All Surveys: ${numberofSurvey + rejectedSurvey.length}`,
    },
    {
      x: 3,
      y: pendingSurvey || 0,
      label: `Pending Surveys: ${pendingSurvey}`,
    },
    {
      x: 4,
      y: rejectedSurvey.length || 0,
      label: `Rejected Surveys: ${rejectedSurvey.length}`,
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
    setPendingSurvey(
      allSurvey.filter((survey) => survey.EXApprovalStatus === "Pending").length
    );
  }, [allSurvey]);

  return (
    <>
      <div className={styles.dashboard__container}>
        <ExperienceTeamNavbar />
        <div className={styles.dashboard__container__content}>
          <div style={{ position: "relative" }}>
            <ExperienceTeamHeader title="Dashboard" />
          </div>
          <div className={styles.dashboard__container__cards}>
            <Card
              title="Number of Survey"
              number={numberofSurvey + rejectedSurvey.length}
              icon={<BookSharp style={{ fontSize: 60 }} />}
            />
            <Card
              title="Rejected Surveys"
              number={rejectedSurvey.length}
              icon={<CancelOutlined style={{ fontSize: 60 }} />}
            />
            <Card
              title="Total Questions"
              number={allQuestions.length}
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

export default ExperienceTeamDashboard;