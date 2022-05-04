import * as React from "react";
import styles from "./landing.module.scss";
import { Link } from "react-router-dom";
import { sp } from "@pnp/sp";

type Props = {};

const Landing = (props: Props) => {
  const [role, setRole] = React.useState("");

  React.useEffect(() => {
    sp.profiles.myProperties.get().then((profile) => {
      sp.web.lists
        .getByTitle("Roles")
        .items.filter(`Email eq '${profile.Email}'`)
        .get()
        .then((lists: any) => {
          setRole(lists.Role);
        });
    });
  }, []);

  return (
    <>
      <div className={`${styles.landing__container}`}>
        <div className={`${styles.landing__contents}`}>
          <div className={`${styles.landing__logo}`}>
            <img src="https://lotusbetaanalytics.com/mtn/logo.jpg" alt="MTN" />
          </div>
          <div className={`${styles.landing__title}`}>
            <h6>Welcome to the</h6>
            <h1 style={{ marginBottom: "30px" }}>PERSONA PORTAL</h1>
            <button>
              {role === "Super Admin" || role === "MTN Experience Team" ? (
                <Link to="/experienceteam/dashboard">Goto Dashboard</Link>
              ) : role === "HRBP" ? (
                <Link to="/hrbp/dashboard">Goto Dashboard</Link>
              ) : (
                <Link to="/info/personal">Discover Persona</Link>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Landing;
