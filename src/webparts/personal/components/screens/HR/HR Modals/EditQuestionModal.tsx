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
import { Context } from "../../../Personal";
import {
  SPHttpClient,
  SPHttpClientConfiguration,
  SPHttpClientResponse,
} from "@microsoft/sp-http";
import { BASE_URL } from "../../../config";

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
  const { spHttpClient } = React.useContext(Context);
  const [question, setQuestion] = React.useState("");
  const [opt, setopt] = React.useState([]);
  const [section, setSection] = React.useState("");
  const [type, setType] = React.useState("");
  const [requiredValue, setRequiredValue] = React.useState("");
  const [newOption, setNewOption] = React.useState("");
  const [listOfSections, setListOfSections] = React.useState([]);
  const [required, setRequired] = React.useState(false);

  React.useEffect(() => {
    setQuestion(item.questions);
    setType(item.type);
    setSection(item.section);
    setRequired(item.required);
    item.options && setopt(JSON.parse(item.options));
  }, [item]);

  const yesHandler = () => {
    spHttpClient
      .post(
        `${BASE_URL}/_api/web/lists/getbytitle('Questions')/items(${id})`,
        SPHttpClient.configurations.v1,
        {
          headers: {
            Accept: "application/json;odata=nometadata",
            "Content-type": "application/json;odata=nometadata",
            "odata-version": "",
            "IF-MATCH": "*",
            "X-HTTP-Method": "MERGE",
          },
          body: JSON.stringify({
            questions: question,
            type: type,
            options: JSON.stringify(opt),
            required: JSON.stringify(required),
            section: section,
          }),
        }
      )
      .then(() => {
        sp.web.lists
          .getByTitle("Questions")
          .items.get()
          .then((res) => {
            setList(res);
            sp.profiles.myProperties.get().then((response) => {
              sp.web.lists
                .getByTitle("Logs")
                .items.add({
                  Title: "Question Edited!",
                  Name: response.DisplayName,
                  EmailAddress: response.Email,
                  Description: "A question was edited!",
                })
                .then(() => {
                  console.log("success");
                });
            });
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
    if (opt[i] == "Others") {
      setShowBtn(true);
    }
    setopt(
      opt.filter((item, index) => {
        return index !== i;
      })
    );
  };

  const [showBtn, setShowBtn] = React.useState(true);
  const onAddOthers = (text = "Others") => {
    setShowBtn(false);
    setopt([...opt, text]);
  };

  React.useEffect(() => {
    sp.web.lists
      .getByTitle("ApprovedSections")
      .items.get()
      .then((res) => {
        setListOfSections(res);
      });
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
                <p>Change Required Status</p>
                <FormControl fullWidth variant="outlined">
                  <Select
                    onChange={(e: any) => {
                      setRequiredValue(e.target.value);
                      if (e.target.value === "true") {
                        setRequired(true);
                      } else {
                        setRequired(false);
                      }
                    }}
                    fullWidth
                    variant="outlined"
                    value={requiredValue}
                  >
                    <MenuItem value="">Select</MenuItem>
                    <MenuItem value="true" selected={required ? true : false}>
                      Yes
                    </MenuItem>
                    <MenuItem value="false" selected={required ? true : false}>
                      No
                    </MenuItem>
                  </Select>
                </FormControl>
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
                    {listOfSections.map((item, index) => {
                      return (
                        <MenuItem
                          value={item.SectionType}
                          selected={item.SectionType == section}
                        >
                          {item.SectionType}
                        </MenuItem>
                      );
                    })}
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
                {showBtn && (
                  <button
                    className={styles.addoption__btn}
                    style={{ margin: "0 10px" }}
                    onClick={() => {
                      onAddOthers();
                    }}
                  >
                    Add other
                  </button>
                )}
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
