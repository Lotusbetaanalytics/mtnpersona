import * as React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { Link } from "react-router-dom";
import styles from "./modal.module.scss";

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

  //8b83ab1f-05d2-4acd-a805-c56a63dad8c

  //

  // pnp.sp.web.lists
  //   .getByTitle(`test`)
  //   .items.get()
  //   .then((response) => {
  //     console.log(response);
  //   });

  // React.useEffect(() => {
  //   // we can use this 'list' variable to execute more queries on the list:

  //   const r = getListTitles();

  //   // show the response from the server
  //   console.log(r);
  // }, []);

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
