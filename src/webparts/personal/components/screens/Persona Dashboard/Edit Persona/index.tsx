import * as React from "react";
import { Link, useHistory } from "react-router-dom";
import { Header, Input } from "../../../Containers";
import { FileInput, SelectInput } from "../../../Containers/Input";
import { sp, spGet, spPost } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import styles from "./userRegistration.module.scss";
import { Context } from "../../../Personal";
import swal from "sweetalert";
import { Tooltip } from "@material-ui/core";

const EditScreen1 = () => {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [alias, setAlias] = React.useState("");
  const [division, setDivision] = React.useState("");
  const [file, setFile] = React.useState("");
  const [res, setRes] = React.useState(null);
  const { lineManager, editMode } = React.useContext(Context);
  const [listofDivision, setListOfDivision] = React.useState([]);

  const reader = new FileReader();

  const history = useHistory();

  React.useEffect(() => {
    sp.profiles.myProperties.get().then((response) => {
      setName(response.DisplayName);
      setEmail(response.Email);
      sp.web.lists
        .getByTitle("personal")
        .items.filter(`email eq '${response.Email}'`)
        .select("alias,division,dp")
        .get()
        .then((response) => {
          const { dp, alias, division } = response[0];
          setAlias(alias);
          setDivision(division);
          localStorage.setItem("editdp", JSON.stringify(dp));
          dp &&
            setRes(
              React.createElement("img", {
                style: {
                  width: "100px",
                  height: "100px",
                },
                src: dp,
                alt: "",
              })
            );
        });
    });
  }, []);

  React.useEffect(() => {
    sp.web.lists
      .getByTitle("MTN DIVISION")
      .items.get()
      .then((response) => {
        setListOfDivision(response);
      });
  }, []);

  const onNextHandler = (e) => {
    e.preventDefault();
    localStorage.setItem(
      "edituserData",
      JSON.stringify({
        alias,
        division,
      })
    );
    history.push("/dashboard/edit/page1");
  };

  return (
    <div className={`${styles.screen1__container}`}>
      <Header title="Persona Questionnaire" />
      <form onSubmit={onNextHandler}>
        <Input
          type="text"
          value={name}
          onChange={(e: any) => {
            // setName(e.target.value);
          }}
          label="Employee Name"
          id="name"
          readOnly={true}
        />
        <Input
          type="email"
          value={email}
          onChange={(e: any) => {
            // setEmail(e.target.value);
          }}
          readOnly={true}
          label="Employee Email"
          id="email"
        />
        <Input
          type="text"
          value={lineManager}
          onChange={(e: any) => {
            // setEmail(e.target.value);
          }}
          readOnly={true}
          label="Employee Line Manager"
          id="manager"
        />
        <Input
          type="text"
          value={alias}
          onChange={(e: any) => {
            setAlias(e.target.value);
          }}
          label="Employee Alias"
          id="employee__alias"
          required={true}
        />
        <SelectInput
          onChange={(e: any) => {
            setDivision(e.target.value);
          }}
          label="Select Division"
          required={true}
          value={division}
        >
          <option value="">--Select Division--</option>
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
                src:
                  URL.createObjectURL(e.target.files[0]) ||
                  JSON.parse(localStorage.getItem("editdp")),
                alt: "",
              })
            );
            reader.readAsDataURL(e.target.files[0]);
            reader.onload = function () {
              //base64encoded string
              localStorage.setItem("editdp", JSON.stringify(reader.result));
            };
            reader.onerror = function (error) {
              console.log("Error: ", error);
            };
          }}
          label="Upload Image"
        />
        <div style={{ width: "10vw", height: "10vh" }}>{res}</div>
        <div className={styles.nav__buttons}>
          {editMode ? (
            <Tooltip title="Start Edit">
              <button type="submit" className={styles.filled__button}>
                Next
              </button>
            </Tooltip>
          ) : (
            <Tooltip title="You cannot edit">
              <button
                type="button"
                disabled
                className={styles.nobackground__button}
              >
                Next
              </button>
            </Tooltip>
          )}
        </div>
      </form>
    </div>
  );
};

export default EditScreen1;
