import * as React from "react";
import { Link } from "react-router-dom";
import { Header, Input } from "../../Containers";
import { FileInput, SelectInput } from "../../Containers/Input";

import styles from "./userRegistration.module.scss";

const Screen1 = () => {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [alias, setAlias] = React.useState("");
  const [division, setDivision] = React.useState("");
  const [file, setFile] = React.useState(null);

  const onNextHandler = () => {
    localStorage.setItem(
      "data",
      JSON.stringify({
        ...JSON.parse(localStorage.getItem("data")),
        name,
        email,
        alias,
        division,
      })
    );
  };

  return (
    <div className={`${styles.screen1__container}`}>
      <Header title="Persona Questionnaire" />
      <form>
        <Input
          type="text"
          value={name}
          onChange={(e: any) => {
            setName(e.target.value);
          }}
          label="Employee Name"
          id="name"
        />
        <Input
          type="email"
          value={email}
          onChange={(e: any) => {
            setEmail(e.target.value);
          }}
          label="Employee Email"
          id="email"
        />
        <Input
          type="text"
          value={alias}
          onChange={(e: any) => {
            setAlias(e.target.value);
          }}
          label="Employee Alias"
          id="employee__alias"
        />
        <SelectInput
          onChange={(e: any) => {
            setDivision(e.target.value);
          }}
          label="Select Division"
        >
          <option>Select...</option>
          <option value="Company Secreteriat/ CEO’s Office(CEO,PA, COO, Business Manager)">
            Company Secreteriat/ CEO’s Office(CEO,PA, COO, Business Manager)
          </option>
          <option value="Corporate Services">Corporate Services</option>
          <option value="Customer Relations">Customer Relations</option>
          <option value="Digital Services">Digital Services</option>
          <option value="Enterprise Business">Enterprise Business</option>
          <option value="Finance">Finance</option>
          <option value="Human Resource">Human Resource</option>
          <option value="Information Technology">Information Technology</option>
          <option value="Marketing">Marketing</option>
          <option value="Interna Audit and Fraud Forensics">
            Interna Audit and Fraud Forensics
          </option>
          <option value="Mobile Financial Services">
            Mobile Financial Services
          </option>
          <option value="Networks">Networks</option>
          <option value="Risk and Compliance">Risk and Compliance</option>
          <option value="Sales and Distribution">Sales and Distribution</option>
          <option value="Transformation Office">Transformation Office</option>
          <option value="Yello Digital Financial Service">
            Yello Digital Financial Service
          </option>
        </SelectInput>
        <FileInput
          type="file"
          value={file}
          onChange={(e: any) => {
            setFile(e.target.value);
          }}
          label="Upload Image"
        />
        <div className={styles.nav__buttons}>
          {/* <button className={styles.nobackground__button}>
            <Link to="/info/page3">Previous</Link>
          </button> */}
          <button className={styles.filled__button} onClick={onNextHandler}>
            <Link to="/info/job">Next</Link>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Screen1;
