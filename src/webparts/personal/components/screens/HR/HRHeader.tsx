import * as React from "react";
import styles from "./hrstyles.module.scss";
import { sp, spGet, spPost } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";

// style={{
//                 display: "flex",
//                 justifyContent: "space-between",
//                 width: "90%",
//                 alignItems: "center",
//               }}

const HRHeader = () => {
  const [userName, setUserName] = React.useState("");
  const [email, setEmail] = React.useState("");
  React.useEffect(() => {
    sp.profiles.myProperties.get().then((response) => {
      console.log(response);
      setUserName(response.DisplayName);
      setEmail(response.Email);
    });
  }, []);
  return (
    <div className={styles.hr__details}>
      <div>
        <h3>{userName}</h3>
        <h5>{email}</h5>
      </div>
      <div className={styles.hr__line}></div>
    </div>
  );
};

export default HRHeader;
