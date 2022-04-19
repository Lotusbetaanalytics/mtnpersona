import { ArrowDropDownTwoTone, ArrowDropUpTwoTone } from "@material-ui/icons";
import * as React from "react";
import styles from "./select.module.scss";

const Select = ({
  children,
  value,
  showSelect,
  setShowSelection,
  required = false,
}) => {
  return (
    <div className={styles.select__container}>
      <div
        className={styles.select__textarea}
        onClick={() => setShowSelection(!showSelect)}
      >
        <input
          type="text"
          value={value}
          readOnly
          style={{ border: "none", flex: 1, outline: "none" }}
          required={required}
        />
        <div>
          {showSelect ? <ArrowDropDownTwoTone /> : <ArrowDropUpTwoTone />}
        </div>
      </div>
      <div className={showSelect && styles.select__display__children}>
        {showSelect && children}
      </div>
    </div>
  );
};

export default Select;
