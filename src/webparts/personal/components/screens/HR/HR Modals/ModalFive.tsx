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

const ModalFive = ({ open: newOpen, handleClose }) => {
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
                <h5>Assign Response to</h5>
                <div className={styles.select}>
                  <select name="" id="" onChange={(e) => {}}>
                    <option>Select...</option>
                    <option value="priorities">Priorities</option>
                    <option value="goals">Goals</option>
                    <option value="interests">Interests</option>
                    <option value="communication">
                      Communication Preference
                    </option>
                    <option value="motivator">Motivator</option>
                    <option value="bio">Short Bio</option>
                    <option value="attributes">
                      Super Power and Key Attributes
                    </option>
                    <option value="worries">Worries</option>
                    <option value="demographic">Demographic Information</option>
                    <option value="learning">Learning Preference</option>
                  </select>
                  <span className={styles.focus}></span>
                </div>
              </div>

              <div className={styles.btn__flex__1}>
                <button className={styles.hr__btn__nobg}>
                  <Link to="/hr/page4">Previous</Link>
                </button>
                <button className={styles.hr__btn__filled}>Submit</button>
              </div>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default ModalFive;
