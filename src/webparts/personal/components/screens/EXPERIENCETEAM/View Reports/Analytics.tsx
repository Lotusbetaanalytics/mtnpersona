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
import { VictoryPie, VictoryTooltip, VictoryBar } from "victory";
import { Context } from "../../../Personal";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const AnalyticsReport = () => {
  const [data, setData] = React.useState([]);
  const [findingData, setFindingData] = React.useState(false);
  const [okoye, setOkoye] = React.useState(0);
  const [superMan, setSuperMan] = React.useState(0);
  const [blackPanther, setBlackPanther] = React.useState(0);
  const [captainAmerica, setCaptainAmerica] = React.useState(0);
  const [ironMan, setIronMan] = React.useState(0);
  const [kingQueenFun, setKingQueenFun] = React.useState(0);
  const [batMan, setBatMan] = React.useState(0);
  const [show, setShow] = React.useState("Table");
  const barData = {
    okoye,
    superMan,
    blackPanther,
    captainAmerica,
    ironMan,
    kingQueenFun,
    batMan,
  };
  const tableData = [
    { id: 1, Category: "Okoye", count: okoye },
    { id: 2, Category: "Black Panther", count: blackPanther },
    { id: 3, Category: "Super Man", count: superMan },
    { id: 4, Category: "Bat Man", count: batMan },
    { id: 5, Category: "Iron Man", count: ironMan },
    { id: 6, Category: "Captain America", count: captainAmerica },
    { id: 7, Category: "King/Queen of Fun", count: kingQueenFun },
  ];

  const { numberOfStaff } = React.useContext(Context);

  const columns = [
    { title: "SN", field: "id", type: "string" as const },
    { title: "Persona Category", field: "Category", type: "string" as const },
    { title: "Count", field: "count", type: "string" as const },
  ];

  const history = useHistory();

  React.useEffect(() => {
    setFindingData(true);
    sp.web.lists
      .getByTitle("personal")
      .items.select("division", "AvatarGroup")
      .get()
      .then((items) => {
        setOkoye(getGroups(items).okoye());
        setSuperMan(getGroups(items).superMan());
        setBlackPanther(getGroups(items).blackPanther());
        setCaptainAmerica(getGroups(items).captainAmerica());
        setIronMan(getGroups(items).ironMan());
        setKingQueenFun(getGroups(items).kingQueenFun());

        setBatMan(getGroups(items).batMan());
        setData(items);
        setFindingData(false);
      })
      .catch((err) => {
        console.log(err);
        setFindingData(false);
      });
  }, []);

  const getGroups = (arr) => {
    return {
      blackPanther: () => {
        let blackPantherCount = 0;
        for (let { AvatarGroup } of arr) {
          if (AvatarGroup == "Black Panther") {
            blackPantherCount = blackPantherCount + 1;
          }
        }
        return Math.round((blackPantherCount / numberOfStaff) * 100);
      },
      superMan: () => {
        let superManCount = 0;
        for (let { AvatarGroup } of arr) {
          if (AvatarGroup == "Super Man") {
            superManCount = superManCount + 1;
          }
        }
        return Math.round((superManCount / numberOfStaff) * 100);
      },
      okoye: () => {
        let okoyeCount = 0;
        for (let { AvatarGroup } of arr) {
          if (AvatarGroup == "Okoye") {
            okoyeCount = okoyeCount + 1;
          }
        }
        return Math.round((okoyeCount / numberOfStaff) * 100);
      },
      ironMan: () => {
        let ironManCount = 0;
        for (let { AvatarGroup } of arr) {
          if (AvatarGroup == "Iron Man") {
            ironManCount = ironManCount + 1;
          }
        }
        return Math.round((ironManCount / numberOfStaff) * 100);
      },
      batMan: () => {
        let batManCount = 0;
        for (let { AvatarGroup } of arr) {
          if (AvatarGroup == "Bat Man") {
            batManCount = batManCount + 1;
          }
        }
        return Math.round((batManCount / numberOfStaff) * 100);
      },
      captainAmerica: () => {
        let captainAmericaCount = 0;
        for (let { AvatarGroup } of arr) {
          if (AvatarGroup == "Captain America") {
            captainAmericaCount = captainAmericaCount + 1;
          }
        }
        return Math.round((captainAmericaCount / numberOfStaff) * 100);
      },
      kingQueenFun: () => {
        let kingQueenFunCount = 0;
        for (let { AvatarGroup } of arr) {
          if (AvatarGroup == "Super Man") {
            kingQueenFunCount = kingQueenFunCount + 1;
          }
        }
        return Math.round((kingQueenFunCount / numberOfStaff) * 100);
      },
    };
  };

  const pieChartData = [
    {
      x: 1,
      y: okoye || 0,
      label: `Okoye: ${okoye}%`,
    },
    {
      x: 2,
      y: ironMan || 0,
      label: `Iron Man: ${ironMan}%`,
    },
    {
      x: 3,
      y: superMan || 0,
      label: `Super Man: ${superMan}%`,
    },
    {
      x: 4,
      y: captainAmerica || 0,
      label: `Captain America: ${captainAmerica}%`,
    },
    {
      x: 5,
      y: kingQueenFun || 0,
      label: `King/Queen of Fun: ${kingQueenFun}%`,
    },
    {
      x: 6,
      y: batMan || 0,
      label: `Bat Man: ${batMan}%`,
    },
    {
      x: 7,
      y: blackPanther || 0,
      label: `Black Panther: ${blackPanther}%`,
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
          <div style={{ width: "100%", height: "100%" }}>
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
                    title={`Persona Categories`}
                    columns={columns}
                    data={tableData}
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

export default AnalyticsReport;

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
      ]}
      style={{ labels: { fontSize: "12px" } }}
      labelComponent={
        <VictoryTooltip
          cornerRadius={({ datum }) => datum.x * 2}
          flyoutStyle={{ fontSize: "12px" }}
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
