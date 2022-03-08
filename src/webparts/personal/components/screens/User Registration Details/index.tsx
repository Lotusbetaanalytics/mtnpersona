import * as React from "react";
import { Header, Input } from "../../Containers";
import Button from "../../Containers/Button/Button";
import { FileInput, SelectInput } from "../../Containers/Input";

import styles from "./userRegistration.module.scss";

const Screen1 = () => {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [alias, setAlias] = React.useState("");
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
            setAlias(e.target.value);
          }}
          label="Select Division"
        >
          <option value="">1</option>
          <option value="">2</option>
          <option value="">3</option>
        </SelectInput>
        <FileInput
          type="file"
          value={alias}
          onChange={(e: any) => {
            setAlias(e.target.value);
          }}
          label="Upload Image"
        />
        <div
          style={{
            position: "relative",
            width: "50%",
            left: "45%",
            display: "flex",
            justifyContent: "flex-end",
            height: "100%",
          }}
        >
          <Button text="Next" to="/info/job" />
        </div>
      </form>
    </div>
  );
};

export default Screen1;
