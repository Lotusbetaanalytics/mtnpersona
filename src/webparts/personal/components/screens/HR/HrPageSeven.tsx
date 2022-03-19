import * as React from "react";
import { Header } from "../../Containers";
import ModalThree from "./HR Modals/ModalThree";
import styles from "./hrstyles.module.scss";
import { spfi, SPFx, spGet, spPost } from "@pnp/sp";
import { default as pnp, ItemAddResult } from "sp-pnp-js";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import Report from "./Questions/Report";

const HrPageSeven = () => {
  const [open, setOpen] = React.useState(false);
  const [list, setList] = React.useState([]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    // setUserName(response.DisplayName);
    pnp.sp.web.lists
      .getByTitle("personal")
      .items.get()
      .then((res) => {
        console.log(res);
        setList(res);
      });
  }, []);
  return (
    <div>
      <Header title="Human Resource" />
      <>
        <div className={styles.hr__details}>
          <div>
            <h3>John Doe</h3>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "90%",
                alignItems: "center",
              }}
            >
              <h5>johndoe@gmail.com</h5>
              <h4>Questions</h4>
            </div>
          </div>
          <div className={styles.hr__line}></div>
        </div>
      </>
      <div className={styles.flex__container}>
        <div className={styles.flex__buttons}>
          <button className={styles.hr__button} onClick={handleOpen}>
            Add Question
          </button>
          <button className={styles.hr__button}>View Questions</button>
          <button className={styles.hr__button}>Reports</button>
        </div>
        <div>
          <Report itemsPerPage={4} list={list} />
        </div>
      </div>
    </div>
  );
};

export default HrPageSeven;
