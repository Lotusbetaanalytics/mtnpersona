import * as React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import styles from "./modal.module.scss";
import { sp, spGet, spPost } from "@pnp/sp";
import { default as pnp, ItemAddResult } from "sp-pnp-js";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
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

const DeleteModal = ({ open, handleClose, setList, id }) => {
  const classes = useStyles();

  const yesHandler = () => {
    sp.web.lists
      .getByTitle("Questions")
      .items.getById(id)
      .delete()
      .then((res) => {
        setList((prev) => {
          return prev.filter((item) => item.ID !== id);
        });
      });
    handleClose();
  };
  const noHandler = () => {
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
            <div className={styles.next__btn}>
              <div>
                <h2>Are you sure you want to delete this record?</h2>
              </div>

              <div className={styles.btn__flex__1}>
                <button className={styles.hr__btn__nobg} onClick={noHandler}>
                  No
                </button>
                <button className={styles.hr__btn__filled} onClick={yesHandler}>
                  Yes
                </button>
              </div>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default DeleteModal;
