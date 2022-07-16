import * as React from "react";
import styles from "./landing.module.scss";
import { Link } from "react-router-dom";
import { sp } from "@pnp/sp";
import swal from "sweetalert";
import { Context } from "../../Personal";

type Props = {};

const Landing = (props: Props) => {
  const [role, setRole] = React.useState("");
  const [showReport, setShowReport] = React.useState(false);
  // const [editMode, setEditMode] = React.useState(false);
  const { editMode } = React.useContext(Context);

  // React.useEffect(() => {
  //   const today = new Date(Date.now()).toISOString();
  //   sp.web.lists
  //     .getByTitle("Survey Sessions")
  //     .items.filter("Status eq 'Started'")
  //     .select("StartDate,EndDate,Status")
  //     .get()
  //     .then((items) => {
  //       const getDates = items.map(({ StartDate, EndDate }) => {
  //         return generateArrayOfDates(EndDate, StartDate);
  //       });

  //       for (let datesArr of getDates) {
  //         if (datesArr.includes(new Date(today).toLocaleDateString())) {
  //           localStorage.setItem("sessionStarted", JSON.stringify(true));
  //           setEditMode(true);
  //           return;
  //         }
  //       }
  //     });
  // }, []);

  React.useEffect(() => {
    sp.profiles.myProperties.get().then((profile) => {
      sp.web.lists
        .getByTitle("Roles")
        .items.filter(`Email eq '${profile.Email}'`)
        .get()
        .then((lists: any) => {
          sp.web.lists
            .getByTitle("personal")
            .items.filter(`email eq '${profile.Email}'`)
            .get()
            .then((result) => {
              if (
                result.length > 0 &&
                result[0].EXApprovalStatus == "Pending"
              ) {
                setShowReport(true);
              } else {
                setShowReport(false);
              }
            });
          setRole(lists[0].Role);
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
            <div style={{ display: "flex", gap: "20px" }}>
              {role === "Super Admin" || role === "MTN Experience Team" ? (
                <div style={{ display: "flex", gap: "20px" }}>
                  <button>
                    <Link to="/experienceteam/dashboard">Admin</Link>
                  </button>
                  <button>
                    {showReport ? (
                      <Link to="/info/dashboard">View Report</Link>
                    ) : (
                      <Link to="/info/personal">Discover Persona</Link>
                    )}
                  </button>
                </div>
              ) : role === "HRBP" ? (
                <div style={{ display: "flex", gap: "20px" }}>
                  <button>
                    <Link to="/hrbp/dashboard">Admin</Link>
                  </button>
                  <button>
                    {showReport ? (
                      <Link to="/info/dashboard">View Report</Link>
                    ) : (
                      <Link to="/info/personal">Discover Persona</Link>
                    )}
                  </button>
                </div>
              ) : (
                <button>
                  {showReport ? (
                    <Link to="/info/dashboard">View Report</Link>
                  ) : (
                    <Link to="/info/personal">Discover Persona</Link>
                  )}
                </button>
              )}
              {editMode && showReport && (
                <button>
                  <Link to="/dashboard/edit/start">Edit Persona</Link>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Landing;

export const generateArrayOfDates = (from, to) => {
  let arr = [];
  let dt = new Date(to);
  from = new Date(from);
  while (dt <= from) {
    arr.push(new Date(dt).toLocaleDateString());
    dt.setDate(dt.getDate() + 1);
  }
  return arr;
};
