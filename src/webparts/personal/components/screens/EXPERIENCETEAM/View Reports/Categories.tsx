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

const QuestionCategories = () => {
  const [data, setData] = React.useState([]);
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

  const history = useHistory();

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

const labels = ["Avatar Groups"];

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
        "#F9CEEE",
        "#112B3C",
        "#9900F0",
        "#A97155",
        "#FF8080",
        "#3A3845",
        "#4D77FF",
      ]}
      radius={200}
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
