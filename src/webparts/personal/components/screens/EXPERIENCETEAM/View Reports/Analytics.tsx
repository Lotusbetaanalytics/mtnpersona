import * as React from "react";
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
  const barData = {
    okoye,
    superMan,
    blackPanther,
    captainAmerica,
    ironMan,
    kingQueenFun,
    batMan,
  };

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
        setIronMan(getGroups(items).ironMan());
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
        return blackPantherCount;
      },
      superMan: () => {
        let superManCount = 0;
        for (let { AvatarGroup } of arr) {
          if (AvatarGroup == "Super Man") {
            superManCount = superManCount + 1;
          }
        }
        return superManCount;
      },
      okoye: () => {
        let okoyeCount = 0;
        for (let { AvatarGroup } of arr) {
          if (AvatarGroup == "Okoye") {
            okoyeCount = okoyeCount + 1;
          }
        }
        return okoyeCount;
      },
      ironMan: () => {
        let ironManCount = 0;
        for (let { AvatarGroup } of arr) {
          if (AvatarGroup == "Iron Man") {
            ironManCount = ironManCount + 1;
          }
        }
        return ironManCount;
      },
      batMan: () => {
        let batManCount = 0;
        for (let { AvatarGroup } of arr) {
          if (AvatarGroup == "Bat Man") {
            batManCount = batManCount + 1;
          }
        }
        return batManCount;
      },
      captainAmerica: () => {
        let captainAmericaCount = 0;
        for (let { AvatarGroup } of arr) {
          if (AvatarGroup == "Captain America") {
            captainAmericaCount = captainAmericaCount + 1;
          }
        }
        return captainAmericaCount;
      },
      kingQueenFun: () => {
        let kingQueenFunCount = 0;
        for (let { AvatarGroup } of arr) {
          if (AvatarGroup == "Super Man") {
            kingQueenFunCount = kingQueenFunCount + 1;
          }
        }
        return kingQueenFunCount;
      },
    };
  };

  const pieChartData = [
    {
      x: 1,
      y: okoye || 0,
      label: `Okoye: ${okoye}`,
    },
    {
      x: 2,
      y: ironMan || 0,
      label: `Iron Man: ${ironMan}`,
    },
    {
      x: 3,
      y: superMan || 0,
      label: `Super Man: ${superMan}`,
    },
    {
      x: 4,
      y: captainAmerica || 0,
      label: `Captain America: ${captainAmerica}`,
    },
    {
      x: 5,
      y: kingQueenFun || 0,
      label: `King/Queen of Fun: ${kingQueenFun}`,
    },
    {
      x: 6,
      y: batMan || 0,
      label: `Bat Man: ${batMan}`,
    },
    {
      x: 7,
      y: blackPanther || 0,
      label: `Black Panther: ${blackPanther}`,
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

            <div className={styles.barChart}>
              {/* <BarChart data={barData} /> */}
              <PieChart data={pieChartData} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnalyticsReport;

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

const labels = ["Avatar Groups"];

export function BarChart({ data }) {
  const alldata = {
    labels,
    datasets: [
      {
        label: "Iron Man",
        data: data.ironMan,
        backgroundColor: "rgba(255, 196, 35, 1)",
      },
      {
        label: "Super Man",
        data: data.superMan,
        backgroundColor: "#006993",
      },
      {
        label: "Okoye",
        data: data.okoye,
        backgroundColor: "#C4C4C4",
      },
      {
        label: "Bat Man",
        data: data.batMan,
        backgroundColor: "#F73D93",
      },
      {
        label: "Black Panther",
        data: data.blackPanther,
        backgroundColor: "#2F8F9D",
      },
      {
        label: "Captain America",
        data: data.captainAmerica,
        backgroundColor: "#F66B0E",
      },
      {
        label: "King/Queen of Fun",
        data: data.kingQueenFun,
        backgroundColor: "#6D8B74",
      },
    ],
  };
  return <Bar options={options} data={alldata} height={120} />;
}

import { VictoryPie, VictoryTooltip } from "victory";

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
      radius={100}
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
