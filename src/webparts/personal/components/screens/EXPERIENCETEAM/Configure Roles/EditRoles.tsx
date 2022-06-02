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
import { DisplayModal, SimpleSnackbar } from "./ConfigureRoles";
import { useParams } from "react-router-dom";

const EditRolesEdit = ({ context }) => {
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
  const { spHttpClient } = React.useContext(Context);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [employeeEmail, setEmployeeEmail] = React.useState("");
  const [role, setRole] = React.useState("");
  const [divisions, setDivision] = React.useState("");
  const [allRoles, setAllRoles] = React.useState([]);
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
  //@ts-ignore
  const { id } = useParams();

  const handleOpenModal = (e) => {
    e.preventDefault();
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

  //Get all roles
  React.useEffect(() => {
    sp.web.lists
      .getByTitle("Configured Roles")
      .items.get()
      .then((response) => {
        setAllRoles(response);
      });
  }, []);

  React.useEffect(() => {
    sp.profiles.myProperties.get().then((response) => {
      setName(response.DisplayName);
      setEmail(response.Email);
    });
  }, []);

  //Get all divisions
  React.useEffect(() => {
    sp.web.lists
      .getByTitle("MTN DIVISION")
      .items.get()
      .then((response) => {
        setAllDivisions(response);
      });
  }, []);

  React.useEffect(() => {
    sp.web.lists
      .getByTitle("Roles")
      .items.filter(`ID eq '${id}'`)
      .get()
      .then((response) => {
        setRole(response[0].Role);
        setDivision(response[0].Division);
        setEmployeeEmail(response[0].Email);
      });
  }, []);

  return (
    <div className={styles.dashboard__container}>
      <ExperienceTeamNavbar />
      <div className={styles.dashboard__container__content}>
        <ExperienceTeamHeader title="Configure Roles" />
        <form
          onSubmit={handleOpenModal}
          className={styles.container__content__form}
        >
          <div className={styles.input__area}>
            <div>Employee Name</div>
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
            <div>Employee Email</div>
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
            <div>Enter Email</div>
            <input
              type="email"
              className={styles.container__content__form_input}
              onChange={(e) => setEmployeeEmail(e.target.value)}
              value={employeeEmail}
              required
            />
          </div>
          <div className={styles.input__area}>
            <div>Choose Role</div>
            <div>
              <Select
                value={role}
                showSelect={showSelect}
                setShowSelection={setShowSelection}
              >
                <div
                  style={{
                    maxHeight: "450px",
                    border: "1px solid rgba(0, 0, 0, 0.31)",
                    overflowY: "scroll",
                    backgroundColor: "#fff",
                  }}
                >
                  {allRoles.map(({ Role }) => {
                    return (
                      <div
                        className={styles.container__content__select}
                        onClick={() => {
                          setShowSelection(false);
                          setRole(Role);
                          Role == "HRBP"
                            ? setDivisionRequired(true)
                            : setDivisionRequired(false);
                        }}
                      >
                        <div
                          style={{
                            flex: 1,
                          }}
                        >
                          {Role}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Select>
            </div>
          </div>
          {divisionRequired && (
            <div className={styles.input__area}>
              <div>Choose Division</div>
              <div>
                <Select
                  value={divisions}
                  showSelect={showDivisionSelect}
                  setShowSelection={setShowDivisionSelection}
                  required={divisionRequired}
                >
                  <div
                    style={{
                      maxHeight: "450px",
                      border: "1px solid rgba(0, 0, 0, 0.31)",
                      overflowY: "scroll",
                      backgroundColor: "#fff",
                    }}
                  >
                    {allDivisions.map(({ Division: division }) => {
                      return (
                        <div
                          className={styles.container__content__select}
                          onClick={() => {
                            setShowDivisionSelection(false);
                            setDivision(division);
                          }}
                        >
                          <div
                            style={{
                              flex: 1,
                            }}
                          >
                            {division}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </Select>
              </div>
            </div>
          )}
          <div></div>
          {loading ? (
            <button disabled>Adding...</button>
          ) : (
            <>
              {divisionRequired && divisions.length < 1 ? (
                <button type="submit" disabled>
                  Add
                </button>
              ) : (
                <button type="submit">Submit</button>
              )}
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
        />
      </div>
      <SimpleSnackbar open={open} handleClose={handleClose} />
      <SimpleSnackbar open={error} handleClose={handleError} />
    </div>
  );
};

export default EditRolesEdit;
