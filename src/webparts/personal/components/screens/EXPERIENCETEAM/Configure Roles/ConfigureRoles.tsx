import * as React from "react";
import { sp, spGet, spPost } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import { graph } from "sp-pnp-js";
import { graphGet } from "@pnp/graph";
import ExperienceTeamHeader from "../Experience Team Header/ExperienceTeamHeader";
import { FormControl, makeStyles } from "@material-ui/core";
import ExperienceTeamNavbar from "../Experience Team Navbar/ExperienceTeamNavbar";
import styles from "./configure.module.scss";

const ConfigureRoles = () => {
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

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [role, setRole] = React.useState("");
  const [allRoles, setAllRoles] = React.useState([]);

  React.useEffect(() => {
    console.log(
      graph.v1.get().then((res) => {
        console.log(res, ">>>>.");
      })
    );
  }, []);

  React.useEffect(() => {
    sp.web.lists
      .getByTitle("Roles")
      .items.get()
      .then((response) => {
        setAllRoles(response);
      });
  });

  const onSubmitHandler = () => {};
  return (
    <div className={styles.dashboard__container}>
      <ExperienceTeamNavbar />
      <div className={styles.dashboard__container__content}>
        <ExperienceTeamHeader title="Configure Roles" />
        <form
          onSubmit={onSubmitHandler}
          className={styles.container__content__form}
        >
          <div className={styles.input__area}>
            <div>Employee Name</div>
            <input type="text" />
          </div>
          <div className={styles.input__area}>
            <div>Employee Email</div>
            <input type="email" />
          </div>
          <div className={styles.input__area}>
            <div>Role</div>
            <FormControl className={classes.formControl} variant="filled">
              <select value={role} className={classes.selectEmpty}>
                <option value="">
                  <em>None</em>
                </option>
                {allRoles.map((item) => {
                  return <option value={item}>{item}</option>;
                })}
              </select>
            </FormControl>
          </div>
          <div className={styles.input__area}>
            <div>Division</div>
            <input type="text" />
          </div>
          <button type="submit">Add</button>
        </form>
      </div>
    </div>
  );
};

export default ConfigureRoles;
