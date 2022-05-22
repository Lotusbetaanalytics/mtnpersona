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

import ExperienceTeamNavbar from "../Experience Team Navbar/ExperienceTeamNavbar";
import styles from "./report.module.scss";
import { sp } from "@pnp/sp";
import { Spinner } from "office-ui-fabric-react";
import { ReportTabs } from "../../../Containers/Options/Options";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

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

  const barData = {
    motivator,
    worries,
    priorities,
    interests,
    communication,
    attributes,
    learning,
    goals,
    bio,
  };

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
      x: 2,
      y: goals || 0,
      label: `Goals: ${goals}`,
    },
    {
      x: 3,
      y: motivator || 0,
      label: `Motivator: ${motivator}`,
    },
    {
      x: 4,
      y: bio || 0,
      label: `Short Bio: ${bio}`,
    },
    {
      x: 7,
      y: communication || 0,
      label: `Communication Preference: ${communication}`,
    },
    {
      x: 8,
      y: learning || 0,
      label: `Learning Style: ${learning}`,
    },
    {
      x: 9,
      y: attributes || 0,
      label: `Super Power and Key Attributes: ${attributes}`,
    },
    {
      x: 10,
      y: worries || 0,
      label: `Worries: ${worries}`,
    },
    {
      x: 11,
      y: interests || 0,
      label: `Interests: ${interests}`,
    },

    {
      x: 14,
      y: priorities || 0,
      label: `Priorities: ${priorities}`,
    },
  ];

  return (
    <div className={styles.report__container}>
      <ExperienceTeamNavbar />
      <div className={styles.report__container__content}>
        <div>
          <ExperienceTeamHeader title="Analytical Report" />
        </div>
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
            <div className={styles.tabs}>
              {ReportTabs.map((tab, index) => {
                return (
                  <div
                    className={`${styles.tabBtn} ${
                      tab.active && styles.active
                    }`}
                    onClick={() => {
                      history.push(tab.url);
                      ReportTabs.filter(({ id }) => {
                        return id === tab.id;
                      })[0].active = true;
                      ReportTabs.filter(({ id }) => {
                        return id !== tab.id;
                      }).map((tab) => {
                        return (tab.active = false);
                      });
                    }}
                  >
                    {tab.title}
                  </div>
                );
              })}
            </div>

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
                    width: "80%",
                    height: "70%",
                  }}
                >
                  <div className={styles.barChart}>
                    <PieChart data={pieChartData} />
                  </div>
                  <div className={styles.barChart}>
                    <NewBarChart data={pieChartData} />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionCategories;

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "",
    },
    toolbar: {
      display: true,
    },
  },
};

const labels = ["Question Groups"];

export function BarChart({ data }) {
  const alldata = {
    labels,
    datasets: [
      {
        label: "Learning",
        data: data.learning,
        backgroundColor: "rgba(255, 196, 35, 1)",
      },
      {
        label: "Goals",
        data: data.goals,
        backgroundColor: "#006993",
      },
      {
        label: "Motivator",
        data: data.motivator,
        backgroundColor: "#C4C4C4",
      },
      {
        label: "Short Bio",
        data: data.bio,
        backgroundColor: "#F73D93",
      },
      {
        label: "Priorities",
        data: data.priorities,
        backgroundColor: "#2F8F9D",
      },
      {
        label: "Worries",
        data: data.worries,
        backgroundColor: "#F66B0E",
      },
      {
        label: "Interests",
        data: data.interests,
        backgroundColor: "#6D8B74",
      },
      {
        label: "Communication",
        data: data.communication,
        backgroundColor: "#6D8B74",
      },
      {
        label: "Super Power and Key Attributes",
        data: data.attributes,
        backgroundColor: "#6D8B74",
      },
    ],
  };
  return <Bar options={options} data={alldata} height={180} />;
}

import { VictoryPie, VictoryTooltip, VictoryBar } from "victory";

export const PieChart = ({ data }) => {
  return (
    <VictoryPie
      data={data}
      colorScale={[
        "#006993",
        "#C4C4C4",
        "#FFC423",
        "#F66B0E",
        "#2F8F9D",
        "#F73D93",
        "#6D8B74",
        "#F9CEEE",
        "#112B3C",
        "#9900F0",
        "#A97155",
        "#FF8080",
        "#3A3845",
        "#4D77FF",
      ]}
      radius={100}
      style={{ labels: { fontSize: "12px" } }}
      labelComponent={
        <VictoryTooltip
          cornerRadius={({ datum }) => datum.x * 2}
          flyoutStyle={{ fontSize: "12px", padding: "10px" }}
        />
      }
    />
  );
};

export const NewBarChart = ({ data }) => {
  return (
    <VictoryBar
      minDomain={0}
      data={data}
      colorScale={[
        "#006993",
        "#C4C4C4",
        "#FFC423",
        "#F66B0E",
        "#2F8F9D",
        "#F73D93",
        "#6D8B74",
      ]}
      style={{ labels: { fontSize: "12px" }, data: { fill: "#006993" } }}
      labelComponent={
        <VictoryTooltip
          cornerRadius={({ datum }) => datum.x * 2}
          dy={({ datum }) => datum.y * -5}
        />
      }
      name="Avatar Groups"
      width={600}
      height={400}
      labels={({ datum }) => `${datum.label}`}
    />
  );
};
