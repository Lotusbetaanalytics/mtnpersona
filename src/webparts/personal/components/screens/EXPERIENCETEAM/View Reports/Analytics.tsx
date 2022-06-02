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
import { Context } from "../../../Personal";
import { MenuItem, Select } from "@material-ui/core";
import QuestionCategories from "./Categories";
import DivisionAnalyticsReport from "./DivisionsAnalytics";
import Regions from "./Regions";
import {
  AntPieChart,
  AntBarChart,
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
  const [analyticsData, setAnalyticsData] = React.useState(1);
  const [selectValue, setSelectValue] = React.useState("");
  const barData = [
    okoye,
    blackPanther,
    superMan,
    ironMan,
    captainAmerica,
    kingQueenFun,
    batMan,
  ];
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

  const label = [
    "Okoye",
    "Black Panther",
    "Super Man",
    "Iron Man",
    "Captain America",
    "King/Queen of Fun",
    "Bat Man",
  ];

  const analyticData = [
    {
      label: "Okoye",
      data: [okoye],
      backgroundColor: "#006993",
    },
    {
      label: "Black Panther",
      data: [blackPanther],
      backgroundColor: "#91CC75",
    },
    {
      label: "Super Man",
      data: [superMan],
      backgroundColor: "#FAC858",
    },
    {
      label: "Iron Man",
      data: [ironMan],
      backgroundColor: "#EE6666",
    },
    {
      label: "Captain America",
      data: [captainAmerica],
      backgroundColor: "#73C0DE",
    },
    {
      label: "Bat Man",
      data: [batMan],
      backgroundColor: "#FC8452",
    },
    {
      label: "King/Queen of Fun",
      data: [kingQueenFun],
      backgroundColor: "#3BA272",
    },
  ];

  const barLabel = ["Avatar Groups"];

  const fill = [
    "#006993",
    "#91CC75",
    "#FAC858",
    "#EE6666",
    "#73C0DE",
    "#FC8452",
    "#3BA272",
  ];
  const pieChartData = [
    {
      value: okoye,
    },
    {
      value: blackPanther,
    },
    {
      value: superMan,
    },
    {
      value: ironMan,
    },
    {
      value: captainAmerica,
    },
    {
      value: kingQueenFun,
    },
    {
      value: batMan,
    },
  ];

  const changeHandler = (e) => {
    setSelectValue(e.target.value);
    if (e.target.value == "Avatar Groups") {
      setAnalyticsData(1);
    } else if (e.target.value === "Question Categories") {
      setAnalyticsData(2);
    } else if (e.target.value === "Divisions") {
      setAnalyticsData(3);
    } else if (e.target.value === "Regions") {
      setAnalyticsData(4);
    }
  };

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
            <div
              style={{ float: "left", boxSizing: "border-box", margin: "20px" }}
            >
              <div>Search</div>
              <Select value={selectValue} onChange={changeHandler} fullWidth>
                <MenuItem value="" selected disabled>
                  Select a search criteria
                </MenuItem>
                {ReportTabs.map((tab) => {
                  return <MenuItem value={tab.title}>{tab.title}</MenuItem>;
                })}
              </Select>
            </div>

            {analyticsData == 1 ? (
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
                        labels={label}
                        label="Avatar Groups"
                        fill={fill}
                      />
                    </div>
                    <div className={styles.barChart}>
                      count <BarChart data={analyticData} labels={barLabel} />
                    </div>
                  </div>
                )}
              </div>
            ) : analyticsData == 2 ? (
              <QuestionCategories />
            ) : analyticsData == 3 ? (
              <DivisionAnalyticsReport />
            ) : (
              <Regions />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AnalyticsReport;
