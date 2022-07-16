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
import { Cancel } from "@material-ui/icons";
import MaterialTable from "material-table";
import { useHistory, useParams } from "react-router-dom";
import ExperienceTeamHeader from "../Experience Team Header/ExperienceTeamHeader";
import ExperienceTeamNavbar from "../Experience Team Navbar/ExperienceTeamNavbar";
import styles from "../View Reports/report.module.scss";
import style from "./configure.module.scss";
import { sp } from "@pnp/sp";
import { Spinner } from "office-ui-fabric-react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { Fade, Modal, Backdrop, Chip } from "@material-ui/core/";
import { useToasts } from "react-toast-notifications";
import Select from "../../../Containers/Select/Select";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  })
);

type id = {
  id: any;
};

const ViewRoles = () => {
  const columns = [
    { title: "Employee Name", field: "Name", type: "string" as const },
    { title: "Email", field: "Email", type: "string" as const },
    { title: "Role", field: "Role" },
    // { title: "Division", field: "Division", type: "string" as const },
    {
      title: "Assigned Divisions",
      field: "BpDivisions",
      type: "string" as const,
      render: ({ BpDivisions }) => {
        return (
          BpDivisions &&
          JSON.parse(BpDivisions) &&
          JSON.parse(BpDivisions).map((item: any) => {
            return <li>{item}</li>;
          })
        );
      },
    },
  ];

  const [data, setData] = React.useState([]);
  const [findingData, setFindingData] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [id, setID] = React.useState("");

  const history = useHistory();

  React.useEffect(() => {
    setFindingData(true);
    sp.web.lists
      .getByTitle("Roles")
      .items.get()
      .then((items: any) => {
        setData(items);
        setFindingData(false);
      })
      .catch((err) => {
        console.log(err);
        setFindingData(false);
      });
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = (id: any) => {
    setID(id);
    setOpen(true);
  };
  const handleEdit = (id: any) => {
    history.push(`/experienceteam/configure/edit/${id}`);
  };
  return (
    <div className={styles.report__container}>
      <ExperienceTeamNavbar />
      <div className={styles.report__container__content}>
        <div>
          <ExperienceTeamHeader title="View Roles" />
        </div>
        {findingData ? (
          <div className={styles.spinner}>
            <Spinner />
          </div>
        ) : (
          <>
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
              title={`Number of Team: ${data.length}`}
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
                marginLeft: "20px",
              }}
              actions={[
                {
                  icon: "visibility",
                  iconProps: {
                    style: { fontSize: "20px", color: "gold" },
                  },
                  tooltip: "Delete",

                  onClick: (event, rowData) => {
                    handleDelete(rowData.ID);
                  },
                },
                {
                  icon: "visibility",
                  iconProps: {
                    style: { fontSize: "20px", color: "gold" },
                  },
                  tooltip: "Edit",

                  onClick: (event, rowData) => {
                    handleEdit(rowData.ID);
                  },
                },
              ]}
              components={{
                Action: (props) => (
                  <>
                    <button
                      onClick={(event) =>
                        props.action.onClick(event, props.data)
                      }
                      className={`${styles.mtn__btn__table} ${
                        props.action.tooltip == "Edit"
                          ? styles.btn__questions__edit
                          : styles.mtn__black
                      }`}
                    >
                      <span>{props.action.tooltip}</span>
                    </button>
                  </>
                ),
              }}
            />
            <TransitionsModal
              id={id}
              handleClose={handleClose}
              open={open}
              setData={setData}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default ViewRoles;

export const TransitionsModal = ({
  open,
  handleClose,
  id: itemID,
  setData,
}) => {
  const { addToast } = useToasts();
  const classes = useStyles();
  const [deleting, setDeleting] = React.useState(false);

  const noHandler = (e: any) => {
    e.preventDefault();
    handleClose();
  };
  const yesHandler = (e: any) => {
    e.preventDefault();
    setDeleting(true);
    sp.web.lists
      .getByTitle("Roles")
      .items.getById(itemID)
      .delete()
      .then(() => {
        setDeleting(false);
        setData((prev) => prev.filter((item: any) => item.ID !== itemID));
        sp.profiles.myProperties.get().then((response) => {
          sp.web.lists.getByTitle("Logs").items.add({
            Title: "Role deleted!",
            Name: response.DisplayName,
            EmailAddress: response.Email,
            Description: "User role was deleted!",
          });
        });
        return addToast("Delete Successful", {
          appearance: "success",
          autoDismiss: true,
        });
      });
    handleClose();
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={`${classes.paper} ${styles.container}`}>
            <div
              style={{
                position: "relative",
                left: "50%",
                cursor: "pointer",
              }}
              onClick={() => {
                handleClose();
              }}
            >
              <Cancel />
            </div>
            <h3>Are you sure you want to delete?</h3>
            <div className={styles.modal__container}>
              <button disabled={deleting} onClick={noHandler}>
                No
              </button>
              {deleting ? (
                <button disabled>Deleting...</button>
              ) : (
                <button onClick={yesHandler}>Yes</button>
              )}
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export const EditRoles = () => {
  type link = {
    id: string;
  };
  const user = useParams() as link;
  const history = useHistory();
  const { addToast } = useToasts();
  const [allDivisions, setAllDivisions] = React.useState([]);
  const [showDivisionSelect, setShowDivisionSelection] = React.useState(false);
  const [divisionRequired, setDivisionRequired] = React.useState(false);
  const [openModal, setOpenModal] = React.useState(false);
  const [selectedDivision, setSelectedDivision] = React.useState([]);
  const [foundRole, setFoundRole] = React.useState("");
  const [foundEmail, setFoundEmail] = React.useState("");
  const [foundDivision, setFoundDivision] = React.useState("");
  const [divisions, setDivisions] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [newDivisions, setNewDivisions] = React.useState("");
  React.useEffect(() => {
    sp.web.lists
      .getByTitle("Roles")
      .items.getById(Number(user.id))
      .get()
      .then((items) => {
        setFoundDivision(items.Division);
        setFoundRole(items.Role);
        setFoundEmail(items.Email);
        if (items.BpDivisions) {
          setDivisions(JSON.parse(items.BpDivisions));
        }
      });
  }, []);

  //Get all divisions
  React.useEffect(() => {
    sp.web.lists
      .getByTitle("MTN DIVISION")
      .items.get()
      .then((response) => {
        setAllDivisions(response);
      });
  }, []);

  const deleteDivision = (index) => {
    window.confirm("Are you sure you want to delete this division?") &&
      setDivisions((prev) => prev.filter((item, i) => i !== index));
  };

  const updateHandler = (e) => {
    if (foundRole == "HRBP") {
      e.preventDefault();
      setLoading(true);
      sp.web.lists
        .getByTitle("Roles")
        .items.getById(Number(user.id))
        .update({
          Email: foundEmail,
          BpDivisions: JSON.stringify(divisions),
        })
        .then((result) => {
          setLoading(false);
          sp.profiles.myProperties.get().then((response) => {
            sp.web.lists.getByTitle("Logs").items.add({
              Title: "Role edited!",
              Name: response.DisplayName,
              EmailAddress: response.Email,
              Description: "User role was edited!",
            });
          });
          return addToast("Update Successful", {
            appearance: "success",
            autoDismiss: true,
          });
        })
        .catch((err) => {
          setLoading(false);
          return addToast("An error occured! Please try again", {
            appearance: "error",
            autoDismiss: true,
          });
        });
    } else {
      e.preventDefault();
      setLoading(true);
      sp.web.lists
        .getByTitle("Roles")
        .items.getById(Number(user.id))
        .update({
          Email: foundEmail,
        })
        .then((result) => {
          setLoading(false);
          sp.profiles.myProperties.get().then((response) => {
            sp.web.lists.getByTitle("Logs").items.add({
              Title: "Role edited!",
              Name: response.DisplayName,
              EmailAddress: response.Email,
              Description: "User role was edited!",
            });
          });
          return addToast("Update Successful", {
            appearance: "success",
            autoDismiss: true,
          });
        })
        .catch((err) => {
          setLoading(false);
          return addToast("An error occured! Please try again", {
            appearance: "error",
            autoDismiss: true,
          });
        });
    }
  };

  const backHandler = () => {
    history.push("/experienceteam/viewroles");
  };

  return (
    <div className={styles.report__container}>
      <ExperienceTeamNavbar />
      <div className={styles.report__container__content}>
        <div>
          <ExperienceTeamHeader title="Edit Roles" />
        </div>
        <div>
          <form
            style={{
              width: "100%",
              height: "100%",
              margin: "40px auto",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              boxSizing: "border-box",
              padding: "40px",
            }}
            onSubmit={updateHandler}
          >
            <div className={styles.role__edit__container}>
              <label htmlFor="">Role</label>
              <input
                type="text"
                value={foundRole}
                readOnly
                className={styles.role__edit__input}
              />
            </div>
            {foundRole != "HRBP" && (
              <div className={styles.role__edit__container}>
                <label htmlFor="">Division</label>
                <input
                  type="text"
                  className={styles.role__edit__input}
                  value={foundDivision}
                  readOnly
                />
              </div>
            )}
            <div className={styles.role__edit__container}>
              <label htmlFor="">Email</label>
              <input
                type="text"
                className={styles.role__edit__input}
                value={foundEmail}
                onChange={(e) => {
                  setFoundEmail(e.target.value);
                }}
              />
            </div>
            {foundRole == "HRBP" && (
              <>
                <div>
                  <label htmlFor="">Assigned Divisions</label>
                  <div
                    style={{
                      maxWidth: "50%",
                      maxHeight: "40%",
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "10px",
                      boxSizing: "border-box",
                      padding: "5px",
                    }}
                  >
                    {divisions.map((item: any) => {
                      return (
                        <div
                          style={{
                            maxWidth: "100%",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <Chip label={item} />
                          <span
                            onClick={() => {
                              deleteDivision(divisions.indexOf(item));
                            }}
                          >
                            <Cancel />
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className={style.input__area}>
                  <div>Add Division</div>
                  <div>
                    <Select
                      value={newDivisions}
                      showSelect={showDivisionSelect}
                      setShowSelection={setShowDivisionSelection}
                    >
                      <div
                        style={{
                          maxHeight: "450px",
                          border: "1px solid rgba(0, 0, 0, 0.31)",
                          overflowY: "scroll",
                          backgroundColor: "#fff",
                        }}
                      >
                        {allDivisions.map(({ Division: division }) => {
                          return (
                            <div
                              className={style.container__content__select}
                              onClick={() => {
                                setShowDivisionSelection(false);
                                setNewDivisions(division);
                                if (divisions.indexOf(division) == -1) {
                                  setDivisions((prev) => [...prev, division]);
                                }
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
                    </Select>
                  </div>
                </div>
              </>
            )}
            <div className={styles.role__edit__btn}>
              <button type="button" onClick={backHandler}>
                Go back
              </button>
              {loading ? (
                <button disabled>Updating...</button>
              ) : (
                <button type="submit">Update</button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
