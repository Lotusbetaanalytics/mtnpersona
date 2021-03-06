import * as React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { Link, useHistory } from "react-router-dom";
import styles from "./modal.module.scss";
import { Cancel } from "@material-ui/icons";
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

const ModalTwo = ({ open: newOpen, handleClose }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [type, setType] = React.useState("");
  const [required, setRequired] = React.useState(false);
  const [requiredValue, setRequiredValue] = React.useState("");
  const history = useHistory();
  const onNextHandler = () => {
    localStorage.setItem(
      "hr",
      JSON.stringify({
        ...JSON.parse(localStorage.getItem("hr")),
        type,
        required,
        requiredValue,
      })
    );
    history.push("/hr/page3");
  };

  React.useEffect(() => {
    setOpen(true);
    if (
      localStorage.getItem("hr") &&
      JSON.parse(localStorage.getItem("hr"))["type"]
    ) {
      const type = JSON.parse(localStorage.getItem("hr"))["type"];
      const required = JSON.parse(localStorage.getItem("hr"))["requiredValue"];
      setType(type);
      setRequiredValue(required);
    }
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
                <h5>Response Type</h5>
                <>
                  <FormControl
                    fullWidth
                    style={{
                      borderRadius: "100px",
                      marginTop: "10px",
                    }}
                    className={styles.formControl}
                  >
                    <Select
                      onChange={(e: any) => setType(e.target.value)}
                      fullWidth
                      variant="outlined"
                      value={type}
                      className={styles.formControl}
                      style={{
                        borderRadius: "100px",
                      }}
                    >
                      {/* <MenuItem value="">--Select--</MenuItem> */}
                      <MenuItem value="radio">Radio</MenuItem>
                      <MenuItem value="checkbox">Check Box</MenuItem>
                    </Select>
                  </FormControl>
                  <span className={styles.focus}></span>
                </>
                <h5>Make Required</h5>
                <>
                  <FormControl
                    fullWidth
                    style={{
                      borderRadius: "100px",
                      marginTop: "10px",
                    }}
                    className={styles.formControl}
                  >
                    <Select
                      onChange={(e: any) => {
                        setRequiredValue(e.target.value);
                        if (e.target.value === "yes") {
                          setRequired(true);
                        } else {
                          setRequired(false);
                        }
                      }}
                      fullWidth
                      variant="outlined"
                      value={requiredValue}
                      className={styles.formControl}
                      style={{
                        borderRadius: "100px",
                      }}
                    >
                      {/* <MenuItem value="">--Select--</MenuItem> */}
                      <MenuItem value="yes">Yes</MenuItem>
                      <MenuItem value="no">No</MenuItem>
                    </Select>
                  </FormControl>
                  <span className={styles.focus}></span>
                </>
              </div>

              <div className={styles.btn__flex}>
                <button className={styles.hr__btn__nobg}>
                  <Link to="/hr/page1">Previous</Link>
                </button>
                <button
                  className={styles.hr__btn__filled}
                  disabled={type ? false : true}
                  onClick={onNextHandler}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default ModalTwo;
