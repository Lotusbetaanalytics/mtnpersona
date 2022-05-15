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
      <form className={styles.job__info} onSubmit={onNextHandler}>
        {list.map((items, ind) => {
          return (
            <div className={styles.job__form} key={ind}>
              <div>
                <label
                  className={styles.job__label}
                  htmlFor=""
                  style={{ marginBottom: "10px" }}
                >
                  {items.questions}
                </label>
              </div>
              <>
                {JSON.parse(items.options).map((opt: any, index: any) => {
                  return (
                    <div className={styles.input__details} key={index}>
                      <input
                        type={items.type}
                        name={items.type == "radio" ? `${items.questions}` : ``}
                        value={opt == "Others" ? others : opt ? opt : ""}
                        checked={opt == getChecked(opt) ? true : null}
                        required={items.type == "checkbox" ? false : true}
                        onChange={(e: any) => {
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
                    </div>
                  );
                })}
              </>
            </div>
          );
        })}
        <div className={styles.nav__buttons}>
          <button className={styles.nobackground__button}>
            <Link to="/info/page2">Previous</Link>
          </button>
          <button type="submit" className={styles.filled__button}>
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default PageThree;
