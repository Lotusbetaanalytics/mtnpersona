import * as React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { sp, spGet, spPost } from "@pnp/sp";
import styles from "./modal.module.scss";
import { Cancel } from "@material-ui/icons";
import swal from "sweetalert";
import { useToasts } from "react-toast-notifications";

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

const TransitionsModal = ({ open, handleClose, history }) => {
  const classes = useStyles();

  const noHandler = (e: any) => {
    handleClose();
  };
  const yesHandler = (e: any) => {
    localStorage.removeItem("data");
    localStorage.removeItem("userData");
    localStorage.removeItem("dp");
    history.push("/info/personal");
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
            <h3>Are you sure you want to clear all inputs?</h3>
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

export default TransitionsModal;

export const EditModal = ({ open, handleClose, history }) => {
  const classes = useStyles();

  const noHandler = (e: any) => {
    handleClose();
  };
  const yesHandler = (e: any) => {
    localStorage.removeItem("editdata");
    localStorage.removeItem("edituserData");
    localStorage.removeItem("editdp");
    history.push("/dashboard/edit/start");
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
            <h3>Are you sure you want to clear all inputs?</h3>
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
export const ModalPermission = ({ open, handleClose, history, id, data }) => {
  const classes = useStyles();
  const [loading, setLoading] = React.useState(false);

  const { addToast } = useToasts();

  const noHandler = (e: any) => {
    handleClose();
  };
  const yesHandler = (e: any) => {
    setLoading(true);
    sp.web.lists
      .getByTitle("Survey Sessions")
      .items.getById(Number(id))
      .update(data)
      .then((items) => {
        handleClose();
        addToast("Update Successful", {
          appearance: "success",
          autoDismiss: true,
        });
        setLoading(false);
        sp.profiles.myProperties.get().then((response) => {
          sp.web.lists
            .getByTitle("Logs")
            .items.add({
              Title: "Update Survey Session",
              Name: response.DisplayName,
              EmailAddress: response.Email,
              Description: "Survey date was edited!",
            })
            .then(() => {
              history.push("/experienceteam/date/view");
            });
        });
      })
      .catch((err) => {
        setLoading(false);
        addToast("An error occured while updating. Try again.", {
          appearance: "error",
          autoDismiss: true,
        });
      });
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
            <h3>Are you sure you want to update this date?</h3>
            <div className={styles.modal__container}>
              <button disabled={loading} onClick={noHandler}>
                No
              </button>
              {loading ? (
                <button disabled>Updating...</button>
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
