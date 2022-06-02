import {
  BookSharp,
  CancelOutlined,
  QuestionAnswer,
  ReportTwoTone,
} from "@material-ui/icons";
import { DocumentCardDetails } from "office-ui-fabric-react";
import * as React from "react";
import { sp } from "sp-pnp-js";
import { AntPieChart } from "../../../Containers/AntChart/PieChart";
import BarChart from "../../../Containers/Bar Chart/BarChart";
import Card from "../../../Containers/Card/Card";
import PieChart from "../../../Containers/Pie Chart/PieChart";
import { Context } from "../../../Personal";
import ExperienceTeamHeader from "../../EXPERIENCETEAM/Experience Team Header/ExperienceTeamHeader";
import HrbpNavbar from "../HRBP Navbar/HRBPNavbar";

import styles from "./dashboard.module.scss";

const HrbpDashboard = () => {
  const { allSurvey, rejectedSurvey: rejected } = React.useContext(Context);
  const [numberofSurvey, setNumberOfSurvey] = React.useState(0);
  const [rejectedSurvey, setRejectedSurvey] = React.useState(0);
  const [pendingSurvey, setPendingSurvey] = React.useState(0);
  const [numberofQuestions, setNumberOfQuestions] = React.useState(0);
  const [showChart, setShowChart] = React.useState(false);
  const [user, setUser] = React.useState({
    division: "",
  });

  const data = [
    // {
    //   label: "Rejected Surveys",
    //   data: [rejectedSurvey],
    //   backgroundColor: "#006993",
    // },
    {
      label: "Pending Surveys",
      data: [pendingSurvey],
      backgroundColor: "#C4C4C4",
    },
  ];

  const barLabel = ["Employee Surveys"];
  const label = ["Pending"];
  const pieChartData = [
    {
      value: pendingSurvey || 0,
      name: `Pending`,
    },
    // {
    //   value: rejectedSurvey || 0,
    //   name: `Rejected`,
    // },
  ];

  //Create Bar chart component
  const showBarChart = () => {
    return (
      <>
        <BarChart data={data} labels={barLabel} height={120} />
      </>
    );
  };

  //Create Pie chart component
  const showPieChart = () => {
    return (
      <>
        <AntPieChart data={pieChartData} label={label} title="" />
      </>
    );
  };

  React.useEffect(() => {
    sp.profiles.myProperties.get().then((data) => {
      sp.web.lists
        .getByTitle("Roles")
        .items.filter(`Email eq '${data.Email}'`)
        .get()
        .then((items: any) => {
          setUser({ division: items[0].Division });
        });
    });
  }, []);

  React.useEffect(() => {
    setNumberOfSurvey(
      allSurvey.filter((survey) => survey.division == user.division).length
    );
    setRejectedSurvey(
      rejected.filter(
        (survey) =>
          survey.EXApprovalStatus === "Declined" &&
          survey.division == user.division
      ).length
    );
    setPendingSurvey(
      allSurvey.filter(
        (survey) =>
          survey.EXApprovalStatus === "Pending" &&
          survey.division == user.division
      ).length
    );
  }, [allSurvey, user]);

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
            {/* <Card
              title="Rejected Surveys"
              number={rejectedSurvey}
              icon={<CancelOutlined style={{ fontSize: 60 }} />}
            /> */}
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
