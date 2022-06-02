import * as React from "react";
import { Link, useHistory } from "react-router-dom";
import { Header } from "../../../../Containers";
import { sp, spGet, spPost } from "@pnp/sp";
import { default as pnp, ItemAddResult } from "sp-pnp-js";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import styles from "../userRegistration.module.scss";
import swal from "sweetalert";

type Props = {};

const EditJobInfo = (props: Props) => {
  const [list, setList] = React.useState([]);
  const [response, setResponse] = React.useState([]);
  const [count, setCount] = React.useState(0);
  const [total, setTotal] = React.useState(0);
  const [sectionResponses, setSectionResponses] = React.useState([]);
  const [others, setOthers] = React.useState("");
  const [ot, setOt] = React.useState({});
  const [test, setTest] = React.useState([]);
  const [userResponse, setUserResponse] = React.useState({});
  const [myResponses, setMyResponses] = React.useState([]);
  let arr = [];
  const prevArrGet = [];

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
    for (let i = 0; i < list.length; i++) {
      test.push({ [i]: "", show: false });
    }
  }, [list]);

  React.useEffect(() => {
    sp.profiles.myProperties.get().then((profile) => {
      sp.web.lists
        .getByTitle("personal")
        .items.filter(`email eq '${profile.Email}'`)
        .select("responses,email,name,ID")
        .get()
        .then((response) => {
          setMyResponses(JSON.parse(response[0].responses));
          response.length > 0 && setUserResponse(response[0]);
        });
    });
  }, []);

  const history = useHistory();

  const getItems = () => {
    for (let item in ot) {
      arr.push(ot[item]);
    }
  };

  const onNextHandler = (e) => {
    e.preventDefault();
    getItems();
    history.push("/dashboard/edit/page2");
    const existing = JSON.parse(localStorage.getItem("editdata"));
    if (prevArrGet.length > 0) {
      localStorage.setItem(
        "editdata",
        JSON.stringify([...arr, ...prevArrGet, ...response, ...existing])
      );
    } else {
      localStorage.setItem(
        "editdata",
        JSON.stringify([...arr, ...response, ...existing])
      );
    }
  };

  React.useEffect(() => {
    const sectionResponse = prevHandler("bio");
    setSectionResponses(sectionResponse);
  }, []);

  const getChecked = (opt, id) => {
    if (sectionResponses.length > 0) {
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

      if (answer.length > 0) {
        prevArrGet.push(answer[0]);
      }

      return answer.length > 0 && answer[0].answer;
    }

    if (opt == "Others") {
      const findOthers = myResponses.filter(
        (item, i) => item.type == "Others" && item.id == id
      );
      if (findOthers.length > 0) {
        prevArrGet.push(findOthers[0]);
        return "Others";
      }
    }

    const answer = myResponses.filter(({ answer }) => answer == opt);

    if (answer.length > 0) {
      prevArrGet.push(answer[0]);
    }

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
              <div className={styles.selectedResponse}>
                <strong>Your selected response:</strong>
                {/* @ts-ignore:*/}
                {getAnswers(userResponse, items.questions, items.ID)}
              </div>
              <>
                {JSON.parse(items.options).map((opt: any, index: any) => {
                  return (
                    <div className={styles.input__details}>
                      <input
                        type={items.type}
                        data-id={index}
                        name={items.type == "radio" ? `${items.questions}` : ``}
                        value={
                          opt == "Others"
                            ? test.length > 0 && test[ind][ind]
                            : opt
                            ? opt
                            : ""
                        }
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
                              question: items.questions,
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
                                question: items.questions,
                                type: "checkbox",
                              },
                            ]);
                          } else {
                            test[ind]["show"] = false;
                            let thisReponse = {
                              answer: e.target.value,
                              id: items.ID,
                              section: items.section,
                              question: items.questions,
                              type: "radio",
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
                                      question: items.questions,
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
            <Link to="/dashboard/edit/start">Previous</Link>
          </button>
          <button type="submit" className={styles.filled__button}>
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditJobInfo;

export const prevHandler = (section = "") => {
  const responses = JSON.parse(localStorage.getItem("editdata")) || [];

  const otherSections = responses.filter(
    (response) => response.section !== section
  );

  localStorage.setItem("editdata", JSON.stringify(otherSections));

  return responses.filter((response) => response.section == section);
};
export const getResponsesFromTwoSections = (section1 = "", section2 = "") => {
  const responses = JSON.parse(localStorage.getItem("editdata")) || [];

  const otherSections = responses.filter(
    (response) => response.section !== section1 || response.section !== section2
  );

  localStorage.setItem("editdata", JSON.stringify(otherSections));

  return responses.filter(
    (response) => response.section === section1 || response.section === section2
  );
};

export const getAnswers = (response, check, questionID) => {
  if (response && response.responses) {
    response = JSON.parse(response.responses);
    return response
      .filter(({ question, id }) => {
        return question == check || id == questionID;
      })
      .map(({ answer }) => {
        return <li>{answer}</li>;
      });
  }
};
