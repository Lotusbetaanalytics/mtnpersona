import * as React from "react";
import { Link } from "react-router-dom";
import { Header, Input } from "../../Containers";
import { FileInput, SelectInput } from "../../Containers/Input";

import { sp, spGet, spPost } from "@pnp/sp";
import { default as pnp, ItemAddResult } from "sp-pnp-js";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import styles from "./userRegistration.module.scss";
import {
  SPHttpClient,
  SPHttpClientConfiguration,
  SPHttpClientResponse,
} from "@microsoft/sp-http";
import { Context } from "../../Personal";

const Screen1 = () => {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [alias, setAlias] = React.useState("");
  const [division, setDivision] = React.useState("");
  const [file, setFile] = React.useState("");
  const [res, setRes] = React.useState(null);
  const { spHttpClient } = React.useContext(Context);
  const [listofDivision, setListOfDivision] = React.useState([]);

  const reader = new FileReader();

  React.useEffect(() => {
    sp.profiles.myProperties.get().then((response) => {
      setName(response.DisplayName);
      setEmail(response.Email);
    });
  }, []);

  React.useEffect(() => {
    sp.web.lists
      .getByTitle("MTN DIVISION")
      .items.get()
      .then((response) => {
        console.log(response);

        setListOfDivision(response);
      });
  }, []);

  const onNextHandler = () => {
    localStorage.setItem(
      "userData",
      JSON.stringify({
        name,
        email,
        alias,
        division,
        dp: file,
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
            // setName(e.target.value);
          }}
          label="Employee Name"
          id="name"
        />
        <Input
          type="email"
          value={email}
          onChange={(e: any) => {
            // setEmail(e.target.value);
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
          {listofDivision.map((item, index) => {
            return (
              <option key={index} value={item.Division}>
                {item.Division}
              </option>
            );
          })}
        </SelectInput>
        <FileInput
          type="file"
          value={file}
          onChange={(e: any) => {
            setRes(
              React.createElement("img", {
                style: {
                  width: "100px",
                  height: "100px",
                },
                src: URL.createObjectURL(e.target.files[0]),
                alt: "",
              })
            );
            reader.readAsDataURL(e.target.files[0]);
            reader.onload = function () {
              //base64encoded string
              localStorage.setItem("dp", JSON.stringify(reader.result));
            };
            reader.onerror = function (error) {
              console.log("Error: ", error);
            };
          }}
          label="Upload Image"
        />
        <div style={{ width: "10vw", height: "10vh" }}>{res}</div>
        <div className={styles.nav__buttons}>
          <button className={styles.filled__button} onClick={onNextHandler}>
            <Link to="/info/page1">Next</Link>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Screen1;
