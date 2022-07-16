import * as React from "react";
import { Link, useHistory } from "react-router-dom";
import { Header, Input } from "../../Containers";
import { FileInput, SelectInput } from "../../Containers/Input";
import { sp, spGet, spPost } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import styles from "./userRegistration.module.scss";
import { Context } from "../../Personal";
import swal from "sweetalert";

const Screen1 = () => {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [alias, setAlias] = React.useState("");
  const [division, setDivision] = React.useState("");
  const [file, setFile] = React.useState("");
  const [res, setRes] = React.useState(null);
  const { lineManager, setState, confirmedStaff } = React.useContext(Context);
  const [listofDivision, setListOfDivision] = React.useState([]);
  const [editLineManager, setEditLineManager] = React.useState(lineManager);

  const reader = new FileReader();

  const history = useHistory();

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
        setListOfDivision(response);
      });
  }, []);

  const onNextHandler = (e) => {
    e.preventDefault();
    sp.web.lists
      .getByTitle("personal")
      .items.filter(`email eq '${email}'`)
      .get()
      .then((result) => {
        if (result.length > 0 && result[0].EXApprovalStatus == "Pending") {
          swal(
            "Error",
            "Sorry! You have to wait for the MTN Experience Team to finish vetting your previous submission!",
            "error"
          );
        } else {
          localStorage.setItem(
            "userData",
            JSON.stringify({
              name,
              email,
              alias,
              division,
              LineManager: editLineManager,
              dp: file,
            })
          );
          history.push("/info/page1");
        }
      })
      .catch((error) => {
        swal(
          "Error",
          "An error occurred while processing your request. Please try again later.",
          "error"
        );
      });
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
          value={editLineManager}
          onChange={(e: any) => {
            setEditLineManager(e.target.value);
          }}
          label="Employee Line Manager"
          id="manager"
          list="people"
          required={true}
        />
        <datalist id="people">
          {confirmedStaff.map(({ EMAIL_ADDRESS }) => {
            return <option value={EMAIL_ADDRESS}></option>;
          })}
        </datalist>
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
          value={division}
          required={true}
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
          <button type="submit" className={styles.filled__button}>
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default Screen1;
