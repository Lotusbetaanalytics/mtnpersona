import * as React from "react";
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import ExperienceTeamHeader from "../Experience Team Header/ExperienceTeamHeader";
import { FormControl, makeStyles } from "@material-ui/core";
import ExperienceTeamNavbar from "../Experience Team Navbar/ExperienceTeamNavbar";
import styles from "./configure.module.scss";
import { DisplayModal, SimpleSnackbar } from "./ConfigureDate";
import { useParams, useHistory } from "react-router-dom";
import { ModalPermission } from "../../../Containers/Modal/Modal";

const EditDate = ({ context }) => {
  const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

  const history = useHistory();

  const classes = useStyles();
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [openModal, setOpenModal] = React.useState(false);
  const [data, setData] = React.useState({});
  const [startDate, setStartDate] = React.useState("");
  const [endDate, setEndDate] = React.useState("");
  const employee = useParams();

  const handleOpenModal = (e) => {
    e.preventDefault();

    setData({
      StartDate: startDate,
      EndDate: endDate,
    });

    setOpenModal(true);
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

  function dateFormat(inputDate, format) {
    //parse the input date
    const date = new Date(inputDate);

    //extract the parts of the date
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    //replace the month
    format = format.replace("MM", month.toString().padStart(2, "0"));

    //replace the year
    if (format.indexOf("yyyy") > -1) {
      format = format.replace("yyyy", year.toString());
    } else if (format.indexOf("yy") > -1) {
      format = format.replace("yy", year.toString().substr(2, 2));
    }

    //replace the day
    format = format.replace("dd", day.toString().padStart(2, "0"));

    return format;
  }

  React.useEffect(() => {
    sp.web.lists
      .getByTitle("Survey Sessions")
      //@ts-ignore:
      .items.filter(`ID eq '${employee.id}'`)
      .get()
      .then((items) => {
        setStartDate(
          dateFormat(
            new Date(items[0].StartDate).toLocaleDateString(),
            "yyyy-MM-dd"
          )
        );
        setEndDate(
          dateFormat(
            new Date(items[0].EndDate).toLocaleDateString(),
            "yyyy-MM-dd"
          )
        );
      });
  }, []);

  return (
    <div className={styles.dashboard__container}>
      <ExperienceTeamNavbar />
      <div className={styles.dashboard__container__content}>
        <ExperienceTeamHeader title="Edit Configured Date" />
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
            <div>EX team Email</div>
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
            <div>Start Date</div>
            <input
              type="date"
              className={styles.container__content__form_input}
              onChange={(e) => setStartDate(e.target.value)}
              value={startDate}
              required
            />
          </div>
          <div className={styles.input__area}>
            <div>End Date</div>
            <input
              type="date"
              className={styles.container__content__form_input}
              onChange={(e) => setEndDate(e.target.value)}
              value={endDate}
              required
            />
          </div>

          <div></div>
          {loading ? (
            <button disabled>Updating...</button>
          ) : (
            <div style={{ display: "flex", gap: "20px" }}>
              <button
                onClick={() => {
                  history.push("/experienceteam/date/view");
                }}
                type="button"
              >
                Cancel
              </button>
              <button type="submit">Update</button>
            </div>
          )}
        </form>
        <ModalPermission
          handleClose={handleCloseModal}
          open={openModal}
          data={data}
          //@ts-ignore
          id={employee.id}
          history={history}
        />
      </div>
      <SimpleSnackbar open={open} handleClose={handleClose} />
      <SimpleSnackbar open={error} handleClose={handleError} />
    </div>
  );
};

export default EditDate;
