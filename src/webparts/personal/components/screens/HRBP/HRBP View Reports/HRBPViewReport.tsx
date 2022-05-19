import * as React from "react";
import { forwardRef } from "react";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import MaterialTable from "material-table";
import { useHistory } from "react-router-dom";
import styles from "./report.module.scss";
import { sp } from "@pnp/sp";
import { Spinner } from "office-ui-fabric-react";
import ExperienceTeamHeader from "../../EXPERIENCETEAM/Experience Team Header/ExperienceTeamHeader";
import HrbpNavbar from "../HRBP Navbar/HRBPNavbar";
import { FormControl, MenuItem, Select } from "@material-ui/core";
import Filter from "../../../Containers/Filter/Filter";

const HrbpViewReport = () => {
  const columns = [
    { title: "Employee Name", field: "name", type: "string" as const },
    { title: "Email", field: "email", type: "string" as const },
    { title: "Employee Alias", field: "alias", type: "string" as const },
    { title: "Division", field: "division", type: "string" as const },
    { title: "Approval Status", field: "EXApprovalStatus" },
  ];

  const [data, setData] = React.useState([]);
  const [findingData, setFindingData] = React.useState(false);
  const [divisions, setDivisions] = React.useState([]);
  const [filtered, setFiltered] = React.useState([]);
  const [selected, setSelected] = React.useState("Choose Division");
  const [showDivisionSelect, setShowDivisionSelection] = React.useState(false);
  const [user, setUser] = React.useState({
    division: "",
  });

  const history = useHistory();

  React.useEffect(() => {
    setFindingData(true);
    sp.profiles.myProperties.get().then((data) => {
      sp.web.lists
        .getByTitle("Roles")
        .items.filter(`Email eq '${data.Email}'`)
        .get()
        .then((items: any) => {
          setUser({ division: items[0].Division });
        });
    });
  }, []);

  React.useEffect(() => {
    sp.web.lists
      .getByTitle("personal")
      .items.filter(`division eq '${user.division}'`)
      .get()
      .then((items: any) => {
        setFindingData(false);
        setData(items);
      });
  }, [user]);

  React.useEffect(() => {
    sp.web.lists
      .getByTitle("MTN DIVISION")
      .items.get()
      .then((items: any) => {
        setDivisions(items);
      });
  }, []);

  const filterHandler = (param) => {
    setSelected(param);

    const filteredData = data.filter((item: any) => {
      return item.division === param;
    });
    setFiltered(filteredData);
  };

  return (
    <div className={styles.report__container}>
      <HrbpNavbar />
      <div className={styles.report__container__content}>
        <ExperienceTeamHeader title="Report" />
        {findingData ? (
          <div className={styles.spinner}>
            <Spinner />
          </div>
        ) : (
          <>
            {/* <>
              <Filter
                showSelect={showDivisionSelect}
                setShowSelection={setShowDivisionSelection}
                value={selected}
              >
                <div
                  style={{
                    maxHeight: "450px",
                    border: "1px solid rgba(0, 0, 0, 0.31)",
                    overflowY: "scroll",
                    backgroundColor: "#fff",
                  }}
                >
                  {divisions.map(({ Division: division }) => {
                    return (
                      <div
                        className={styles.container__content__select}
                        onClick={() => {
                          setShowDivisionSelection(false);
                          filterHandler(division);
                        }}
                      >
                        <div
                          style={{
                            flex: 1,
                          }}
                        >
                          {division}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Filter>
            </> */}
            <>Division: {user.division}</>
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
              title={`Total Submitted Surveys: ${filtered.length}`}
              columns={columns}
              data={data}
              options={{
                exportButton: true,
                actionsCellStyle: {
                  color: "#FF00dd",
                },
                actionsColumnIndex: -1,

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
              actions={[
                {
                  icon: "visibility",
                  iconProps: {
                    style: { fontSize: "20px", color: "gold" },
                  },
                  tooltip: "View More",

                  onClick: (event, rowData) => {
                    history.push(`/experienceteam/report/${rowData.ID}`);
                  },
                },
              ]}
              components={{
                Action: (props) => (
                  <button
                    onClick={(event) => props.action.onClick(event, props.data)}
                    className={`${styles.mtn__btn__table} ${styles.mtn__black}`}
                  >
                    <span>{props.action.tooltip}</span>
                  </button>
                ),
              }}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default HrbpViewReport;