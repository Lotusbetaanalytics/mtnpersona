import * as React from "react";
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import { graph } from "sp-pnp-js";
import { graphGet } from "@pnp/graph";
import ExperienceTeamHeader from "../Experience Team Header/ExperienceTeamHeader";
import { FormControl, makeStyles } from "@material-ui/core";
import ExperienceTeamNavbar from "../Experience Team Navbar/ExperienceTeamNavbar";
import styles from "./configure.module.scss";
import Select from "../../../Containers/Select/Select";
import randomstring from "randomstring";
import { Context } from "../../../Personal";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Modal from "@material-ui/core/Modal";
import { useHistory } from "react-router-dom";
import * as _ from "lodash";
import swal from "sweetalert";
import { generateArrayOfDates } from "../../Landing Page";

const ConfigureDate = ({ context }) => {
  const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

  const classes = useStyles();
  const history = useHistory();
  const { spHttpClient, confirmedStaff } = React.useContext(Context);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [employeeEmail, setEmployeeEmail] = React.useState("");
  const [role, setRole] = React.useState("");
  const [divisions, setDivision] = React.useState("");
  const [allDates, setAllDates] = React.useState([]);
  const [allDivisions, setAllDivisions] = React.useState([]);
  const [showSelect, setShowSelection] = React.useState(false);
  const [showDivisionSelect, setShowDivisionSelection] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [divisionRequired, setDivisionRequired] = React.useState(false);
  const [openModal, setOpenModal] = React.useState(false);
  const [data, setData] = React.useState({});
  const [showDivisionField, setShowField] = React.useState(divisionRequired);
  const [startDate, setStartDate] = React.useState("");
  const [endDate, setEndDate] = React.useState("");
  const [getDayBtw, setGetDayBtw] = React.useState("");
  const [check, setCheck] = React.useState(false);
  const [getDates, setGetDates] = React.useState([]);

  function getStatus(arr) {
    for (let datesArr of arr) {
      if (
        datesArr.includes(new Date(startDate).toLocaleDateString()) ||
        datesArr.includes(new Date(endDate).toLocaleDateString())
      ) {
        return false;
      }
    }
    return true;
  }

  const handleOpenModal = (e) => {
    e.preventDefault();
    const baseDate = new Date(Date.now()).getTime();
    const date1 = new Date(startDate).getTime();
    const date2 = new Date(endDate).getTime();

    sp.web.lists
      .getByTitle("Survey Sessions")
      .items.get()
      .then((items) => {
        const getDates = items.map(({ StartDate, EndDate }) => {
          return generateArrayOfDates(EndDate, StartDate);
        });

        setGetDates(getDates);
        if (getStatus(getDates)) {
          if (baseDate > date1) {
            swal(
              "Error",
              "You have selected a past date! Change the start date and try again.",
              "error"
            );
            return;
          }
          if (baseDate > date2) {
            swal(
              "Error",
              "You have selected a past date! Change the end date and try again.",
              "error"
            );
            return;
          }

          if (date1 > date2) {
            swal(
              "Error",
              "You have selected a wrong start date! Change the start date and try again.",
              "error"
            );
            return;
          }

          const getDay = (date2 - date1) / (1000 * 3600 * 24);
          setGetDayBtw(getDay.toString());

          setData({
            StartDate: startDate,
            EndDate: endDate,
            Title: randomstring.generate(5),
            EXTeamName: name,
            EXTeamEmail: email,
          });
          setOpenModal(true);
        } else {
          swal(
            "Error",
            "The selected date is already existing. Change the date and try again!",
            "error"
          );
        }
      });
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleError = () => {
    setError(false);
  };

  React.useEffect(() => {
    sp.profiles.myProperties.get().then((response) => {
      setName(response.DisplayName);
      setEmail(response.Email);
    });
  }, []);

  const cancelHandler = () => {
    //
    history.push("/experienceteam/dashboard");
  };

  return (
    <div className={styles.dashboard__container}>
      <ExperienceTeamNavbar />
      <div className={styles.dashboard__container__content}>
        <ExperienceTeamHeader title="Configure Survey Date" />
        <form
          onSubmit={handleOpenModal}
          className={styles.container__content__form}
        >
          <div className={styles.input__area}>
            <div>EX Team Name</div>
            <input
              type="text"
              className={styles.container__content__form_input}
              onChange={(e) => setName(e.target.value)}
              value={name}
              readOnly
              required
            />
          </div>
          <div className={styles.input__area}>
            <div>EX Team Email</div>
            <input
              type="email"
              className={styles.container__content__form_input}
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
              readOnly
            />
          </div>
          <div className={styles.input__area}>
            <div>Survey Start Date</div>
            <div>
              <input
                type="date"
                className={styles.container__content__form_input}
                onChange={(e) => setStartDate(e.target.value)}
                value={startDate}
                required
              />
            </div>
          </div>
          <div className={styles.input__area}>
            <div>End Date</div>
            <div>
              <input
                type="date"
                className={styles.container__content__form_input}
                onChange={(e) => setEndDate(e.target.value)}
                value={endDate}
                required
              />
            </div>
          </div>
          <div></div>
          {loading ? (
            <button disabled>Configuring...</button>
          ) : (
            <>
              <div style={{ display: "flex", gap: "10px" }}>
                <span
                  className={styles.cancelBtn}
                  onClick={(e) => {
                    cancelHandler();
                  }}
                >
                  Cancel
                </span>
                <button type="submit">Configure</button>
              </div>
            </>
          )}
        </form>
        <DisplayModal
          handleClose={handleCloseModal}
          open={openModal}
          data={data}
          setOpen={setOpen}
          setError={setError}
          setEmail={setEmail}
          loading={loading}
          setLoading={setLoading}
          days={getDayBtw}
        />
      </div>
      {/* <SimpleSnackbar open={open} handleClose={handleClose} /> */}
      {/* <SimpleSnackbar open={error} handleClose={handleError} /> */}
    </div>
  );
};

export default ConfigureDate;

export function SimpleSnackbar({ open, handleClose }) {
  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Date Added"
        action={
          <>
            <IconButton onClick={() => handleClose()}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </>
        }
      />
    </div>
  );
}
export function ErrorSnackbar({ open, handleClose }) {
  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="An error occured! Try again later..."
        action={
          <>
            <IconButton onClick={() => handleClose()}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </>
        }
      />
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    boxSizing: "border-box",
  },
}));

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
    width: "25vw",
    height: "20vh",
  };
}

export function DisplayModal({
  handleClose,
  open,
  data,
  setLoading,
  loading,
  setOpen,
  setEmail,
  setError,
  days = "",
}) {
  const classes = useStyles();

  //Form submit Handler function
  const onSubmitHandler = (e) => {
    e.preventDefault();
    setLoading(true);

    console.log(data.StartDate);

    sp.web.lists
      .getByTitle("Survey Sessions")
      .items.filter(`StartDate eq '${new Date(data.StartDate).toISOString()}'`)
      .get()
      .then((item) => {
        if (item.length > 0) {
          setLoading(false);
          swal("Error", "Start Date already exists!", "error");
          setTimeout(() => {
            setOpen(false);
            handleClose();
          }, 1000);
          return;
        }
        sp.web.lists
          .getByTitle("Survey Sessions")
          .items.add(data)
          .then((res) => {
            setLoading(false);
            swal("Success", "Session Added", "success");
            setTimeout(() => {
              setOpen(false);
              handleClose();
            }, 1000);
          })
          .catch((err) => {
            setLoading(false);
            swal("", "An error occured! Try again", "error");
            setError(true);
          });
      });
  };

  const handleCancel = () => {
    handleClose();
  };

  const body = (
    <div style={getModalStyle()} className={classes.paper}>
      <p id="simple-modal-description">
        Are you sure you want to configure &nbsp;
        {Number(days) > 1 ? `${days} days` : `${days} day`} for this session?
      </p>
      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        <button
          style={{
            outline: "none",
            border: "none",
            height: "30px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "10px",
            padding: "20px",
            boxSizing: "border-box",
            cursor: "pointer",
          }}
          onClick={handleCancel}
        >
          Cancel
        </button>
        {loading ? (
          <button
            style={{
              outline: "none",
              border: "none",
              height: "30px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "10px",
              padding: "20px",
              boxSizing: "border-box",
              cursor: "pointer",
            }}
            disabled
          >
            Adding date...
          </button>
        ) : (
          <button
            style={{
              outline: "none",
              border: "none",
              height: "30px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "10px",
              padding: "20px",
              boxSizing: "border-box",
              cursor: "pointer",
            }}
            type="submit"
            onClick={(e) => onSubmitHandler(e)}
          >
            Yes
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}
