import * as React from "react";
import { Link, useHistory } from "react-router-dom";
import { Header } from "../../Containers";
import { sp, spGet, spPost } from "@pnp/sp";
import { default as pnp, ItemAddResult } from "sp-pnp-js";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import styles from "./userRegistration.module.scss";
import { ChangeHandlerRadio } from "./PageTwo/PageTwo";
import { getResponsesFromTwoSections } from "./Job Info/JobInfo";
import swal from "sweetalert";

type Props = {};

const PageThree = (props: Props) => {
  const [sectionResponses, setSectionResponses] = React.useState([]);
  const [list, setList] = React.useState([]);
  const [response, setResponse] = React.useState([]);
  const [count, setCount] = React.useState(0);
  const [questions, setQuestions] = React.useState(0);
  const [others, setOthers] = React.useState("");
  const [showField, setShowField] = React.useState(false);
  const [total, setTotal] = React.useState(0);
  const history = useHistory();

  const onNextHandler = (e) => {
    e.preventDefault();

    history.push("/info/page4");
    const existing = JSON.parse(localStorage.getItem("data"));
    localStorage.setItem("data", JSON.stringify([...response, ...existing]));
    localStorage.setItem("count", JSON.stringify(count));
  };

  React.useEffect(() => {
    try {
      sp.web.lists
        .getByTitle("Questions")
        .items.get()
        .then((res) => {
          setTotal(res.length);
          setList(
            res.filter(({ section }) => {
              return section === "communication" || section === "goals";
            })
          );
        });
    } catch (e) {
      console.log(e.message);
    }
  }, []);

  React.useEffect(() => {
    setQuestions(list.length);
    setCount(
      JSON.parse(localStorage.getItem("count"))
        ? JSON.parse(localStorage.getItem("count")) + list.length
        : list.length
    );
  }, [list]);

  React.useEffect(() => {
    setSectionResponses(getResponsesFromTwoSections("communication", "goals"));
  }, []);

  const getChecked = (opt) => {
    const answer = sectionResponses.filter(({ answer }) => answer == opt);
    return answer.length > 0 && answer[0].answer;
  };

  return (
    <div className={styles.screen2__container}>
      <Header />
      {/* {count} out of {total} | We'd like to know about your goals and mode of
      communication */}
      <div className={styles.job__info}>
        {list.map((items, index) => {
          return (
            <form className={styles.job__form} key={index}>
              <div>
                <label
                  className={styles.job__label}
                  htmlFor=""
                  style={{ marginBottom: "10px" }}
                >
                  {items.questions}
                </label>
              </div>

              {items.type === "text" ||
              items.type === "radio" ||
              items.type === "checkbox" ? (
                <div>
                  {JSON.parse(items.options).map((opt: any, index: any) => {
                    return (
                      <div className={styles.input__details} key={index}>
                        <input
                          type={items.type}
                          name={items.type === "radio" ? "yello" : ""}
                          value={opt == "Others" ? others : opt ? opt : ""}
                          checked={opt == getChecked(opt) ? true : null}
                          onChange={(e: any) => {
                            // ChangeHandlerRadio(e, items);
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
                                  setShowField(!showField);
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
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className={styles.select}>
                  <select
                    name=""
                    id=""
                    onChange={(e) => {
                      setResponse([
                        ...response,
                        {
                          answer: e.target.value,
                          id: items.ID,
                          section: items.section,
                        },
                      ]);
                    }}
                  >
                    <option>Select...</option>
                    {JSON.parse(items.options).map((opt: any, index: any) => {
                      return (
                        <>
                          <option value={opt}>{opt}</option>
                        </>
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
          <Link to="/info/page2">Previous</Link>
        </button>
        <button className={styles.filled__button} onClick={onNextHandler}>
          Next
        </button>
      </div>
    </div>
  );
};

export default PageThree;
