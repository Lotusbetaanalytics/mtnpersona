import * as React from "react";
import { Link, useHistory } from "react-router-dom";
import { sp, spGet, spPost } from "@pnp/sp";
import { default as pnp, ItemAddResult } from "sp-pnp-js";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import styles from "../userRegistration.module.scss";
import { Header } from "../../../Containers";
import { Context } from "../../../Personal";
import { getResponsesFromTwoSections, prevHandler } from "../Job Info/JobInfo";
import swal from "sweetalert";

type Props = {};

const PageTwo = (props: Props) => {
  const [list, setList] = React.useState([]);
  const [response, setResponse] = React.useState([]);
  const [count, setCount] = React.useState(0);
  const [questions, setQuestions] = React.useState(0);
  const [data, setData] = React.useState("");
  const [checkboxResponse, setCheckboxResponse] = React.useState([]);
  const [sectionResponses, setSectionResponses] = React.useState([]);
  const [total, setTotal] = React.useState(0);
  const [others, setOthers] = React.useState("");
  const [ot, setOt] = React.useState({});
  const [test, setTest] = React.useState([]);
  let arr = [];
  const prevArrGet = [];

  React.useEffect(() => {
    sp.web.lists
      .getByTitle("personal")
      .items.getById(JSON.parse(localStorage.getItem("surveyId")))
      .get()
      .then((response) => {
        response.attributes && setData(response.attributes);
      });
  }, []);

  const history = useHistory();

  const onNextHandler = (e) => {
    e.preventDefault();
    getItems();
    history.push("/info/page3");
    const existing = JSON.parse(localStorage.getItem("data"));

    localStorage.setItem(
      "data",
      JSON.stringify([...arr, ...response, ...existing])
    );

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
              return section === "attributes" || section === "learning";
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
    for (let i = 0; i < list.length; i++) {
      test.push({ [i]: "", show: false });
    }
  }, [list]);

  React.useEffect(() => {
    setSectionResponses(getResponsesFromTwoSections("attributes", "learning"));
  }, []);

  const getItems = () => {
    for (let item in ot) {
      arr.push(ot[item]);
    }
  };

  const getChecked = (opt, id) => {
    if (opt == "Others") {
      const findOthers = sectionResponses.filter(
        (item, i) => item.type == "Others" && item.id == id
      );
      if (findOthers.length > 0) {
        prevArrGet.push(findOthers[0]);
        return "Others";
      }
    }
    const answer = sectionResponses.filter(({ answer }) => answer == opt);
    if (answer.length > 0) prevArrGet.push(answer[0]);
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
                        checked={opt == getChecked(opt, items.ID) ? true : null}
                        required={
                          items.type == "checkbox"
                            ? false
                            : JSON.parse(items.required)
                        }
                        onChange={(e: any) => {
                          if (opt == "Others") {
                            test[ind]["show"] = true;
                            test[ind][ind] = e.target.value;
                            let thisReponse = {
                              answer: test[ind][ind],
                              id: items.ID,
                              section: items.section,
                              type: "Others",
                            };
                            setOt({ ...ot, [ind]: thisReponse });
                          } else if (items.type == "checkbox") {
                            setResponse([
                              ...response,
                              {
                                answer: e.target.value,
                                id: items.ID,
                                section: items.section,
                                type: items.type,
                              },
                            ]);
                          } else {
                            test[ind]["show"] = false;
                            let thisReponse = {
                              answer: e.target.value,
                              id: items.ID,
                              section: items.section,
                              type: items.type,
                            };
                            setOt({ ...ot, [ind]: thisReponse });
                          }
                        }}
                      />
                      <div className={styles.input__options}>
                        <div>
                          {opt == "Others" ? (
                            <div>
                              Others, specify
                              {test.length > 0 && test[ind]["show"] && (
                                <input
                                  type="text"
                                  key={index}
                                  data-key={index}
                                  value={test.length > 0 && test[ind][ind]}
                                  onChange={(e) => {
                                    test[ind][ind] = e.target.value;

                                    let thisReponse = {
                                      answer: test[ind][ind],
                                      id: items.ID,
                                      section: items.section,
                                      type: "Others",
                                    };
                                    setOt({ ...ot, [ind]: thisReponse });
                                  }}
                                  style={{
                                    border: "none",
                                    borderBottom: "1px solid grey",
                                    margin: "0 10px",
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
            <Link to="/info/page1">Previous</Link>
          </button>
          <button type="submit" className={styles.filled__button}>
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default PageTwo;

export const ChangeHandler = (e, item, section) => {
  const [data, setData] = React.useState("");

  React.useEffect(() => {
    sp.web.lists
      .getByTitle("personal")
      .items.getById(JSON.parse(localStorage.getItem("surveyId")))
      .get()
      .then((response) => {
        console.log(response[section]);
        response[section] && setData(response[section]);
      });
  }, []);

  if (item.type == "checkbox") {
    console.log(data);
    localStorage.getItem("surveyId") &&
      sp.web.lists
        .getByTitle("personal")
        .items.getById(JSON.parse(localStorage.getItem("surveyId")))
        .update({
          [item.section]:
            data == null ? e.target.value : `${data && data};${e.target.value}`,
        })
        .then((response) => {
          console.log(response);
          localStorage.getItem("surveyId") &&
            sp.web.lists
              .getByTitle("personal")
              .items.getById(JSON.parse(localStorage.getItem("surveyId")))
              .get()
              .then((response) => {
                console.log(response.section);
                response[section] && setData(response[section]);
              });
        });
  } else {
    localStorage.getItem("surveyId") &&
      sp.web.lists
        .getByTitle("personal")
        .items.getById(JSON.parse(localStorage.getItem("surveyId")))
        .update({
          [item.section]: e.target.value,
        })
        .then((response) => {
          console.log(response);
        });
  }
};

export const ChangeHandlerRadio = (e, item) => {
  localStorage.getItem("surveyId") &&
    sp.web.lists
      .getByTitle("personal")
      .items.getById(JSON.parse(localStorage.getItem("surveyId")))
      .update({
        [item.section]: e.target.value,
      })
      .then((response) => {
        console.log(response);
      });
};
