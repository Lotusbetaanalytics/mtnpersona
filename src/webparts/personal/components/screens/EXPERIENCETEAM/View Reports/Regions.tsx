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
import { Context } from "../../../Personal";
import {
  AntBarChart,
  AntPieChart,
} from "../../../Containers/AntChart/PieChart";
import BarChart from "../../../Containers/Bar Chart/BarChart";
import DataPie from "../../../Containers/Pie Chart/PieChart";

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
      value: getRegions(data)[0].count || 0,
      name: `Eastern Region (All locations in the Eastern Region)`,
    },
    {
      value: getRegions(data)[1].count || 0,
      name: `HQ (MTN Plaza, MTN Penthouse, Y’ellodrome Annex and Akin Adesola)`,
    },
    {
      value: getRegions(data)[2].count || 0,
      name: `LSW (Aromire, Matori, Ojota, Opebi/MM2, Allen, Apapa Switch, VGC, Y’ello City, Ibadan, Benin, Abeokuta)`,
    },
    {
      value: getRegions(data)[3].count || 0,
      name: `Northern Region (All locations in the Northern Region)`,
    },
  ];

  const barData = [
    getRegions(data)[0].count,
    getRegions(data)[1].count,
    getRegions(data)[2].count,
    getRegions(data)[3].count,
  ];

  const label = [
    `Eastern Region (All locations in the Eastern Region)`,
    `HQ (MTN Plaza, MTN Penthouse, Y’ellodrome Annex and Akin Adesola)`,
    `LSW (Aromire, Matori, Ojota, Opebi/MM2, Allen, Apapa Switch, VGC, Y’ello City, Ibadan, Benin, Abeokuta)`,
    `Northern Region (All locations in the Northern Region)`,
  ];

  const fill = ["#006993", "#91CC75", "#FAC858", "#EE6666"];

  const analyticData = [
    {
      label: "Eastern Region (All locations in the Eastern Region)",
      data: [getRegions(data)[0].count],
      backgroundColor: "#006993",
    },
    {
      label:
        "HQ (MTN Plaza, MTN Penthouse, Y’ellodrome Annex and Akin Adesola)",
      data: [getRegions(data)[1].count],
      backgroundColor: "#91CC75",
    },
    {
      label:
        "LSW (Aromire, Matori, Ojota, Opebi/MM2, Allen, Apapa Switch, VGC, Y’ello City, Ibadan, Benin, Abeokuta)",
      data: [getRegions(data)[2].count],
      backgroundColor: "#FAC858",
    },
    {
      label: "Northern Region (All locations in the Northern Region)",
      data: [getRegions(data)[3].count],
      backgroundColor: "#EE6666",
    },
  ];

  const barLabel = ["Regions"];
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
                    title={`Regions Submission Report`}
                    columns={columns}
                    data={getRegions(data)}
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
                      marginLeft: "25px",
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
                    {/* <AntBarChart data={barData} label={label} title="Regions" /> */}
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

export default Regions;
