import * as React from "react";
import styles from "./input.module.scss";

const InputField = ({
  value,
  onChange,
  label,
  type,
  id,
  readOnly = false,
  required = false,
}) => {
  return (
    <div className={`${styles.input__container}`}>
      <label htmlFor="">{label}</label>
      <input
        type={type}
        className={`${styles.input}`}
        value={value}
        onChange={onChange}
        id={id}
        readOnly={readOnly}
        required={required}
      />
    </div>
  );
};

export default InputField;

export const FileInput = ({
  value,
  onChange,
  label,
  type,
  required = false,
}) => {
  return (
    <div className={`${styles.input__container}`}>
      <label htmlFor="">{label}</label>
      <input
        type={type}
        className={`${styles.input}`}
        value={value}
        onChange={onChange}
        id={styles.file__upload}
        required={required}
        accept="image/*"
      />
    </div>
  );
};
export const SelectInput = ({
  onChange,
  label,
  children,
  required = false,
  value = "",
}) => {
  return (
    <div className={`${styles.input__container}`}>
      <label htmlFor="">{label}</label>
      <select
        className={`${styles.input}`}
        onChange={onChange}
        required={required}
        value={value}
      >
        <option value="" disabled selected>
          Select Division...
        </option>
        {children}
      </select>
    </div>
  );
};
