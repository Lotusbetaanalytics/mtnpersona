import * as React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { Link, useHistory } from "react-router-dom";
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

const ModalOne = ({ open, handleClose }) => {
  const classes = useStyles();
  const [question, setQuestion] = React.useState("");
  const history = useHistory();
  const onNextHandler = () => {
    localStorage.setItem(
      "hr",
      JSON.stringify({
        ...JSON.parse(localStorage.getItem("hr")),
        question,
      })
    );
    history.push("/hr/page2");
  };

  React.useEffect(() => {
    if (
      localStorage.getItem("hr") &&
      JSON.parse(localStorage.getItem("hr"))["question"]
    ) {
      const question = JSON.parse(localStorage.getItem("hr"))["question"];
      setQuestion(question);
    }
  }, []);

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
                <h5>Enter Question</h5>
                <textarea
                  value={question}
                  style={{
                    margin: "10px auto",
                    marginLeft: "30px",
                  }}
                  onChange={(e) => {
                    setQuestion(e.target.value);
                  }}
                ></textarea>
              </div>

              <button
                className={styles.hr__btn}
                style={{
                  marginLeft: "30px",
                }}
                disabled={question.length < 1 ? true : false}
                onClick={onNextHandler}
              >
                Next
              </button>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default ModalOne;
