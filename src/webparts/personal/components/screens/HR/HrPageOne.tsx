import * as React from "react";
import { Header } from "../../Containers";
import ModalOne from "./HR Modals/ModalOne";
import styles from "./hrstyles.module.scss";
import SideBar from "./SideBar";
import { sp, spGet, spPost } from "@pnp/sp";
import HRHeader from "./HRHeader";

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
      <HRHeader />
      <SideBar handleOpen={handleOpen} />
      <ModalOne open={open} handleClose={handleClose} />
    </div>
  );
};

export default HrPageOne;
