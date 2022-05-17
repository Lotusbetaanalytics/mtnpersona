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

const DivisionAnalyticsReport = () => {
  const { numberOfStaff } = React.useContext(Context);
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
  const [show, setShow] = React.useState("Chart");

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

  const tableData = [
    { id: 1, Category: "Information Technology", count: informationTechnology },
    { id: 2, Category: "Finance", count: finance },
    { id: 3, Category: "Customer Relations", count: customerRelations },
    { id: 4, Category: "Digital Services", count: digitalServices },
    { id: 5, Category: "Marketing", count: marketing },
    { id: 6, Category: "Risk and Compliance", count: riskAndCompliance },
    { id: 7, Category: "Strategy and Innovation", count: strategy },
    { id: 8, Category: "Company Secretariat + CEO Office", count: ceoOffice },
    {
      id: 9,
      Category: "Fixed BroadBand Office + COO’s Office",
      count: cooOffice,
    },
    { id: 10, Category: "Corporate Services", count: corporateServices },
    { id: 11, Category: "Networks", count: networks },
    {
      id: 12,
      Category: "Enterprise Business",
      count: enterpriseBusiness,
    },
    { id: 13, Category: "Human Resources", count: humanResource },
    {
      id: 14,
      Category: "Internal Audit and Fraud Forensics",
      count: internalAudit,
    },
    { id: 15, Category: "Sales and Distribution", count: sales },
  ];

  const columns = [
    { title: "SN", field: "id", type: "string" as const },
    { title: "Division", field: "Category", type: "string" as const },
    { title: "Response Count", field: "count", type: "string" as const },
  ];

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
        return Math.round((ceoOfficeCount / numberOfStaff) * 100);
      },
      cooOffice: () => {
        let cooOfficeCount = 0;
        for (let { division } of arr) {
          if (division == "Fixed BroadBand Office + COO’s Office") {
            cooOfficeCount = cooOfficeCount + 1;
          }
        }
        return Math.round((cooOfficeCount / numberOfStaff) * 100);
      },
      corporateServices: () => {
        let corporateServicesCount = 0;
        for (let { division } of arr) {
          if (division == "Corporate Services") {
            corporateServicesCount = corporateServicesCount + 1;
          }
        }
        return Math.round((corporateServicesCount / numberOfStaff) * 100);
      },
      customerRelations: () => {
        let customerRelationsCount = 0;
        for (let { division } of arr) {
          if (division == "Customer Relations") {
            customerRelationsCount = customerRelationsCount + 1;
          }
        }
        return Math.round((customerRelationsCount / numberOfStaff) * 100);
      },
      digitalServices: () => {
        let digitalServicesCount = 0;
        for (let { division } of arr) {
          if (division == "Digital Services") {
            digitalServicesCount = digitalServicesCount + 1;
          }
        }
        return Math.round((digitalServicesCount / numberOfStaff) * 100);
      },
      enterpriseBusiness: () => {
        let enterpriseBusinessCount = 0;
        for (let { division } of arr) {
          if (division == "Enterprise Business") {
            enterpriseBusinessCount = enterpriseBusinessCount + 1;
          }
        }
        return Math.round((enterpriseBusinessCount / numberOfStaff) * 100);
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
        return Math.round((humanResourcesCount / numberOfStaff) * 100);
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
        return Math.round((internalAuditCount / numberOfStaff) * 100);
      },
      marketing: () => {
        let marketingCount = 0;
        for (let { division } of arr) {
          if (division == "Marketing") {
            marketingCount = marketingCount + 1;
          }
        }
        return Math.round((marketingCount / numberOfStaff) * 100);
      },
      networks: () => {
        let networksCount = 0;
        for (let { division } of arr) {
          if (division == "Networks") {
            networksCount = networksCount + 1;
          }
        }
        return Math.round((networksCount / numberOfStaff) * 100);
      },
      riskAndCompliance: () => {
        let riskCount = 0;
        for (let { division } of arr) {
          if (division == "Risk and Compliance") {
            riskCount = riskCount + 1;
          }
        }
        return Math.round((riskCount / numberOfStaff) * 100);
      },
      sales: () => {
        let salesCount = 0;
        for (let { division } of arr) {
          if (division == "Sales and Distribution") {
            salesCount = salesCount + 1;
          }
        }
        return Math.round((salesCount / numberOfStaff) * 100);
      },
      strategy: () => {
        let strategyCount = 0;
        for (let { division } of arr) {
          if (division == "Strategy and Innovation") {
            strategyCount = strategyCount + 1;
          }
        }
        return Math.round((strategyCount / numberOfStaff) * 100);
      },
    };
  };

  const pieChartData = [
    {
      x: 1,
      y: finance || 0,
      label: `Finance: ${finance}%`,
    },
    {
      x: 2,
      y: sales || 0,
      label: `Sales and Distribution: ${sales}%`,
    },
    {
      x: 3,
      y: informationTechnology || 0,
      label: `Information Technology: ${informationTechnology}%`,
    },
    {
      x: 4,
      y: riskAndCompliance || 0,
      label: `Risk and Compliance: ${riskAndCompliance}%`,
    },
    {
      x: 5,
      y: internalAudit || 0,
      label: `Internal Audit and Fraud Forensics: ${internalAudit}%`,
    },
    {
      x: 6,
      y: networks || 0,
      label: `Networks: ${networks}%`,
    },
    {
      x: 7,
      y: strategy || 0,
      label: `Strategy and Innovation: ${strategy}%`,
    },
    {
      x: 8,
      y: marketing || 0,
      label: `Marketing: ${marketing}%`,
    },
    {
      x: 9,
      y: digitalServices || 0,
      label: `Digital Services: ${digitalServices}%`,
    },
    {
      x: 10,
      y: ceoOffice || 0,
      label: `Company Secretariat + CEO Office: ${ceoOffice}%`,
    },
    {
      x: 11,
      y: cooOffice || 0,
      label: `Fixed BroadBand Office + COO’s Office: ${cooOffice}%`,
    },
    {
      x: 12,
      y: customerRelations || 0,
      label: `Customer Relations: ${customerRelations}%`,
    },
    {
      x: 13,
      y: enterpriseBusiness || 0,
      label: `Enterprise Business: ${enterpriseBusiness}%`,
    },
    {
      x: 14,
      y: corporateServices || 0,
      label: `Corporate Services: ${corporateServices}%`,
    },
    {
      x: 15,
      y: humanResource || 0,
      label: `Human Resource: ${humanResource}%`,
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
              {show === "Table" ? (
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

const labels = ["Submissions from Divisions"];

export function BarChart({ data }) {
  const alldata = {
    labels,
    datasets: [
      {
        label: "Finance",
        data: data.finance,
        backgroundColor: "rgba(255, 196, 35, 1)",
      },
      {
        label: "Sales and Distribution",
        data: data.sales,
        backgroundColor: "#006993",
      },
      {
        label: "Information Technology",
        data: data.informationTechnology,
        backgroundColor: "#C4C4C4",
      },
      {
        label: "Risk and Compliance",
        data: data.riskAndCompliance,
        backgroundColor: "#F73D93",
      },
      {
        label: "Internal Audit and Fraud Forensics",
        data: data.internalAudit,
        backgroundColor: "#2F8F9D",
      },
      {
        label: "Networks",
        data: data.networks,
        backgroundColor: "#F66B0E",
      },
      {
        label: "Strategy and Innovation",
        data: data.strategy,
        backgroundColor: "#6D8B74",
      },
      {
        label: "Marketing",
        data: data.marketing,
        backgroundColor: "#6D8B74",
      },
      {
        label: "Digital Services",
        data: data.digitalServices,
        backgroundColor: "#6D8B74",
      },
      {
        label: "Company Secretariat + CEO Office",
        data: data.coOffice,
        backgroundColor: "#6D8B74",
      },
      {
        label: "Fixed BroadBand Office + COO’s Office",
        data: data.cooOffice,
        backgroundColor: "#6D8B74",
      },
      {
        label: "Customer Relations",
        data: data.customerRelations,
        backgroundColor: "#6D8B74",
      },
      {
        label: "Enterprise Business",
        data: data.enterpriseBusiness,
        backgroundColor: "#6D8B74",
      },
      {
        label: "Corporate Services",
        data: data.corporateServices,
        backgroundColor: "#6D8B74",
      },
      {
        label: "Human Resource",
        data: data.humanResource,
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
      style={{ labels: { fontSize: "12px" }, data: { fill: "#FFC423" } }}
      labelComponent={
        <VictoryTooltip
          cornerRadius={({ datum }) => datum.x * 2}
          dy={({ datum }) => datum.y * -5}
        />
      }
      labels={({ datum }) => `${datum.label}`}
    />
  );
};
