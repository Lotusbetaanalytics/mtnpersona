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
import { useHistory } from "react-router-dom";
import ExperienceTeamHeader from "../Experience Team Header/ExperienceTeamHeader";
import ExperienceTeamNavbar from "../Experience Team Navbar/ExperienceTeamNavbar";
import styles from "../View Reports/report.module.scss";
import { sp } from "@pnp/sp";
import { Spinner } from "office-ui-fabric-react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { Fade, Modal, Backdrop } from "@material-ui/core/";

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
    { title: "SN", field: "ID", type: "string" as const },
    { title: "Employee Name", field: "Name", type: "string" as const },
    { title: "Email", field: "Email", type: "string" as const },
    { title: "Role", field: "Role" },
    { title: "Division", field: "Division", type: "string" as const },
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
        console.log(items);
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
  return (
    <div className={styles.report__container}>
      <ExperienceTeamNavbar />
      <div className={styles.report__container__content}>
        <ExperienceTeamHeader title="View Roles" />
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
              }}
              actions={[
                {
                  icon: "visibility",
                  iconProps: {
                    style: { fontSize: "20px", color: "gold" },
                  },
                  tooltip: "Delete",

                  onClick: (event, rowData) => {
                    console.log(rowData.ID, "rowID");
                    handleDelete(rowData.ID);
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
  const classes = useStyles();

  const noHandler = (e: any) => {
    e.preventDefault();
    handleClose();
  };
  const yesHandler = (e: any) => {
    console.log(itemID);
    e.preventDefault();
    sp.web.lists
      .getByTitle("Roles")
      .items.getById(itemID)
      .delete()
      .then(() => {
        setData((prev) => prev.filter((item: any) => item.ID !== itemID));
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
              <button onClick={noHandler}>No</button>
              <button onClick={yesHandler}>Yes</button>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};
