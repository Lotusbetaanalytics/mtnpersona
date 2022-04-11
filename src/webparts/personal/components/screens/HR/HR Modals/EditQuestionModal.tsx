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
import { Cancel, CancelSharp } from "@material-ui/icons";
import { FormControl, MenuItem, Select } from "@material-ui/core";

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
    item.options && setopt(JSON.parse(item.options));
  }, [item]);

  console.log(section);

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
    newOption && setopt([...opt, newOption]);
    setNewOption("");
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
                <FormControl fullWidth variant="outlined">
                  <Select
                    onChange={(e: any) => setType(e.target.value)}
                    fullWidth
                    variant="outlined"
                    value={type}
                  >
                    <MenuItem value="">Select</MenuItem>
                    <MenuItem value="radio" selected={"radio" == type}>
                      Radio
                    </MenuItem>
                    <MenuItem value="checkbox" selected={"checkbox" == type}>
                      Checkbox
                    </MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div>
                <p>Assigned To</p>
                <FormControl fullWidth variant="outlined">
                  <Select
                    onChange={(e: any) => setSection(e.target.value)}
                    fullWidth
                    variant="outlined"
                    value={section}
                  >
                    <MenuItem value="">Select</MenuItem>
                    <MenuItem
                      value="priorities"
                      selected={"priorities" == section}
                    >
                      Priorities
                    </MenuItem>
                    <MenuItem value="goals" selected={"goals" == section}>
                      Goals
                    </MenuItem>
                    <MenuItem
                      value="interests"
                      selected={"interests" == section}
                    >
                      Interests
                    </MenuItem>
                    <MenuItem
                      value="communication"
                      selected={"communication" == section}
                    >
                      Communication Preference
                    </MenuItem>
                    <MenuItem
                      value="motivator"
                      selected={"motivator" == section}
                    >
                      Motivator
                    </MenuItem>
                    <MenuItem value="bio" selected={"bio" == section}>
                      Short Bio
                    </MenuItem>
                    <MenuItem
                      value="attributes"
                      selected={"attributes" == section}
                    >
                      Super Power and Key Attributes
                    </MenuItem>
                    <MenuItem value="worries" selected={"worries" == section}>
                      Worries
                    </MenuItem>
                    <MenuItem
                      value="demographic"
                      selected={"demographic" == section}
                    >
                      Demographic Information
                    </MenuItem>
                    <MenuItem value="learning" selected={"learning" == section}>
                      Learning Preference
                    </MenuItem>
                  </Select>
                </FormControl>
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
                          style={{ cursor: "pointer" }}
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
