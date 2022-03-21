import * as React from "react";
import { Header } from "../../Containers";
import ModalOne from "./HR Modals/ModalOne";
import styles from "./hrstyles.module.scss";
import SideBar from "./SideBar";

const HrPageOne = () => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Header title="Human Resource" />
      <div className={styles.hr__details}>
        <div>
          <h3>John Doe</h3>
          <h5>johndoe@gmail.com</h5>
        </div>
        <div className={styles.hr__line}></div>
      </div>
      <SideBar handleOpen={handleOpen} />
      <ModalOne open={open} handleClose={handleClose} />
    </div>
  );
};

export default HrPageOne;
