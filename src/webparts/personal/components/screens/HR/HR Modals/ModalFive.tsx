import * as React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { Link, useHistory } from "react-router-dom";
import styles from "./modal.module.scss";
import { Cancel } from "@material-ui/icons";
import { spfi, SPFx, spGet, spPost } from "@pnp/sp";
import { default as pnp, ItemAddResult } from "sp-pnp-js";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import Toast from "../../../Containers/Toast";

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
  const [show, setShow] = React.useState(false);
  const [section, setSection] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const history = useHistory();
  const questionList = JSON.parse(localStorage.getItem("hr"));
  const onSubmitHandler = () => {
    setLoading(true);
    if (!questionList) {
      setMessage("Please fill the form first");
      setShow(true);
      setTimeout(() => {
        history.push("/hr/page1");
      }, 1500);
    } else {
      try {
        pnp.sp.web.lists
          .getByTitle("Questions")
          .items.add({
            Title: `${Math.random()}`,
            questions: questionList.question,
            section: section,
            type: questionList.type,
            options: JSON.stringify(questionList.options),
          })
          .then((iar: ItemAddResult) => {
            localStorage.removeItem("hr");
            setShow(true);
            setMessage("Question Added!");
            setLoading(false);
          })
          .catch((e) => {
            setLoading(false);
            setShow(true);
            setMessage("Something went wrong");
            console.log(e.message);
          });
      } catch (e) {
        setLoading(false);
        setShow(true);
        setMessage("Something went wrong");
        console.log(e.message);
      }
    }
  };

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
                handleClose();
              }}
            >
              <Cancel />
            </div>
            <div className={styles.next__btn}>
              <div>
                <h5>Assign Response to</h5>
                <div className={styles.select}>
                  <select
                    name=""
                    id=""
                    onChange={(e) => {
                      setSection(e.target.value);
                    }}
                  >
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
                {loading ? (
                  <button
                    className={styles.hr__btn__filled}
                    // onClick={onSubmitHandler}
                  >
                    Submitting...
                  </button>
                ) : (
                  <button
                    className={styles.hr__btn__filled}
                    onClick={onSubmitHandler}
                  >
                    Submit
                  </button>
                )}
              </div>
            </div>
          </div>
        </Fade>
      </Modal>
      <Toast show={show} message={message} setShow={setShow} />
    </div>
  );
};

export default ModalFive;
