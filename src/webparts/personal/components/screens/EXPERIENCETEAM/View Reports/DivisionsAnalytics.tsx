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
import {
  AntBarChart,
  AntPieChart,
} from "../../../Containers/AntChart/PieChart";
import { Context } from "../../../Personal";
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
  const [show, setShow] = React.useState("Table");

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
      value: finance,
      name: `Finance`,
    },
    {
      value: sales,
      name: `Sales and Distribution`,
    },
    {
      value: informationTechnology,
      name: `Information Technology`,
    },
    {
      value: riskAndCompliance,
      name: `Risk and Compliance`,
    },
    {
      value: internalAudit,
      name: `Internal Audit and Fraud Forensics`,
    },
    {
      value: networks,
      name: `Networks`,
    },
    {
      value: strategy,
      name: `Strategy and Innovation`,
    },
    {
      value: marketing,
      name: `Marketing`,
    },
    {
      value: digitalServices,
      name: `Digital Services`,
    },
    {
      value: ceoOffice,
      name: `Company Secretariat + CEO Office`,
    },
    {
      value: cooOffice,
      name: `Fixed BroadBand Office + COO’s Office`,
    },
    {
      value: customerRelations,
      name: `Customer Relations`,
    },
    {
      value: enterpriseBusiness || 0,
      name: `Enterprise Business`,
    },
    {
      value: corporateServices || 0,
      name: `Corporate Services`,
    },
    {
      value: humanResource || 0,
      name: `Human Resource`,
    },
  ];

  const label = [
    "Finance",
    "Sales and Distribution",
    "Information Technology",
    "Risk and Compliance",
    "Internal Audit and Fraud Forensics",
    "Networks",
    "Strategy and Innovation",
    "Marketing",
    "Digital Services",
    "Company Secretariat + CEO Office",
    "Fixed BroadBand Office + COO’s Office",
    "Customer Relations",
    "Enterprise Business",
    "Corporate Services",
    "Human Resource",
  ];

  const analyticData = [
    {
      label: "Finance",
      data: [finance],
      backgroundColor: "#006993",
    },
    {
      label: "Sales and Distribution",
      data: [sales],
      backgroundColor: "#91CC75",
    },
    {
      label: "Information Technology",
      data: [informationTechnology],
      backgroundColor: "#FAC858",
    },
    {
      label: "Risk and Compliance",
      data: [riskAndCompliance],
      backgroundColor: "#EE6666",
    },
    {
      label: "Internal Audit and Fraud Forensics",
      data: [internalAudit],
      backgroundColor: "#FFCD56",
    },
    {
      label: "Networks",
      data: [networks],
      backgroundColor: "#FF8C00",
    },
    {
      label: "Strategy and Innovation",
      data: [strategy],
      backgroundColor: "#FFD700",
    },
    {
      label: "Marketing",
      data: [marketing],
      backgroundColor: "#FF3C00",
    },
    {
      label: "Digital Services",
      data: [digitalServices],
      backgroundColor: "#00092C",
    },
    {
      label: "Company Secretariat + CEO Office",
      data: [ceoOffice],
      backgroundColor: "#4700D8",
    },
    {
      label: "Fixed BroadBand Office + COO’s Office",
      data: [cooOffice],
      backgroundColor: "#8E3200",
    },
    {
      label: "Customer Relations",
      data: [customerRelations],
      backgroundColor: "#125B50",
    },
    {
      label: "Enterprise Business",
      data: [enterpriseBusiness],
      backgroundColor: "#68A7AD",
    },
    {
      label: "Corporate Services",
      data: [corporateServices],
      backgroundColor: "#F9CEEE",
    },
    {
      label: "Human Resource",
      data: [humanResource],
      backgroundColor: "#15133C",
    },
  ];

  const barLabel = ["Divisions"];

  const barData = [
    finance,
    sales,
    informationTechnology,
    riskAndCompliance,
    internalAudit,
    networks,
    strategy,
    marketing,
    digitalServices,
    ceoOffice,
    cooOffice,
    customerRelations,
    enterpriseBusiness,
    corporateServices,
    humanResource,
  ];

  const fill = [
    "#006993",
    "#91CC75",
    "#FAC858",
    "#EE6666",
    "#FFCD56",
    "#FF8C00",
    "#FFD700",
    "#FF3C00",
    "#00092C",
    "#4700D8",
    "#8E3200",
    "#125B50",
    "#68A7AD",
    "#F9CEEE",
    "#15133C",
  ];

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
                    title={`Divisions`}
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
                    {/* <AntPieChart
                      data={pieChartData}
                      title="Divisions"
                      label={[]}
                    /> */}

                    <DataPie
                      series={barData}
                      labels={label}
                      label=""
                      fill={fill}
                    />
                  </div>
                  <div className={styles.barChart}>
                    Count <BarChart labels={barLabel} data={analyticData} />
                    {/* <AntBarChart data={barData} label={label} title="" /> */}
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

export default DivisionAnalyticsReport;
