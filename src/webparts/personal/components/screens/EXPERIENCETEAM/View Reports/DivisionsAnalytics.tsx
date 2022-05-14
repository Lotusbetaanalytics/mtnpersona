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

const DivisionAnalyticsReport = () => {
  const [data, setData] = React.useState([]);
  const [findingData, setFindingData] = React.useState(false);
  const [ceoOffice, setCeoOffice] = React.useState(0);
  const [cooOffice, setCooOffice] = React.useState(0);
  const [sales, setSales] = React.useState(0);
  const [informationTechnology, setInformationTechnology] = React.useState(0);
  const [strategy, setStrategy] = React.useState(0);
  const [riskAndCompliance, setRiskAndCompliance] = React.useState(0);
  const [marketing, setMarketing] = React.useState(0);
  const [digitalServices, setDigitalServices] = React.useState(0);
  const [corporateServices, setCorporateServices] = React.useState(0);
  const [customerRelations, setCustomerRelations] = React.useState(0);
  const [enterpriseBusiness, setEnterpriseBusiness] = React.useState(0);
  const [finance, setFinance] = React.useState(0);
  const [internalAudit, setInternalAudit] = React.useState(0);
  const [networks, setNetworks] = React.useState(0);
  const [humanResource, setHumanResource] = React.useState(0);

  const barData = {
    enterpriseBusiness,
    humanResource,
    finance,
    informationTechnology,
    internalAudit,
    ceoOffice,
    corporateServices,
    cooOffice,
    networks,
    strategy,
    digitalServices,
    marketing,
    sales,
    riskAndCompliance,
    customerRelations,
  };

  const history = useHistory();

  React.useEffect(() => {
    setFindingData(true);
    sp.web.lists
      .getByTitle("personal")
      .items.select("division", "AvatarGroup")
      .get()
      .then((items) => {
        setFinance(getGroups(items).finance());
        setCeoOffice(getGroups(items).ceoOffice());
        setCooOffice(getGroups(items).cooOffice());
        setCorporateServices(getGroups(items).corporateServices());
        setSales(getGroups(items).sales());
        setCustomerRelations(getGroups(items).customerRelations());
        setInternalAudit(getGroups(items).internalAudit());
        setInformationTechnology(getGroups(items).informationTechnology());
        setHumanResource(getGroups(items).humanResources());
        setStrategy(getGroups(items).strategy());
        setMarketing(getGroups(items).marketing());
        setRiskAndCompliance(getGroups(items).riskAndCompliance());
        setDigitalServices(getGroups(items).digitalServices());
        setNetworks(getGroups(items).networks());
        setEnterpriseBusiness(getGroups(items).enterpriseBusiness());
        setFindingData(false);
      })
      .catch((err) => {
        console.log(err);
        setFindingData(false);
      });
  }, []);

  const getGroups = (arr) => {
    return {
      ceoOffice: () => {
        let ceoOfficeCount = 0;
        for (let { division } of arr) {
          if (division == "Company Secretariat + CEO Office") {
            ceoOfficeCount = ceoOfficeCount + 1;
          }
        }
        return ceoOfficeCount;
      },
      cooOffice: () => {
        let cooOfficeCount = 0;
        for (let { division } of arr) {
          if (division == "Fixed BroadBand Office + COO’s Office") {
            cooOfficeCount = cooOfficeCount + 1;
          }
        }
        return cooOfficeCount;
      },
      corporateServices: () => {
        let corporateServicesCount = 0;
        for (let { division } of arr) {
          if (division == "Corporate Services") {
            corporateServicesCount = corporateServicesCount + 1;
          }
        }
        return corporateServicesCount;
      },
      customerRelations: () => {
        let customerRelationsCount = 0;
        for (let { division } of arr) {
          if (division == "Customer Relations") {
            customerRelationsCount = customerRelationsCount + 1;
          }
        }
        return customerRelationsCount;
      },
      digitalServices: () => {
        let digitalServicesCount = 0;
        for (let { division } of arr) {
          if (division == "Digital Services") {
            digitalServicesCount = digitalServicesCount + 1;
          }
        }
        return digitalServicesCount;
      },
      enterpriseBusiness: () => {
        let enterpriseBusinessCount = 0;
        for (let { division } of arr) {
          if (division == "Enterprise Business") {
            enterpriseBusinessCount = enterpriseBusinessCount + 1;
          }
        }
        return enterpriseBusinessCount;
      },
      finance: () => {
        let financeCount = 0;
        for (let { division } of arr) {
          if (division == "Finance") {
            financeCount = financeCount + 1;
          }
        }
        return financeCount;
      },
      humanResources: () => {
        let humanResourcesCount = 0;
        for (let { division } of arr) {
          if (division == "Human Resource") {
            humanResourcesCount = humanResourcesCount + 1;
          }
        }
        return humanResourcesCount;
      },
      informationTechnology: () => {
        let informationTechnologyCount = 0;
        for (let { division } of arr) {
          if (division == "Information Technology") {
            informationTechnologyCount = informationTechnologyCount + 1;
          }
        }
        return informationTechnologyCount;
      },
      internalAudit: () => {
        let internalAuditCount = 0;
        for (let { division } of arr) {
          if (division == "Internal Audit and Fraud Forensics") {
            internalAuditCount = internalAuditCount + 1;
          }
        }
        return internalAuditCount;
      },
      marketing: () => {
        let marketingCount = 0;
        for (let { division } of arr) {
          if (division == "Marketing") {
            marketingCount = marketingCount + 1;
          }
        }
        return marketingCount;
      },
      networks: () => {
        let networksCount = 0;
        for (let { division } of arr) {
          if (division == "Networks") {
            networksCount = networksCount + 1;
          }
        }
        return networksCount;
      },
      riskAndCompliance: () => {
        let riskCount = 0;
        for (let { division } of arr) {
          if (division == "Risk and Compliance") {
            riskCount = riskCount + 1;
          }
        }
        return riskCount;
      },
      sales: () => {
        let salesCount = 0;
        for (let { division } of arr) {
          if (division == "Sales and Distribution") {
            salesCount = salesCount + 1;
          }
        }
        return salesCount;
      },
      strategy: () => {
        let strategyCount = 0;
        for (let { division } of arr) {
          if (division == "Strategy and Innovation") {
            strategyCount = strategyCount + 1;
          }
        }
        return strategyCount;
      },
    };
  };

  const pieChartData = [
    {
      x: 1,
      y: finance || 0,
      label: `Finance: ${finance}`,
    },
    {
      x: 2,
      y: sales || 0,
      label: `Sales and Distribution: ${sales}`,
    },
    {
      x: 3,
      y: informationTechnology || 0,
      label: `Information Technology: ${informationTechnology}`,
    },
    {
      x: 4,
      y: riskAndCompliance || 0,
      label: `Risk and Compliance: ${riskAndCompliance}`,
    },
    {
      x: 5,
      y: internalAudit || 0,
      label: `Internal Audit and Fraud Forensics: ${internalAudit}`,
    },
    {
      x: 6,
      y: networks || 0,
      label: `Networks: ${networks}`,
    },
    {
      x: 7,
      y: strategy || 0,
      label: `Strategy and Innovation: ${strategy}`,
    },
    {
      x: 8,
      y: marketing || 0,
      label: `Marketing: ${marketing}`,
    },
    {
      x: 9,
      y: digitalServices || 0,
      label: `Digital Services: ${digitalServices}`,
    },
    {
      x: 10,
      y: ceoOffice || 0,
      label: `Company Secretariat + CEO Office: ${ceoOffice}`,
    },
    {
      x: 11,
      y: cooOffice || 0,
      label: `Fixed BroadBand Office + COO’s Office: ${cooOffice}`,
    },
    {
      x: 12,
      y: customerRelations || 0,
      label: `Customer Relations: ${customerRelations}`,
    },
    {
      x: 13,
      y: enterpriseBusiness || 0,
      label: `Enterprise Business: ${enterpriseBusiness}`,
    },
    {
      x: 14,
      y: corporateServices || 0,
      label: `Corporate Services: ${corporateServices}`,
    },
    {
      x: 15,
      y: humanResource || 0,
      label: `Human Resource: ${humanResource}`,
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
              display: "flex",
              flexDirection: "column",
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

            <div style={{ display: "flex", gap: "20px" }}>
              <div className={styles.barChart}>
                {/* <BarChart data={barData} /> */}
                <PieChart data={pieChartData} />
              </div>
              <div className={styles.barChart}>
                {/* <BarChart data={barData} /> */}
                <PieChart data={pieChartData} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DivisionAnalyticsReport;

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
