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
import MaterialTable, { MTableToolbar } from "material-table";
import { useHistory } from "react-router-dom";
import styles from "./report.module.scss";
import { sp } from "@pnp/sp";
import { Spinner } from "office-ui-fabric-react";
import ExperienceTeamHeader from "../../EXPERIENCETEAM/Experience Team Header/ExperienceTeamHeader";
import HrbpNavbar from "../HRBP Navbar/HRBPNavbar";
import { Chip, FormControl, MenuItem, Select } from "@material-ui/core";
import Filter from "../../../Containers/Filter/Filter";

const HrbpViewReport = () => {
  const [questionsArr, setQuestions] = React.useState([]);
  const [field, setField] = React.useState([]);
  const getSection = (res, item, id) => {
    const sectionResponses = res.filter(({ section }) => section === item);
    return sectionResponses;
  };

  const get = (questions) => {
    const obj = [];
    for (let i = 0; i < questions.length; i++) {
      obj.push({
        title: questions[i].questions,
        field: `${questions[i].questions}`,
        type: "string",
        render: ({ res }) => {
          return res
            .filter((response) => {
              return response && response["question"] == questions[i].questions;
            })
            .map((response) => {
              return (
                <li style={{ fontSize: "10px" }}>
                  {response[questions[i].questions]}
                </li>
              );
            });
        },
        export: true,
        hidden: true,
      });
    }

    return obj;
  };

  const spoolAnswers = (res) => {
    const arr = [];
    for (let { question, answer } of res) {
      arr.push([question, answer]);
    }
    return Object.fromEntries(arr);
  };

  const mapQuestions = (responses) => {
    return responses.map(
      ({ responses, name, email, dp, alias, AvatarGroup, ID, division }) => {
        responses = JSON.parse(responses);
        return {
          name,
          division,
          ID,
          email,
          alias,
          dp,
          AvatarGroup,
          responses: JSON.stringify(responses),
          res: responses.map(({ question, answer }) => {
            return {
              [question]: answer,
              question,
            };
          }),
          ...spoolAnswers(responses),
        };
      }
    );
  };

  const columns = [
    {
      title: "Photo",
      field: "dp",
      type: "string" as const,
      export: false,
      render: (rowData) => {
        return (
          <img
            src={rowData.dp}
            alt="DP"
            style={{ width: "100px", height: "100px" }}
          />
        );
      },
    },
    {
      title: "Employee Name",
      field: "name",
      type: "string" as const,
      searchable: true,
    },
    {
      title: "Email",
      field: "email",
      type: "string" as const,
      searchable: true,
    },
    {
      title: "Employee Alias",
      field: "alias",
      type: "string" as const,
      searchable: true,
    },
    {
      title: "Division",
      field: "division",
      type: "string" as const,
      searchable: true,
    },
    {
      title: "Avatar Group",
      field: "AvatarGroup",
      type: "string" as const,
      searchable: true,
    },

    ...field,
  ];

  const [data, setData] = React.useState([]);
  const [findingData, setFindingData] = React.useState(false);
  const [assignedDivision, setAssignedDivision] = React.useState([]);
  const searchRef = React.useRef<HTMLInputElement>(null);
  const paramRef = React.useRef<HTMLDivElement>(null);

  const history = useHistory();

  React.useEffect(() => {
    sp.web.lists
      .getByTitle("Questions")
      .items.select("questions,ID")
      .get()
      .then((questions) => {
        setField(get(questions));
      });
  }, [data]);

  React.useEffect(() => {
    sp.profiles.myProperties.get().then((data) => {
      sp.web.lists
        .getByTitle("Roles")
        .items.filter(`Email eq '${data.Email}'`)
        .get()
        .then((items: any) => {
          const { Role, BpDivisions } = items.filter(
            (item) => item.Role == "HRBP"
          )[0];

          BpDivisions && localStorage.setItem("asd", BpDivisions);
        });
    });
  }, []);

  const assignedDivisions = localStorage.getItem("asd");

  React.useEffect(() => {
    if (assignedDivisions) {
      sp.web.lists
        .getByTitle("personal")
        .items.get()
        .then((items: any) => {
          setFindingData(false);
          const data = items.filter(({ division }) => {
            return (
              assignedDivisions &&
              JSON.parse(localStorage.getItem("asd")).includes(division)
            );
          });
          setData(mapQuestions(data));
        });
    }
  }, []);

  const changeHandler = (e) => {
    e.preventDefault();
    setFindingData(true);
    sp.web.lists
      .getByTitle("personal")
      //@ts-ignore
      .items.filter(`division eq '${paramRef.current.value}'`)
      .get()
      .then((items: any) => {
        setData(mapQuestions(items));
        setFindingData(false);
      });
    // }
  };

  return (
    <div className={styles.report__container}>
      <HrbpNavbar />
      <div className={styles.report__container__content}>
        <div>
          <ExperienceTeamHeader title="Report" />
        </div>
        {findingData ? (
          <div className={styles.spinner}>
            <Spinner />
          </div>
        ) : (
          <>
            <div
              style={{
                maxWidth: "50%",
                maxHeight: "40%",
                display: "flex",
                flexWrap: "wrap",
                gap: "10px",
                boxSizing: "border-box",
                padding: "5px",
                margin: "20px",
                alignItems: "center",
              }}
            >
              <div> Your Divisions:</div>
              {assignedDivisions &&
                JSON.parse(assignedDivisions).map((item) => {
                  return <Chip label={item} />;
                })}
            </div>
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
              title={`Total Submitted Surveys: ${data.length}`}
              columns={columns}
              data={data}
              options={{
                exportButton: { csv: true, pdf: false },
                actionsCellStyle: {
                  color: "#FF00dd",
                },
                actionsColumnIndex: -1,
                pageSize: 1,
                pageSizeOptions: [1, 2, 5, 10, 20],
                exportAllData: true,

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
                margin: "0 30px",
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

                Toolbar: (props) => (
                  <>
                    <MTableToolbar {...props} />
                    <form
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                      }}
                    >
                      <span>Choose Division</span>
                      <select
                        //@ts-ignore
                        ref={paramRef}
                        // onChange={selectChangeHandler}
                        style={{ width: "300px" }}
                      >
                        {assignedDivisions &&
                          JSON.parse(assignedDivisions).map((item) => {
                            return <option value={item}>{item}</option>;
                          })}
                      </select>
                      {/* <input
                        type="search"
                        //@ts-ignore
                        ref={searchRef}
                        placeholder="...search here"
                        autoFocus
                        // onChange={(e) => {
                        //   setSearchVal(e.target.value);
                        // }}
                        list="people"
                        style={{
                          width: "300px",
                          height: "40px",
                          padding: "10px",
                          borderRadius: "10px",
                          outline: "none",
                          border: "0.5px solid #ccc",
                        }}
                      /> */}
                      <button
                        type="submit"
                        onClick={changeHandler}
                        style={{
                          width: "100px",
                          height: "40px",
                          padding: "10px",
                          borderRadius: "10px",
                          border: "none",
                          outline: "none",
                          cursor: "pointer",
                          backgroundColor: "#000",
                          color: "white",
                        }}
                      >
                        Search
                      </button>

                      {/* <ReactHTMLTableToExcel
                      id="test-table-xls-button"
                      className="download-table-xls-button"
                      table="report"
                      filename="Employee Reports"
                      sheet="tablexls"
                      buttonText="Download as XLS"
                    /> */}
                    </form>
                  </>
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
