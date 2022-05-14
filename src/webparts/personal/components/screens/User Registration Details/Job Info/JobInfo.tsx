import * as React from "react";
import { Link, useHistory } from "react-router-dom";
import { Header } from "../../../Containers";
import { sp, spGet, spPost } from "@pnp/sp";
import { default as pnp, ItemAddResult } from "sp-pnp-js";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import styles from "../userRegistration.module.scss";
import { ChangeHandlerRadio } from "../PageTwo/PageTwo";
import { FormHelperText } from "@material-ui/core";
import swal from "sweetalert";

type Props = {};

const JobInfo = (props: Props) => {
  const [list, setList] = React.useState([]);
  const [response, setResponse] = React.useState([]);
  const [count, setCount] = React.useState(0);
  const [total, setTotal] = React.useState(0);
  const [sectionResponses, setSectionResponses] = React.useState([]);
  const [answered, setAnswered] = React.useState(false);
  const [showPrompts, setShowPrompts] = React.useState(false);
  const [others, setOthers] = React.useState("");
  const [showField, setShowField] = React.useState(false);

  React.useEffect(() => {
    try {
      sp.web.lists
        .getByTitle("Questions")
        .items.get()
        .then((res) => {
          setTotal(res.length);
          setList(
            res.filter(({ section }) => {
              return section === "bio";
            })
          );
        });
    } catch (e) {
      console.log(e.message);
    }
  }, []);

  React.useEffect(() => {
    setCount(list.length);
  }, [list]);

  const history = useHistory();

  const onNextHandler = (e) => {
    e.preventDefault();
    history.push("/info/page2");
    const existing = JSON.parse(localStorage.getItem("data"));
    localStorage.setItem("data", JSON.stringify([...response, ...existing]));
    localStorage.setItem("count", JSON.stringify(count));
  };

  React.useEffect(() => {
    const sectionResponse = prevHandler("bio");
    console.log(sectionResponse);

    setSectionResponses(sectionResponse);
  }, []);

  const getChecked = (opt, index) => {
    const answer = sectionResponses.filter(({ answer }) => answer == opt);
    return answer.length > 0 && answer[0].answer;
  };

  return (
    <div className={styles.screen2__container}>
      <Header />
      <div className={styles.job__info}>
        {list.map((items, ind) => {
          return (
            <form className={styles.job__form} key={ind}>
              <div>
                <label
                  className={styles.job__label}
                  htmlFor=""
                  style={{ marginBottom: "10px" }}
                >
                  {items.questions}
                </label>
              </div>

              {items.type == "text" ||
              items.type == "radio" ||
              items.type == "checkbox" ? (
                <div>
                  {JSON.parse(items.options).map((opt: any, index: any) => {
                    return (
                      <div className={styles.input__details} key={index}>
                        <input
                          type={items.type}
                          name={
                            items.type == "radio" ? `${items.questions}` : ``
                          }
                          value={opt == "Others" ? others : opt ? opt : ""}
                          checked={opt == getChecked(opt, ind) ? true : null}
                          onChange={(e: any) => {
                            e.target.value.length < opt && setAnswered(true);
                            setResponse([
                              ...response,
                              {
                                answer: e.target.value,
                                id: items.ID,
                                section: items.section,
                              },
                            ]);
                          }}
                        />
                        <div className={styles.input__options}>
                          <div>
                            {opt == "Others" ? (
                              <div
                                onClick={() => {
                                  setShowField(true);
                                }}
                              >
                                Others, specify
                                {showField && (
                                  <input
                                    type="text"
                                    value={others}
                                    onChange={(e) => {
                                      setOthers(e.target.value);
                                    }}
                                    style={{
                                      border: "none",
                                      borderBottom: "1px solid grey",
                                    }}
                                  />
                                )}
                              </div>
                            ) : opt ? (
                              opt
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                        {showPrompts && (
                          <span style={{ color: "red" }}>
                            {answered && "*Please select an option*"}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className={styles.select}>
                  <select name="" id="" onChange={(e) => {}}>
                    {JSON.parse(items.options).map((opt: any, index: any) => {
                      return (
                        <div key={index}>
                          <option>Select...</option>
                          <option value={opt}>{opt}</option>
                        </div>
                      );
                    })}
                  </select>
                  <span className={styles.focus}></span>
                </div>
              )}
            </form>
          );
        })}
      </div>
      <div className={styles.nav__buttons}>
        <button className={styles.nobackground__button}>
          <Link to="/info/personal">Previous</Link>
        </button>
        <button
          type="submit"
          className={styles.filled__button}
          onClick={onNextHandler}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default JobInfo;

export const prevHandler = (section = "") => {
  const responses = JSON.parse(localStorage.getItem("data")) || [];

  const otherSections = responses.filter(
    (response) => response.section !== section
  );

  localStorage.setItem("data", JSON.stringify(otherSections));

  return responses.filter((response) => response.section == section);
};
export const getResponsesFromTwoSections = (section1 = "", section2 = "") => {
  const responses = JSON.parse(localStorage.getItem("data")) || [];

  const otherSections = responses.filter(
    (response) => response.section !== section1 || response.section !== section2
  );

  localStorage.setItem("data", JSON.stringify(otherSections));

  return responses.filter(
    (response) => response.section === section1 || response.section === section2
  );
};
