import * as React from "react";
import styles from "./report.module.scss";
import { sp } from "@pnp/sp";
import ExperienceTeamNavbar from "../Experience Team Navbar/ExperienceTeamNavbar";
import ExperienceTeamHeader from "../Experience Team Header/ExperienceTeamHeader";
import { useParams } from "react-router-dom";
import { Spinner } from "office-ui-fabric-react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { Link } from "react-router-dom";
import styles2 from "./modal.module.scss";
import { Cancel } from "@material-ui/icons";

type user = {
  id: any;
};

const RejectedStaff = () => {
  const user: user = useParams();
  const [employeeName, setEmployeeName] = React.useState("");
  const [employeeEmail, setEmployeeEmail] = React.useState("");
  const [employeeAlias, setEmployeeAlias] = React.useState("");
  const [employeeDivision, setEmployeeDivision] = React.useState("");
  const [findingData, setFindingData] = React.useState(false);
  const [rejectionReason, setRejectionReason] = React.useState("");
  const [proxy, setProxy] = React.useState("");
  const [ID, setID] = React.useState("");

  const href = `${proxy}/info/dashboard/${employeeName}/${employeeEmail}`;

  React.useEffect(() => {
    setFindingData(true);
    sp.web.lists
      .getByTitle("personal")
      .items.getById(user.id)
      .get()
      .then((items: any) => {
        setEmployeeName(items.name);
        setEmployeeEmail(items.email);
        setEmployeeAlias(items.alias);
        setEmployeeDivision(items.division);
        setID(items.ID);
        setRejectionReason(items.Comments_x002f_RejectionReason);
        setFindingData(false);
      });
  }, []);

  React.useEffect(() => {
    sp.site.getRootWeb().then((rootWeb: any) => {
      setProxy(rootWeb._data.parentUrl);
    });
  }, []);

  return (
    <div className={styles.report__container}>
      <ExperienceTeamNavbar />
      <div className={styles.report__container__content}>
        <ExperienceTeamHeader title="Report" />
        {findingData ? (
          <Spinner />
        ) : (
          <div className={styles.employeeReportContainer}>
            <div>
              <h3>Employee Name</h3>
              <span>{employeeName}</span>
            </div>
            <div>
              <h3>Employee Email</h3>
              <span>{employeeEmail}</span>
            </div>
            <div>
              <h3>Reason for Rejection</h3>
              <span>{rejectionReason}</span>
            </div>
            <div>
              <h3>Employee Alias</h3>
              <span>{employeeAlias}</span>
            </div>
            <div>
              <h3>Employee Division</h3>
              <span>{employeeDivision}</span>
            </div>
            <div>
              <a href={href} target="_Blank">
                More...
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RejectedStaff;
