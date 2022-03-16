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

const ModalThree = ({ open: newOpen, handleClose }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    setOpen(true);
  }, []);

  const closeModal = () => {
    setOpen(false);
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open || newOpen}
        onClose={handleClose || closeModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open || newOpen}>
          <div className={`${classes.paper} ${styles.container}`}>
            <div
              style={{
                position: "relative",
                left: "50%",
                cursor: "pointer",
              }}
              onClick={() => {
                closeModal();
              }}
            >
              <Cancel />
            </div>
            <div className={styles.next__btn}>
              <div>
                <h5>Enter Options</h5>

                <textarea></textarea>
              </div>

              <div className={styles.btn__flex__1}>
                <button className={styles.hr__btn__nobg}>
                  <Link to="/hr/page2">Previous</Link>
                </button>
                <button className={styles.hr__btn__filled}>
                  <Link to="/hr/page4">Next</Link>
                </button>
              </div>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default ModalThree;
