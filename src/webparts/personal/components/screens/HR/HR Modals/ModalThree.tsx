import * as React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { Link, useHistory } from "react-router-dom";
import styles from "./modal.module.scss";
import {
  Add,
  Cancel,
  CancelSharp,
  Edit,
  EditOutlined,
} from "@material-ui/icons";

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
  const [clicked, setClicked] = React.useState(false);
  const [other, setOther] = React.useState("");
  const [options, setOptions] = React.useState("");
  const [optionsShow, setOptionsShow] = React.useState([]);
  const history = useHistory();
  const onNextHandler = () => {
    localStorage.setItem(
      "hr",
      JSON.stringify({
        ...JSON.parse(localStorage.getItem("hr")),
        options: optionsShow,
      })
    );
    history.push("/hr/page5");
  };

  React.useEffect(() => {
    setOpen(true);

    if (
      localStorage.getItem("hr") &&
      JSON.parse(localStorage.getItem("hr"))["options"]
    ) {
      const options = JSON.parse(localStorage.getItem("hr"))["options"];
      setOptionsShow(options);
    }
  }, []);

  const closeModal = () => {
    setOpen(false);
  };

  const onAddOptions = () => {
    options && setOptionsShow([options, ...optionsShow]); //if options is not empty add options to optionsShow
    setOptions("");
  };

  //delete an option
  const onDeleteOption = (i) => {
    if (optionsShow[i] == "Others") {
      setShowBtn(true);
    }
    const newOptions = optionsShow.filter((_, index) => index !== i);
    setOptionsShow(newOptions);
  };

  //Edit options
  const onEditOption = (i) => {
    setOptions(optionsShow[i]);
    onDeleteOption(i);
  };

  const [showBtn, setShowBtn] = React.useState(true);
  const onAddOthers = (text = "Others") => {
    setShowBtn(false);
    setOptionsShow([...optionsShow, text]);
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
          <div className={`${classes.paper} ${styles.container__options}`}>
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

                <div className={styles.add__options__field}>
                  <input
                    value={options}
                    onChange={(e) => {
                      setOptions(e.target.value);
                    }}
                  />
                  <>
                    <button onClick={onAddOptions}>
                      <Add />
                    </button>
                    {showBtn && (
                      <button
                        onClick={() => {
                          onAddOthers();
                        }}
                      >
                        Add other
                      </button>
                    )}
                  </>
                </div>
                <div className={styles.view__options__container}>
                  {optionsShow.map((option, i) => {
                    return (
                      <>
                        <div key={i} className={styles.view__options__added}>
                          <span
                            style={{
                              flex: 1,

                              padding: "10px",
                            }}
                          >
                            {option}
                          </span>
                          <span
                            onClick={() => {
                              onDeleteOption(i);
                            }}
                            style={{
                              color: "red",
                              flex: 1,
                              height: "20px",
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              justifySelf: "flex-end",
                            }}
                          >
                            X
                          </span>
                          <span
                            style={{
                              height: "20px",
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              justifySelf: "flex-end",
                            }}
                            onClick={() => {
                              onEditOption(i);
                            }}
                          >
                            <EditOutlined />
                          </span>
                        </div>
                      </>
                    );
                  })}
                </div>
              </div>

              <div className={styles.btn__flex__1}>
                <button className={styles.hr__btn__nobg}>
                  <Link to="/hr/page2">Previous</Link>
                </button>
                <button
                  className={styles.hr__btn__filled}
                  disabled={optionsShow.length > 1 ? false : true}
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

export default ModalThree;
