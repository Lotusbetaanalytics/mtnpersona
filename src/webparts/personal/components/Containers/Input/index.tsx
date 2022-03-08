import * as React from "react";
import styles from "./input.module.scss";

const InputField = ({ value, onChange, label, type, id }) => {
  return (
    <div className={`${styles.input__container}`}>
      <label htmlFor="">{label}</label>
      <input
        type={type}
        className={`${styles.input}`}
        value={value}
        onChange={onChange}
        id={id}
      />
    </div>
  );
};

export default InputField;

export const FileInput = ({ value, onChange, label, type }) => {
  return (
    <div className={`${styles.input__container}`}>
      <label htmlFor="">{label}</label>
      <input
        type={type}
        className={`${styles.input}`}
        value={value}
        onChange={onChange}
        id={styles.file__upload}
      />
    </div>
  );
};
export const SelectInput = ({ onChange, label, children }) => {
  return (
    <div className={`${styles.input__container}`}>
      <label htmlFor="">{label}</label>
      <select className={`${styles.input}`} onChange={onChange}>
        {children}
      </select>
    </div>
  );
};
