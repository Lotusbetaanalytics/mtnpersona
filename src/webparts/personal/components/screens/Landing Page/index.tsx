import * as React from "react";
import styles from "./landing.module.scss";
import { Link } from "react-router-dom";
import { Context } from "../../Personal";
import {
  SPHttpClient,
  SPHttpClientConfiguration,
  SPHttpClientResponse,
} from "@microsoft/sp-http";
import { sp } from "@pnp/sp";
import swal from "sweetalert";
import { Spinner } from "office-ui-fabric-react";
type Props = {};

const Landing = (props: Props) => {
  const { spHttpClient } = React.useContext(Context);
  const [checkStatus, setcheckStatus] = React.useState(false);
  const [notFound, setNotFound] = React.useState(false);

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");

  const [start, setStart] = React.useState(0);
  const [end, setEnd] = React.useState(5000);
  const [role, setRole] = React.useState("");

  React.useEffect(() => {
    sp.profiles.myProperties.get().then((profile) => {
      sp.web.lists
        .getByTitle("Roles")
        .items.filter(`Email eq '${profile.Email}'`)
        .get()
        .then((lists: any) => {
          console.log(lists);
          setRole(lists.Role);
        });
    });
  }, []);

  //get the current user name and email
  React.useEffect(() => {
    sp.profiles.myProperties.get().then((response) => {
      setName(response.DisplayName);
      setEmail(response.Email);
    });
  }, []);

  React.useEffect(() => {
    spHttpClient
      .get(
        `https://lotusbetaanalytics.sharepoint.com/sites/business_solutions/_api/lists/GetByTitle('CURRENT HCM STAFF LIST-test')/items?$top=${end}&$skip=${start}`,
        SPHttpClient.configurations.v1
      )
      .then((response: SPHttpClientResponse) => {
        response.json().then((responseJSON: any) => {
          console.log(responseJSON.value);
          const findPermanentStaff = responseJSON.value.filter(
            ({ field_20 }) => {
              return field_20 === "Permanent Employee"; //find all permanent employees
            }
          );
          //search the array to find a matching record
          for (let { field_4, field_8 } of findPermanentStaff) {
            if (field_4 != name && field_8 != email) {
              swal({
                title: "You are not authorized to view this page",
                text: "Please contact your manager",
                icon: "error",
                closeOnClickOutside: false,
                closeOnEsc: false,
                buttons: [false],
              });
              setNotFound(true);
              return;
            } else {
              setcheckStatus(true);
              return;
            }
          }
        });
      });
  }, [email, start, end]);

  return (
    <>
      {checkStatus ? (
        <div className={`${styles.landing__container}`}>
          <div className={`${styles.landing__contents}`}>
            <div className={`${styles.landing__logo}`}>
              <img
                src="https://lotusbetaanalytics.com/mtn/logo.jpg"
                alt="MTN"
              />
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
      ) : (
        <div>
          {notFound ? (
            <h1>
              Sorry! You are not authorized to view this page. Please contact
              your administrator.
            </h1>
          ) : (
            <h1>
              <Spinner />
              Checking if you have the right permissions...
            </h1>
          )}
        </div>
      )}
    </>
  );
};

export default Landing;
