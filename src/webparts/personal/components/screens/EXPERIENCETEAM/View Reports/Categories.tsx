import * as React from "react";
import { forwardRef } from "react";
import {
  AddBox,
  ArrowDownward,
  Check,
  Remove,
  ChevronLeft,
  ChevronRight,
  Clear,
  DeleteOutline,
  Edit,
  FilterList,
  FirstPage,
  LastPage,
  SaveAlt,
  Search,
  ViewColumn,
} from "@material-ui/icons";
import MaterialTable from "material-table";
import { useHistory } from "react-router-dom";
import ExperienceTeamHeader from "../Experience Team Header/ExperienceTeamHeader";
import {
  AntBarChart,
  AntPieChart,
} from "../../../Containers/AntChart/PieChart";
import ExperienceTeamNavbar from "../Experience Team Navbar/ExperienceTeamNavbar";
import styles from "./report.module.scss";
import { sp } from "@pnp/sp";
import { Spinner } from "office-ui-fabric-react";
import { ReportTabs } from "../../../Containers/Options/Options";
import BarChart from "../../../Containers/Bar Chart/BarChart";
import DataPie from "../../../Containers/Pie Chart/PieChart";

const QuestionCategories = () => {
  const [data, setData] = React.useState([]);
  const [questionData, setQuestionData] = React.useState([]);
  const [findingData, setFindingData] = React.useState(false);
  const [worries, setworries] = React.useState(0);
  const [interests, setinterests] = React.useState(0);
  const [goals, setgoals] = React.useState(0);
  const [motivator, setmotivator] = React.useState(0);
  const [communication, setcommunication] = React.useState(0);
  const [bio, setbio] = React.useState(0);
  const [learning, setlearning] = React.useState(0);
  const [attributes, setattributes] = React.useState(0);
  const [priorities, setpriorities] = React.useState(0);
  const [show, setShow] = React.useState("Table");

  const tableData = [];

  const history = useHistory();

  const getAnswers = (userResponses, questionID) => {
    const question = userResponses.map(
      ({ responses }) =>
        (JSON.parse(responses).filter((r) => r.id === questionID).length > 0 &&
          JSON.parse(responses).filter((r) => r.id === questionID)[0]) || {
          answer: "",
          section: "",
          id: questionID,
        }
    );

    let countArr = [];

    for (let i = 0; i < question.length; i++) {
      countArr.push(question[i].answer);
    }

    return countArr.length;
  };

  const getSimilarAnswers = (userResponses, questionID) => {
    const question = userResponses.map(
      ({ responses }) =>
        (JSON.parse(responses).filter((r) => r.id === questionID).length > 0 &&
          JSON.parse(responses).filter((r) => r.id === questionID)[0]) || {
          answer: "",
          section: "",
          id: questionID,
        }
    );

    function findSimilarAnswer(arr) {
      let start = 0;
      let count = 0;
      let countArr = [];

      while (start < arr.length) {
        for (let i = start + 1; i < arr.length; i++) {
          if (arr[start].answer == arr[i].answer) {
            countArr.push(arr[start].answer);
            count = Math.max(count + 1, count);
          }
        }
        start++;
      }

      let freq = {};
      for (let val of countArr) {
        freq[val] = (freq[val] || 0) + 1;
      }

      const keys = Object.keys(freq);

      const values = keys.map((key) => {
        return freq[key];
      });

      const max = Math.max.apply(null, values);

      return Math.round(max);
    }

    return findSimilarAnswer(question);
  };

  const columns = [
    { title: "Question", field: "questions", type: "string" as const },
    {
      title: "Similar Answer Count",
      field: "ID",
      type: "string" as const,
      render: (rowData) => (
        <div>
          {getSimilarAnswers(data, rowData.ID) == Number(-Infinity)
            ? 0
            : getSimilarAnswers(data, rowData.ID)}
        </div>
      ),
    },
    {
      title: "Answer Count",
      field: "ID",
      type: "string" as const,
      render: (rowData) => <div>{getAnswers(data, rowData.ID)}</div>,
    },
  ];

  React.useEffect(() => {
    sp.web.lists
      .getByTitle("personal")
      .items.select("responses")
      .get()
      .then((items: any) => {
        setData(items);
      });

    sp.web.lists
      .getByTitle("Questions")
      .items.get()
      .then((items: any) => {
        setQuestionData(items);
      });
  }, []);

  React.useEffect(() => {
    setFindingData(true);
    sp.web.lists
      .getByTitle("personal")
      .items.select("division", "responses")
      .get()
      .then((items) => {
        setinterests(getGroups(items).interests());
        setworries(getGroups(items).worries());
        setgoals(getGroups(items).goals());
        setcommunication(getGroups(items).communication());
        setbio(getGroups(items).bio());
        setlearning(getGroups(items).learning());
        setattributes(getGroups(items).attributes());
        setpriorities(getGroups(items).priorities());
        setmotivator(getGroups(items).motivator());
        setFindingData(false);
      })
      .catch((err) => {
        console.log(err);
        setFindingData(false);
      });
  }, []);

  const getGroups = (arr) => {
    return {
      interests: () => {
        for (let { responses } of arr) {
          return JSON.parse(responses).filter(
            ({ section }) => section == "interests"
          ).length;
        }
      },
      learning: () => {
        for (let { responses } of arr) {
          return JSON.parse(responses).filter(
            ({ section }) => section == "learning"
          ).length;
        }
      },
      bio: () => {
        for (let { responses } of arr) {
          return JSON.parse(responses).filter(({ section }) => section == "bio")
            .length;
        }
      },
      attributes: () => {
        for (let { responses } of arr) {
          return JSON.parse(responses).filter(
            ({ section }) => section == "attributes"
          ).length;
        }
      },
      communication: () => {
        for (let { responses } of arr) {
          return JSON.parse(responses).filter(
            ({ section }) => section == "communication"
          ).length;
        }
      },
      motivator: () => {
        for (let { responses } of arr) {
          return JSON.parse(responses).filter(
            ({ section }) => section == "motivator"
          ).length;
        }
      },
      goals: () => {
        for (let { responses } of arr) {
          return JSON.parse(responses).filter(
            ({ section }) => section == "goals"
          ).length;
        }
      },
      worries: () => {
        for (let { responses } of arr) {
          return JSON.parse(responses).filter(
            ({ section }) => section == "worries"
          ).length;
        }
      },
      priorities: () => {
        for (let { responses } of arr) {
          return JSON.parse(responses).filter(
            ({ section }) => section == "priorities"
          ).length;
        }
      },
    };
  };

  const pieChartData = [
    {
      value: goals,
      name: `Goals`,
    },
    {
      value: motivator,
      name: `Motivator`,
    },
    {
      value: bio,
      name: `Short Bio`,
    },
    {
      value: communication,
      name: `Communication Preference`,
    },
    {
      value: learning,
      name: `Learning Style`,
    },
    {
      value: attributes,
      name: `Super Power and Key Attributes`,
    },
    {
      value: worries,
      name: `Worries`,
    },
    {
      value: interests,
      name: `Interests`,
    },

    {
      value: priorities,
      name: `Priorities`,
    },
  ];

  const label = [
    "Goals",
    "Motivator",
    "Short Bio",
    "Communication Preference",
    "Learning Style",
    "Super Power and Key Attributes",
    "Worries",
    "Interests",
    "Priorities",
  ];

  const barData = [
    goals,
    motivator,
    bio,
    communication,
    learning,
    attributes,
    worries,
    interests,
    priorities,
  ];

  const analyticData = [
    {
      label: "Goals",
      data: [goals],
      backgroundColor: "#006993",
    },
    {
      label: "Motivator",
      data: [motivator],
      backgroundColor: "#91CC75",
    },
    {
      label: "Short Bio",
      data: [bio],
      backgroundColor: "#FAC858",
    },
    {
      label: "Communication Preference",
      data: [communication],
      backgroundColor: "#EE6666",
    },
    {
      label: "Learning Style",
      data: [learning],
      backgroundColor: "#73C0DE",
    },
    {
      label: "Super Power and Key Attributes",
      data: [attributes],
      backgroundColor: "#FC8452",
    },
    {
      label: "Worries",
      data: [worries],
      backgroundColor: "#15133C",
    },
    {
      label: "Interests",
      data: [interests],
      backgroundColor: "purple",
    },
    {
      label: "Priorities",
      data: [priorities],
      backgroundColor: "pink",
    },
  ];

  const fill = [
    "#006993",
    "#91CC75",
    "#FAC858",
    "#EE6666",
    "#73C0DE",
    "#FC8452",
    "#15133C",
    "purple",
    "pink",
  ];

  const barLabel = ["Categories"];

  return (
    <>
      <>
        {findingData ? (
          <div className={styles.spinner}>
            <Spinner />
          </div>
        ) : (
          <div
            style={{
              width: "100%",
              height: "100%",
            }}
          >
            <div>
              <button
                className={`${styles.mtn__btn__table} ${styles.mtn__black}`}
                style={{ margin: "20px", boxSizing: "border-box" }}
                onClick={() => {
                  setShow((prev) => {
                    return prev == "Chart" ? "Table" : "Chart";
                  });
                }}
              >
                Show {`${show}`}
              </button>
              {show === "Chart" ? (
                <div>
                  <MaterialTable
                    icons={{
                      Add: forwardRef((props: any, ref: any) => (
                        <AddBox {...props} ref={ref} />
                      )),
                      Check: forwardRef((props: any, ref: any) => (
                        <Check {...props} ref={ref} />
                      )),
                      Clear: forwardRef((props: any, ref: any) => (
                        <Clear {...props} ref={ref} />
                      )),
                      Delete: forwardRef((props: any, ref: any) => (
                        <DeleteOutline {...props} ref={ref} />
                      )),
                      DetailPanel: forwardRef((props: any, ref: any) => (
                        <ChevronRight {...props} ref={ref} />
                      )),
                      Edit: forwardRef((props: any, ref: any) => (
                        <Edit {...props} ref={ref} />
                      )),
                      Export: forwardRef((props: any, ref: any) => (
                        <SaveAlt {...props} ref={ref} />
                      )),
                      Filter: forwardRef((props: any, ref: any) => (
                        <FilterList {...props} ref={ref} />
                      )),
                      FirstPage: forwardRef((props: any, ref: any) => (
                        <FirstPage {...props} ref={ref} />
                      )),
                      LastPage: forwardRef((props: any, ref: any) => (
                        <LastPage {...props} ref={ref} />
                      )),
                      NextPage: forwardRef((props: any, ref: any) => (
                        <ChevronRight {...props} ref={ref} />
                      )),
                      PreviousPage: forwardRef((props: any, ref: any) => (
                        <ChevronLeft {...props} ref={ref} />
                      )),
                      ResetSearch: forwardRef((props: any, ref: any) => (
                        <Clear {...props} ref={ref} />
                      )),
                      Search: forwardRef((props: any, ref: any) => (
                        <Search {...props} ref={ref} />
                      )),
                      SortArrow: forwardRef((props: any, ref: any) => (
                        <ArrowDownward {...props} ref={ref} />
                      )),
                      ThirdStateCheck: forwardRef((props: any, ref: any) => (
                        <Remove {...props} ref={ref} />
                      )),
                      ViewColumn: forwardRef((props: any, ref: any) => (
                        <ViewColumn {...props} ref={ref} />
                      )),
                    }}
                    title={`Question-Answer Report`}
                    columns={columns}
                    data={questionData}
                    options={{
                      exportButton: true,
                      exportAllData: true,
                      actionsCellStyle: {
                        color: "#FF00dd",
                      },

                      headerStyle: {
                        backgroundColor: "rgba(196, 196, 196, 0.32)",
                        color: "black",
                      },
                    }}
                    style={{
                      boxShadow: "none",
                      width: "80%",
                      boxSizing: "border-box",
                      paddingLeft: "30px",
                    }}
                  />
                </div>
              ) : (
                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    width: "60%",
                    height: "70%",
                  }}
                >
                  <div className={styles.barChart}>
                    <DataPie
                      series={barData}
                      fill={fill}
                      labels={label}
                      label=""
                    />
                  </div>
                  <div className={styles.barChart}>
                    Count <BarChart labels={barLabel} data={analyticData} />
                    {/* <AntBarChart
                      data={barData}
                      label={label}
                      title="Categories"
                    /> */}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </>
    </>
  );
};

export default QuestionCategories;
