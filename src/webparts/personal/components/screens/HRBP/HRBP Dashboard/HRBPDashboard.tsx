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
import {
  SPHttpClient,
  SPHttpClientConfiguration,
  SPHttpClientResponse,
} from "@microsoft/sp-http";
import { BASE_URL } from "../../../config";

const HrbpDashboard = () => {
  const {
    allSurvey,
    rejectedSurvey: rejected,
    confirmedStaff,
    allQuestions,
    spHttpClient,
  } = React.useContext(Context);
  const [pendingSurvey, setPendingSurvey] = React.useState(0);
  const [assignedDivisions, setAssignedDivisions] = React.useState([]);
  const [showChart, setShowChart] = React.useState(false);
  const [email, setEmail] = React.useState("");

  const data = [
    {
      label: "Yet to complete",
      data: [
        confirmedStaff.filter((staff) =>
          assignedDivisions
            .join(" ")
            .includes(staff.DEPARTMENT || staff.DIVISION)
        ).length - pendingSurvey,
      ],
      backgroundColor: "#006993",
    },
    {
      label: "Completed Surveys",
      data: [pendingSurvey],
      backgroundColor: "#C4C4C4",
    },
  ];

  const barLabel = ["Employee Surveys"];
  const label = ["Pending"];
  const pieChartData = [
    {
      value: pendingSurvey || 0,
      name: `Completed Surveys`,
    },
    {
      value:
        confirmedStaff.filter((staff) =>
          assignedDivisions
            .join(" ")
            .includes(staff.DEPARTMENT || staff.DIVISION)
        ).length - pendingSurvey || 0,
      name: `Staff yet to complete`,
    },
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
    sp.profiles.myProperties
      .get()
      .then((data) => {
        setEmail(data.Email);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  React.useEffect(() => {
    spHttpClient
      .get(
        `${BASE_URL}/_api/web/lists/getbytitle('Roles')/items?$filter=Email eq '${localStorage.getItem(
          "email"
        )}'`,
        SPHttpClient.configurations.v1
      )
      .then((response: SPHttpClientResponse) => {
        response.json().then((responseJSON: any) => {
          console.log(responseJSON);
          const { BpDivisions } =
            responseJSON.value.filter((item) => item.Role == "HRBP").length >
              0 && responseJSON.value.filter((item) => item.Role == "HRBP")[0];

          BpDivisions && setAssignedDivisions(JSON.parse(BpDivisions));
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  React.useEffect(() => {
    setPendingSurvey(
      allSurvey.filter(
        (survey) =>
          survey.EXApprovalStatus === "Pending" &&
          assignedDivisions.join(" ").includes(survey.division)
      ).length
    );
  }, [allSurvey, assignedDivisions]);

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
              title="Completed Surveys"
              number={pendingSurvey}
              icon={<BookSharp style={{ fontSize: 60 }} />}
            />
            <Card
              title="Number of Staff"
              number={
                confirmedStaff.filter((staff) =>
                  assignedDivisions
                    .join(" ")
                    .includes(staff.DEPARTMENT || staff.DIVISION)
                ).length
              }
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
            <div style={{ width: "80%", height: "80%" }}>
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
