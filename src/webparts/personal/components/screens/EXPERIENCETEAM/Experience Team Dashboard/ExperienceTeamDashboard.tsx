import { BookSharp, CancelOutlined, QuestionAnswer } from "@material-ui/icons";
import * as React from "react";
import { AiFillProfile } from "react-icons/ai";
import { sp } from "sp-pnp-js";
import { AntPieChart } from "../../../Containers/AntChart/PieChart";
import BarChart from "../../../Containers/Bar Chart/BarChart";
import Card from "../../../Containers/Card/Card";
import DataPie from "../../../Containers/Pie Chart/PieChart";
import PieChart from "../../../Containers/Pie Chart/PieChart";
import { Context } from "../../../Personal";
import ExperienceTeamHeader from "../Experience Team Header/ExperienceTeamHeader";
import ExperienceTeamNavbar from "../Experience Team Navbar/ExperienceTeamNavbar";
import styles from "./dashboard.module.scss";

const ExperienceTeamDashboard = () => {
  const { allSurvey, rejectedSurvey, allQuestions, confirmedStaff } =
    React.useContext(Context);
  const [numberofSurvey, setNumberOfSurvey] = React.useState(0);
  const [pendingSurvey, setPendingSurvey] = React.useState(0);

  const data = [
    {
      label: "Number Yet to Complete Survey",
      data: [confirmedStaff.length - pendingSurvey],
      backgroundColor: "#006993",
    },
    {
      label: "Completed Surveys",
      data: [pendingSurvey],
      backgroundColor: "#C4C4C4",
    },
  ];

  const barLabel = ["Employee Surveys"];

  const label = ["Surveys"];
  const pieChartData = [
    {
      value: pendingSurvey || 0,
      name: `Completed Surveys`,
    },
    {
      value: confirmedStaff.length - pendingSurvey || 0,
      name: `Number Yet to Complete Survey`,
    },
  ];
  const [showChart, setShowChart] = React.useState(false);

  //Create Bar chart component
  const showBarChart = () => {
    return (
      <>
        <BarChart data={data} labels={barLabel} height={160} />
      </>
    );
  };

  const barData = [pendingSurvey, confirmedStaff.length - pendingSurvey];

  const labels = ["Completed Surveys", "Number Yet to Complete Survey"];

  const fill = ["#C4C4C4", "#006993"];

  //Create Pie chart component
  const showPieChart = () => {
    return (
      <>
        {/* <AntPieChart data={pieChartData} label={label} title="" /> */}
        <DataPie series={barData} fill={fill} label="" labels={labels} />
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
              number={numberofSurvey}
              icon={<BookSharp style={{ fontSize: 60 }} />}
            />
            <Card
              title="Number of Staff"
              number={confirmedStaff.length}
              icon={<AiFillProfile style={{ fontSize: 60 }} />}
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
            <div style={{ width: "80%", height: "80%" }}>
              {showChart ? (
                <div className={styles.barChart}>Count{showBarChart()}</div>
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
