import * as React from "react";
import { Header } from "../../Containers";
import ModalThree from "./HR Modals/ModalThree";
import styles from "./hrstyles.module.scss";
import { sp, spGet, spPost } from "@pnp/sp";
import { default as pnp, ItemAddResult } from "sp-pnp-js";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import Report from "./Questions/Report";
import SideBar from "./SideBar";
import HRHeader from "./HRHeader";

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
    sp.web.lists
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
        <HRHeader />
      </>
      <div className={styles.flex__container}>
        <SideBar handleOpen={handleOpen} />
        <div>
          <Report itemsPerPage={4} list={list} />
        </div>
      </div>
    </div>
  );
};

export default HrPageSeven;
