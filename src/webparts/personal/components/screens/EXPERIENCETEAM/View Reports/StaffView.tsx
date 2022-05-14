import * as React from "react";
import styles from "./report.module.scss";
import { sp } from "@pnp/sp";
import ExperienceTeamNavbar from "../Experience Team Navbar/ExperienceTeamNavbar";
import ExperienceTeamHeader from "../Experience Team Header/ExperienceTeamHeader";
import { useParams } from "react-router-dom";
import { Spinner } from "office-ui-fabric-react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { Link, useHistory } from "react-router-dom";
import styles2 from "./modal.module.scss";
import { Cancel } from "@material-ui/icons";
import swal from "sweetalert";

type user = {
  id: any;
};

const StaffView = () => {
  const user: user = useParams();
  const [employeeName, setEmployeeName] = React.useState("");
  const [employeeEmail, setEmployeeEmail] = React.useState("");
  const [employeeAlias, setEmployeeAlias] = React.useState("");
  const [employeeDivision, setEmployeeDivision] = React.useState("");
  const [rejected, setRejected] = React.useState(false);
  const [findingData, setFindingData] = React.useState(false);
  const [proxy, setProxy] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [ID, setID] = React.useState("");
  const [img, setImg] = React.useState("");

  const history = useHistory();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const href = `${proxy}#/info/dashboard/${employeeName}/${employeeEmail}`;

  React.useEffect(() => {
    setFindingData(true);
    sp.web.lists
      .getByTitle("personal")
      .items.getById(user.id)
      .get()
      .then((items: any) => {
        setEmployeeName(items.name);
        setEmployeeEmail(items.email);
        setEmployeeAlias(items.alias);
        setEmployeeDivision(items.division);
        setID(items.ID);
        setImg(items.dp);
        items.EXApprovalStatus === "Declined" && setRejected(true);
        setFindingData(false);
      })
      .catch((error) => {
        setFindingData(false);
        swal("error", "An error occured!", "error");
      });
  }, []);

  React.useEffect(() => {
    sp.site.getRootWeb().then((rootWeb: any) => {
      console.log(rootWeb._data);
      setProxy(rootWeb._data.parentUrl);
    });
  }, []);

  return (
    <div className={styles.report__container}>
      <ExperienceTeamNavbar />
      <div className={styles.report__container__content}>
        <div>
          <ExperienceTeamHeader title="Report" />
        </div>
        {findingData ? (
          <Spinner />
        ) : (
          <div className={styles.employeeReportContainer}>
            <div>
              <h3>Employee Name</h3>
              <span>{employeeName}</span>
            </div>
            <div>
              <h3>Employee Email</h3>
              <span>{employeeEmail}</span>
            </div>
            <div>
              <h3>Employee Alias</h3>
              <span>{employeeAlias}</span>
            </div>
            <div>
              <h3>Employee Division</h3>
              <span>{employeeDivision}</span>
            </div>
            <div>
              <h3>Uploaded Image</h3>
              <img
                src={img}
                alt=""
                style={{ width: "200px", height: "200px" }}
              />
            </div>
            <div></div>
            <div>
              {rejected ? (
                <div>Staff already rejected!</div>
              ) : (
                <button onClick={handleOpen}>Reject</button>
              )}
            </div>
            <div>
              <a href={href} target="_Blank">
                More...
              </a>
            </div>
            <CommentModal
              open={open}
              handleClose={handleClose}
              id={user.id}
              history={history}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default StaffView;

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

export const CommentModal = ({ open, handleClose, id, history }) => {
  const [comment, setComment] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const classes = useStyles();

  const yesHandler = (e: any) => {
    e.preventDefault();
    setLoading(true);
    sp.web.lists
      .getByTitle("personal")
      .items.getById(id)
      .update({
        EXApprovalStatus: "Declined",
        Comments_x002f_RejectionReason: comment,
      })
      .then(() => {
        setLoading(false);
        handleClose();
        setComment("");
        history.push("/experienceteam/report");
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  const noHandler = (e) => {
    e.preventDefault();
    setComment("");
    handleClose();
  };

  const btnFlex = () => {
    return {
      display: "flex",
      gap: "5px",
      width: "100%",
      height: "50%",
      boxSizing: "border-box",
      paddingLeft: "20%",
      justifyItems: "flex-end",
      alignItems: "center",
    };
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
          <div className={`${classes.paper} ${styles2.container}`}>
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
            <form className={styles2.modal__container2} onSubmit={yesHandler}>
              <h4>Comment</h4>
              <textarea
                value={comment}
                required
                onChange={(e) => {
                  setComment(e.target.value);
                }}
              ></textarea>

              {loading ? (
                <button disabled>Submitting...</button>
              ) : (
                <div
                  style={{
                    display: "flex",
                    gap: "5px",
                    width: "100%",
                    height: "50%",
                    boxSizing: "border-box",
                    paddingLeft: "20%",
                    justifyItems: "flex-end",
                    alignItems: "center",
                  }}
                >
                  <button onClick={noHandler}>Cancel</button>
                  <button type="submit">Submit</button>
                </div>
              )}
            </form>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};
