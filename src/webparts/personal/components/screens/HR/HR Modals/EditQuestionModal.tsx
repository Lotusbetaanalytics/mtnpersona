import * as React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import styles from "./modal.module.scss";
import { spfi, SPFx, spGet, spPost } from "@pnp/sp";
import { default as pnp, ItemAddResult } from "sp-pnp-js";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import { Cancel, CancelSharp } from "@material-ui/icons";

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

const EditQuestionModal = ({ open, handleClose, setList, item, id }) => {
  const classes = useStyles();
  const [question, setQuestion] = React.useState("");
  const [opt, setopt] = React.useState([]);
  const [section, setSection] = React.useState("");
  const [type, setType] = React.useState("");
  const [newOption, setNewOption] = React.useState("");

  React.useEffect(() => {
    setQuestion(item.questions);
    setType(item.type);
    setSection(item.section);
    setType(item.type);
    item.options && setopt(JSON.parse(item.options));
  }, [item]);

  console.log(opt);

  const yesHandler = () => {
    pnp.sp.web.lists
      .getByTitle("Questions")
      .items.getById(id)
      .update({
        questions: question,
        type: type,
        options: JSON.stringify(opt),
        section: section,
      })
      .then(() => {
        pnp.sp.web.lists
          .getByTitle("Questions")
          .items.get()
          .then((res) => {
            setList(res);
          });
      });
    handleClose();
  };
  const noHandler = () => {
    handleClose();
  };

  const addOptionHandler = () => {
    setopt([...opt, newOption]);
  };

  const deleteOptionHandler = (i) => {
    setopt(
      opt.filter((item, index) => {
        return index !== i;
      })
    );
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
          <div
            className={`${classes.paper} ${styles.container__edit__question}`}
          >
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
                <p>Question</p>
                <input
                  className={styles.input__tag}
                  type="text"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                />
              </div>
              <div>
                <p>Option Type</p>
                <input
                  className={styles.input__tag}
                  type="text"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                />
              </div>
              <div>
                <p>Assigned To</p>
                <input
                  className={styles.input__tag}
                  type="text"
                  value={section}
                  onChange={(e) => setSection(e.target.value)}
                />
              </div>
              <div>
                <p>Add new option</p>
                <input
                  className={styles.input__tag}
                  type="text"
                  value={newOption}
                  onChange={(e) => setNewOption(e.target.value)}
                />
                <button
                  className={styles.addoption__btn}
                  onClick={addOptionHandler}
                >
                  Add Option
                </button>
              </div>
              <div className={styles.input__opt}>
                {opt.map((i, index) => {
                  return (
                    <>
                      <div className={styles.input__tag__opt}>
                        <div>{i}</div>
                        <div
                          onClick={(e) => {
                            deleteOptionHandler(index);
                          }}
                        >
                          <CancelSharp />
                        </div>
                      </div>
                    </>
                  );
                })}
              </div>

              <div className={styles.btn__flex__1}>
                <button className={styles.hr__btn__nobg} onClick={noHandler}>
                  Cancel
                </button>
                <button className={styles.hr__btn__filled} onClick={yesHandler}>
                  Update
                </button>
              </div>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default EditQuestionModal;