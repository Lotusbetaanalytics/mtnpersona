import * as React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { Link } from "react-router-dom";
import styles from "./modal.module.scss";
import { Cancel } from "@material-ui/icons";
import MoreOptionModal from "./MoreOptionModal";

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

const ModalFour = ({ open: newOpen, handleClose }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [optionModalOpen, setOptionModalOpen] = React.useState(false);

  const openOptionModal = () => {
    setOptionModalOpen(true);
  };
  const closeOptionModal = () => {
    setOptionModalOpen(false);
  };

  React.useEffect(() => {
    setOpen(true);
  }, []);

  const closeModal = () => {
    setOpen(false);
    handleClose();
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
              <div className={styles.btn__container__moreoptions}>
                <button className={styles.more__btn} onClick={openOptionModal}>
                  Add Another Option
                </button>
              </div>
              <div></div>
              <div className={styles.btn__flex__1}>
                <button className={styles.hr__btn__nobg}>
                  <Link to="/hr/page3">Previous</Link>
                </button>
                <button className={styles.hr__btn__filled}>
                  <Link to="/hr/page5">Next</Link>
                </button>
              </div>
            </div>
          </div>
        </Fade>
      </Modal>
      <MoreOptionModal open={optionModalOpen} handleClose={closeOptionModal} />
    </div>
  );
};

export default ModalFour;
