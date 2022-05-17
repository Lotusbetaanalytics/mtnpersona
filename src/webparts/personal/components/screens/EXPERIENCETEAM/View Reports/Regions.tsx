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

const Regions = () => {
  const [data, setData] = React.useState([]);
  const [questionData, setQuestionData] = React.useState([]);
  const [findingData, setFindingData] = React.useState(false);
  const [show, setShow] = React.useState("Table");
  const { numberOfStaff } = React.useContext(Context);

  const history = useHistory();

  const getRegions = (userResponses, questionID = 2) => {
    const question = userResponses.map(
      ({ responses }) =>
        (JSON.parse(responses).filter((r) => r.id === questionID).length > 0 &&
          JSON.parse(responses).filter((r) => r.id === questionID)[0]) || {
          answer: "",
          section: "",
          id: questionID,
        }
    );
    console.log(question);

    function findSimilarAnswer(arr) {
      let countArr = [];
      let hqArray = [];
      let lswArray = [];
      let easternArray = [];
      let northArray = [];

      for (let i = 0; i < arr.length; i++) {
        if (
          arr[i].answer.trim() ==
          "HQ (MTN Plaza, MTN Penthouse, Y’ellodrome Annex and Akin Adesola)"
        ) {
          hqArray.push(arr[i].answer);
        } else if (
          arr[i].answer.trim() ==
          "LSW (Aromire, Matori, Ojota, Opebi/MM2, Allen, Apapa Switch, VGC, Y’ello City, Ibadan, Benin, Abeokuta)"
        ) {
          lswArray.push(arr[i].answer);
        } else if (
          arr[i].answer.trim() ==
          "Eastern Region (All locations in the Eastern Region)"
        ) {
          easternArray.push(arr[i].answer);
        } else if (
          arr[i].answer.trim() ==
          "Northern Region (All locations in the Northern Region)"
        ) {
          northArray.push(arr[i].answer);
        } else {
          countArr.push(arr[i].answer);
        }
      }

      return [
        {
          region: "Eastern Region (All locations in the Eastern Region)",
          id: 1,
          count: (easternArray.length / numberOfStaff) * 100,
        },
        {
          region:
            "HQ (MTN Plaza, MTN Penthouse, Y’ellodrome Annex and Akin Adesola)",
          id: 2,
          count: (hqArray.length / numberOfStaff) * 100,
        },
        {
          region:
            "LSW (Aromire, Matori, Ojota, Opebi/MM2, Allen, Apapa Switch, VGC, Y’ello City, Ibadan, Benin, Abeokuta)",
          id: 3,
          count: (lswArray.length / numberOfStaff) * 100,
        },
        {
          region: "Northern Region (All locations in the Northern Region)",
          id: 4,
          count: (northArray.length / numberOfStaff) * 100,
        },
      ];
    }

    return findSimilarAnswer(question);
  };

  const columns = [
    { title: "SN", field: "id", type: "string" as const },
    {
      title: "Region",
      field: "region",
      type: "string" as const,
    },
    {
      title: "Submission Count %",
      field: "count",
      type: "string" as const,
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

  const pieChartData = [
    {
      x: 2,
      y: getRegions(data)[0].count || 0,
      label: `Eastern Region (All locations in the Eastern Region): ${
        getRegions(data)[0].count
      }%`,
    },
    {
      x: 3,
      y: getRegions(data)[1].count || 0,
      label: `HQ (MTN Plaza, MTN Penthouse, Y’ellodrome Annex and Akin Adesola): ${
        getRegions(data)[1].count
      }%`,
    },
    {
      x: 4,
      y: getRegions(data)[2].count || 0,
      label: `LSW (Aromire, Matori, Ojota, Opebi/MM2, Allen, Apapa Switch, VGC, Y’ello City, Ibadan, Benin, Abeokuta): ${
        getRegions(data)[2].count
      }%`,
    },
    {
      x: 7,
      y: getRegions(data)[3].count || 0,
      label: `Northern Region (All locations in the Northern Region): ${
        getRegions(data)[3].count
      }%`,
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
                    title={`Regions Submission Report`}
                    columns={columns}
                    data={getRegions(data)}
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

export default Regions;

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
import { Context } from "../../../Personal";

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
