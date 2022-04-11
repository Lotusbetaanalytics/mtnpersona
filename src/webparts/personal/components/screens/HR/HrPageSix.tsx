import * as React from "react";
import { Header } from "../../Containers";
import ModalThree from "./HR Modals/ModalThree";
import styles from "./hrstyles.module.scss";
import { sp, spGet, spPost } from "@pnp/sp";
import { default as pnp, ItemAddResult } from "sp-pnp-js";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import ViewQuestions from "./Questions/ViewQuestions";
import SideBar from "./SideBar";
import HRHeader from "./HRHeader";

const HrPageSix = () => {
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
      .getByTitle("Questions")
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
          <span>
            Total Questions: <strong>{list.length}</strong>
          </span>
          <ViewQuestions itemsPerPage={4} list={list} setList={setList} />
        </div>
      </div>
    </div>
  );
};

export default HrPageSix;
