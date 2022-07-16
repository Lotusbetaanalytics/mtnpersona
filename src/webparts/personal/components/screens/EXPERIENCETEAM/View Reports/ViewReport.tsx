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
import ExperienceTeamHeader from "../Experience Team Header/ExperienceTeamHeader";
import ExperienceTeamNavbar from "../Experience Team Navbar/ExperienceTeamNavbar";
import styles from "./report.module.scss";
import { sp } from "@pnp/sp";
import { Spinner } from "office-ui-fabric-react";
import { Context } from "../../../Personal";
import { MenuItem, Select } from "@material-ui/core";
import DownloadReport from "./download";
import * as _ from "lodash";
import ReactHTMLTableToExcel from "react-html-table-to-excel";

const ViewReport = () => {
  const [data, setData] = React.useState([]);
  const [findingData, setFindingData] = React.useState(false);
  const { confirmedStaff } = React.useContext(Context);
  const [searchVal, setSearchVal] = React.useState("");
  const [searchParam, setSearchParam] = React.useState("name");
  const [userRes, setUserRes] = React.useState([]);
  const [questionsArr, setQuestions] = React.useState([]);
  const [field, setField] = React.useState([]);
  const searchRef = React.useRef<HTMLDivElement>(null);
  const paramRef = React.useRef<HTMLDivElement>(null);

  const get = () => {
    const obj = [];

    for (let i = 0; i < questionsArr.length; i++) {
      obj.push({
        title: questionsArr[i].questions,
        field: `${questionsArr[i].questions}`,
        type: "string",
        render: ({ res }) => {
          return res
            .filter((response) => {
              return (
                response && response["question"] == questionsArr[i].questions
              );
            })
            .map((response) => {
              return (
                <li style={{ fontSize: "10px" }}>
                  {response[questionsArr[i].questions]}
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

  React.useEffect(() => {
    questionsArr.length > 0 && setField(get());
  }, [questionsArr]);

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

    // { title: "Approval Status", field: "EXApprovalStatus", searchable: true },
    // {
    //   title: "Short Bio",
    //   field: "responses",
    //   searchable: true,
    //   export: false,
    //   cellStyle: {
    //     width: "150%",
    //   },
    //   grouping: false,
    //   render: (rowData) => {
    //     return (
    //       <ul>
    //         {getSection(JSON.parse(rowData.responses), "bio", rowData.ID)
    //           .length > 0 ? (
    //           getSection(JSON.parse(rowData.responses), "bio", rowData.ID).map(
    //             ({ answer }) => {
    //               return <li style={{ fontSize: "10px" }}>{answer}</li>;
    //             }
    //           )
    //         ) : (
    //           <li>No Response</li>
    //         )}
    //       </ul>
    //     );
    //   },
    // },
    // {
    //   title: "Communication Preference",
    //   field: "responses",
    //   searchable: true,
    //   export: false,
    //   cellStyle: {
    //     width: "150%",
    //   },
    //   grouping: false,
    //   render: (rowData) => {
    //     return (
    //       <ul>
    //         {getSection(
    //           JSON.parse(rowData.responses),
    //           "communication",
    //           rowData.ID
    //         ).length > 0 ? (
    //           getSection(
    //             JSON.parse(rowData.responses),
    //             "communication",
    //             rowData.ID
    //           ).map(({ answer }) => {
    //             return <li style={{ fontSize: "10px" }}>{answer}</li>;
    //           })
    //         ) : (
    //           <li>No Response</li>
    //         )}
    //       </ul>
    //     );
    //   },
    // },
    // {
    //   title: "Worries",
    //   field: "responses",
    //   searchable: true,
    //   cellStyle: {
    //     width: "150%",
    //   },
    //   grouping: false,
    //   export: false,
    //   render: (rowData) => {
    //     return (
    //       <ul>
    //         {getSection(JSON.parse(rowData.responses), "worries", rowData.ID)
    //           .length > 0 ? (
    //           getSection(
    //             JSON.parse(rowData.responses),
    //             "worries",
    //             rowData.ID
    //           ).map(({ answer }) => {
    //             return <li style={{ fontSize: "10px" }}>{answer}</li>;
    //           })
    //         ) : (
    //           <li>No Response</li>
    //         )}
    //       </ul>
    //     );
    //   },
    // },
    // {
    //   title: "Interests",
    //   field: "responses",
    //   searchable: true,
    //   cellStyle: {
    //     width: "150%",
    //   },
    //   grouping: false,
    //   export: false,
    //   render: (rowData) => {
    //     return (
    //       <ul>
    //         {getSection(JSON.parse(rowData.responses), "interests", rowData.ID)
    //           .length > 0 ? (
    //           getSection(
    //             JSON.parse(rowData.responses),
    //             "interests",
    //             rowData.ID
    //           ).map(({ answer }) => {
    //             return <li style={{ fontSize: "10px" }}>{answer}</li>;
    //           })
    //         ) : (
    //           <li>No Response</li>
    //         )}
    //       </ul>
    //     );
    //   },
    // },
    // {
    //   title: "Priorities",
    //   field: "responses",
    //   searchable: true,
    //   cellStyle: {
    //     width: "150%",
    //   },
    //   grouping: false,
    //   export: false,
    //   render: (rowData) => {
    //     return (
    //       <ul>
    //         {getSection(JSON.parse(rowData.responses), "priorities", rowData.ID)
    //           .length > 0 ? (
    //           getSection(
    //             JSON.parse(rowData.responses),
    //             "priorities",
    //             rowData.ID
    //           ).map(({ answer }) => {
    //             return <li style={{ fontSize: "10px" }}>{answer}</li>;
    //           })
    //         ) : (
    //           <li>No Response</li>
    //         )}
    //       </ul>
    //     );
    //   },
    // },
    // {
    //   title: "Goals",
    //   field: "responses",
    //   searchable: true,
    //   cellStyle: {
    //     width: "150%",
    //   },
    //   grouping: false,
    //   export: false,
    //   render: (rowData) => {
    //     return (
    //       <ul>
    //         {getSection(JSON.parse(rowData.responses), "goals", rowData.ID)
    //           .length > 0 ? (
    //           getSection(
    //             JSON.parse(rowData.responses),
    //             "goals",
    //             rowData.ID
    //           ).map(({ answer }) => {
    //             return <li style={{ fontSize: "10px" }}>{answer}</li>;
    //           })
    //         ) : (
    //           <li>No Response</li>
    //         )}
    //       </ul>
    //     );
    //   },
    // },
    // {
    //   title: "Motivators",
    //   field: "responses",
    //   searchable: true,
    //   cellStyle: {
    //     width: "150%",
    //   },
    //   grouping: false,
    //   export: false,
    //   render: (rowData) => {
    //     return (
    //       <ul>
    //         {getSection(JSON.parse(rowData.responses), "motivator", rowData.ID)
    //           .length > 0 ? (
    //           getSection(
    //             JSON.parse(rowData.responses),
    //             "motivator",
    //             rowData.ID
    //           ).map(({ answer }) => {
    //             return <li style={{ fontSize: "10px" }}>{answer}</li>;
    //           })
    //         ) : (
    //           <li>No Response</li>
    //         )}
    //       </ul>
    //     );
    //   },
    // },
    // {
    //   title: "Learning Styles",
    //   field: "responses",
    //   searchable: true,
    //   cellStyle: {
    //     width: "150%",
    //   },
    //   grouping: false,
    //   export: false,
    //   render: (rowData) => {
    //     return (
    //       <ul>
    //         {getSection(JSON.parse(rowData.responses), "learning", rowData.ID)
    //           .length > 0 ? (
    //           getSection(
    //             JSON.parse(rowData.responses),
    //             "learning",
    //             rowData.ID
    //           ).map(({ answer }) => {
    //             return <li style={{ fontSize: "10px" }}>{answer}</li>;
    //           })
    //         ) : (
    //           <li>No Response</li>
    //         )}
    //       </ul>
    //     );
    //   },
    // },
    // {
    //   title: "Attributes",
    //   field: "responses",
    //   searchable: true,
    //   cellStyle: {
    //     width: "150%",
    //   },
    //   grouping: false,
    //   export: false,
    //   render: (rowData) => {
    //     return (
    //       <ul>
    //         {getSection(JSON.parse(rowData.responses), "attributes", rowData.ID)
    //           .length > 0 ? (
    //           getSection(
    //             JSON.parse(rowData.responses),
    //             "attributes",
    //             rowData.ID
    //           ).map(({ answer }) => {
    //             return <li style={{ fontSize: "10px" }}>{answer}</li>;
    //           })
    //         ) : (
    //           <li>No Response</li>
    //         )}
    //       </ul>
    //     );
    //   },
    // },
    ...field,
  ];

  const history = useHistory();

  const changeHandler = (e) => {
    e.preventDefault();
    setFindingData(true);
    sp.web.lists
      .getByTitle("personal")
      //@ts-ignore
      .items.filter(`${paramRef.current.value} eq '${searchRef.current.value}'`)
      .get()
      .then((items: any) => {
        if (items.length > 0) {
          setData(mapQuestions(items));
        }
        setFindingData(false);
      });
    // }
  };

  const getSection = (res, item, id) => {
    const sectionResponses = res.filter(({ section }) => section === item);
    return sectionResponses;
  };

  const selectChangeHandler = (e) => {
    setSearchParam(e.target.value);
  };

  const getData = () => {};

  React.useEffect(() => {
    setFindingData(true);
    sp.web.lists
      .getByTitle("personal")
      .items.get()
      .then((items: any) => {
        if (items.length > 0) {
          setData(mapQuestions(items));
        }
        setFindingData(false);
      });
  }, []);

  React.useEffect(() => {
    sp.web.lists
      .getByTitle("Questions")
      .items.select("questions,ID")
      .get()
      .then((questions) => {
        setQuestions(questions);
      });
  }, []);

  const spoolAnswers = (res) => {
    const arr = [];
    for (let { question, answer } of res) {
      arr.push([question, answer]);
    }
    return Object.fromEntries(arr);
  };

  const mapQuestions = (responses) => {
    if (!responses) return [];
    return responses.map(
      ({ responses, name, email, alias, dp, AvatarGroup, ID, division }) => {
        responses = (responses && JSON.parse(responses)) ?? [];
        return {
          name,
          division,
          alias,
          ID,
          email,
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

  // const [tableData, setTableData] = React.useState([]);
  // React.useEffect(() => {
  //   setTableData(mapQuestions(data));
  // }, [data]);

  return (
    <div className={styles.report__container}>
      <ExperienceTeamNavbar />
      <div className={styles.report__container__content}>
        <div>
          <ExperienceTeamHeader title="Generate Report" />
        </div>
        {findingData ? (
          <div className={styles.spinner}>
            <Spinner />
          </div>
        ) : (
          <MaterialTable
            //@ts-ignore:
            id="report"
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
            title={`Report Found: ${data.length}`}
            columns={columns}
            // data={mapQuestions(data)}
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
              exportFileName: "Persona Report",
              headerStyle: {
                backgroundColor: "rgba(196, 196, 196, 0.32)",
                color: "black",
                fontSize: "12px",
              },
            }}
            style={{
              boxShadow: "none",
              width: "80%",
              maxHeight: "60vh",
              boxSizing: "border-box",
              paddingLeft: "30px",
              margin: "0 40px",
            }}
            actions={[
              {
                icon: "visibility",
                iconProps: {
                  style: { fontSize: "20px", color: "gold" },
                },
                tooltip: "View More",

                onClick: (event, rowData) => {
                  //@ts-ignore:
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
                    <span>Choose search criteria</span>
                    <select
                      //@ts-ignore
                      ref={paramRef}
                      onChange={selectChangeHandler}
                      style={{ width: "300px" }}
                      value={searchParam}
                    >
                      <option value="email">Search By Employee Email</option>
                      <option value="name">Search By Employee Name</option>
                      <option value="division">
                        Search By Employee Division
                      </option>
                    </select>
                    <input
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
                    />
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

                    <datalist id="people">
                      {searchParam == "email"
                        ? confirmedStaff.map(({ EMAIL_ADDRESS }) => {
                            return <option value={EMAIL_ADDRESS}></option>;
                          })
                        : searchParam == "name"
                        ? confirmedStaff.map(
                            ({ FIRST_x0020_NAME, LAST_x0020_NAME }) => {
                              return (
                                <option
                                  value={`${FIRST_x0020_NAME} ${LAST_x0020_NAME}`}
                                ></option>
                              );
                            }
                          )
                        : confirmedStaff.map(({ DEPARTMENT }) => {
                            return <option value={DEPARTMENT}></option>;
                          })}
                    </datalist>
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
        )}
      </div>
    </div>
  );
};

export default ViewReport;

// <DownloadReport responses={userRes} />
