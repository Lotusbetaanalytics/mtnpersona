import * as React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { Link } from "react-router-dom";

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

export default function TransitionsModal({ open, handleClose }) {
  const [cancelMsg, setCancelMsg] = React.useState(false);
  const classes = useStyles();

  const noHandler = (e: any) => {
    e.preventDefault();
    localStorage.removeItem("data");
    setCancelMsg(true);
    // setTimeout(() => {
    //   handleClose();
    // }, 1000);
  };
  const yesHandler = (e: any) => {
    e.preventDefault();
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
        {cancelMsg ? (
          <Fade in={open}>
            <div className={classes.paper}>
              <h2>All inputs have been cleared.</h2>
              <Link to="/">Home</Link>
            </div>
          </Fade>
        ) : (
          <Fade in={open}>
            <div className={classes.paper}>
              <p>Are you sure you want to clear all inputs?</p>
              <div>
                <button onClick={noHandler}>No</button>
                <button onClick={yesHandler}>Yes</button>
              </div>
            </div>
          </Fade>
        )}
      </Modal>
    </div>
  );
}
