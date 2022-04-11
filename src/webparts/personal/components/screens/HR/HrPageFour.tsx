import * as React from "react";
import { Header } from "../../Containers";
import ModalFour from "./HR Modals/ModalFour";
import styles from "./hrstyles.module.scss";
import { sp, spGet, spPost } from "@pnp/sp";
import { default as pnp, ItemAddResult } from "sp-pnp-js";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import SideBar from "./SideBar";
import HRHeader from "./HRHeader";

const HrPageFour = () => {
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
      <ModalFour open={open} handleClose={handleClose} />
    </div>
  );
};

export default HrPageFour;
