import * as React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { Link } from "react-router-dom";
import styles from "./modal.module.scss";
import { Cancel } from "@material-ui/icons";

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

const TransitionsModal = ({ open, handleClose }) => {
  const classes = useStyles();

  const noHandler = (e: any) => {
    e.preventDefault();
    handleClose();
    // setTimeout(() => {
    //   handleClose();
    // }, 1000);
  };
  const yesHandler = (e: any) => {
    e.preventDefault();
    localStorage.removeItem("data");
    handleClose();
    //submit data to sharepoint List
    //graph.add(JSON.parse(localStorage.getItem("data")));
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
