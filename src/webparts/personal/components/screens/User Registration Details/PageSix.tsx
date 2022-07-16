import * as React from "react";
import { useHistory } from "react-router-dom";
import { Header } from "../../Containers";
import MyModal from "../../Containers/Modal/Modal";
import styles from "./userRegistration.module.scss";
import { sp, spGet, spPost } from "@pnp/sp";
import { default as pnp, ItemAddResult } from "sp-pnp-js";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import Toast from "../../Containers/Toast";
import { prevHandler } from "./Job Info/JobInfo";
import swal from "sweetalert";

type Props = {};

const PageSix = (props: Props) => {
  const history = useHistory();
  const [open, setOpen] = React.useState(false);
  const [show, setShow] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [list, setList] = React.useState([]);
  const [response, setResponse] = React.useState([]);
  const [sectionResponses, setSectionResponses] = React.useState([]);
  const [count, setCount] = React.useState(
    0 || JSON.parse(localStorage.getItem("count"))
  );

  const [questions, setQuestions] = React.useState(0);
  const [total, setTotal] = React.useState(0);
  const [others, setOthers] = React.useState("");
  const [showField, setShowField] = React.useState(false);
  const [ot, setOt] = React.useState({});
  const [test, setTest] = React.useState([]);
  let arr = [];
  const prevArrGet = [];

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
              return section === "priorities";
            })
          );
        });
    } catch (e) {
      console.log(e.message);
    }
  }, []);

  React.useEffect(() => {
    setQuestions(list.length);
    setCount((prev) => prev + list.length);
    for (let i = 0; i < list.length; i++) {
      test.push({ [i]: "", show: false });
    }
  }, [list]);

  React.useEffect(() => {
    setSectionResponses(prevHandler("priorities"));
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

  const submitHandler = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    getItems();
    const data = JSON.parse(localStorage.getItem("data"));
    const userData = JSON.parse(localStorage.getItem("userData"));
    const dp = JSON.parse(localStorage.getItem("dp"));

    if (!data) {
      setLoading(false);
      localStorage.removeItem("userData");
      localStorage.removeItem("dp");
      setMessage("No answers provided!");
      setShow(true);
      setTimeout(() => {
        history.push("/info/personal");
      }, 1000);
      return;
    } else if (!userData) {
      setLoading(false);
      localStorage.removeItem("data");
      localStorage.removeItem("dp");
      setMessage("No user data found!");
      setShow(true);
      setTimeout(() => {
        history.push("/info/personal");
      }, 1000);
      return;
    } else {
      const answerData = [...data, ...response, ...arr];
      sp.web.lists
        .getByTitle("personal")
        .items.add({
          Title: `${Math.random()}`,
          name: userData.name,
          alias: userData.alias,
          responses: JSON.stringify(answerData),
          division: userData.division,
          email: userData.email,
          LineManager: userData.LineManager,
          dp: dp && dp,
        })
        .then(() => {
          setLoading(false);
          localStorage.removeItem("data");
          localStorage.removeItem("userData");
          localStorage.removeItem("dp");
          setMessage("Answers Submitted!");
          setShow(true);
          setTimeout(() => {
            history.push("/info/dashboard");
          }, 1000);
          sp.profiles.myProperties.get().then((response) => {
            sp.web.lists.getByTitle("Logs").items.add({
              Title: "Survey Completed!",
              Name: response.DisplayName,
              Email: response.Email,
              Description: "A survey was completed!",
            });
          });
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
          setShow(true);
          setMessage("An error occurred! Try again...");
        });
    }
  };

  return (
    <div className={styles.screen2__container}>
      <Header />
      <form className={styles.job__info} onSubmit={submitHandler}>
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
                            sectionResponses.length > 0 &&
                              setSectionResponses((prev) => {
                                return prev.filter(
                                  ({ id, type }) =>
                                    id != items.ID && type != "Others"
                                );
                              });
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
                            if (e.target && !e.target.checked) {
                              sectionResponses.length > 0 &&
                                setSectionResponses((prev) => {
                                  return prev.filter(
                                    ({ answer, id }) =>
                                      answer != opt && id != items.ID
                                  );
                                });

                              setResponse((prev) => {
                                return prev.filter(
                                  ({ answer }) => answer != opt
                                );
                              });

                              return;
                            }

                            setResponse((prev) => [
                              ...prev,
                              {
                                answer: opt,
                                id: items.ID,
                                section: items.section,
                                question: items.questions,
                                type: "checkbox",
                              },
                            ]);
                          } else if (items.type == "radio") {
                            sectionResponses.length > 0 &&
                              setSectionResponses((prev) => {
                                return prev.filter(({ id }) => id != items.ID);
                              });

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
        <div className={styles.nav__buttons} style={{ bottom: "-10px" }}>
          {loading ? (
            <span className={`${styles.nobackground__button} ${styles.btn}`}>
              Cancel
            </span>
          ) : (
            <span
              className={`${styles.nobackground__button} ${styles.btn}`}
              onClick={handleOpen}
            >
              Cancel
            </span>
          )}
          {loading ? (
            <button className={styles.filled__button}>Submitting...</button>
          ) : (
            <button className={styles.filled__button} type="submit">
              Submit
            </button>
          )}
        </div>
        <MyModal open={open} handleClose={handleClose} history={history} />
        <Toast show={show} setShow={setShow} message={message} />
      </form>
    </div>
  );
};

export default PageSix;
