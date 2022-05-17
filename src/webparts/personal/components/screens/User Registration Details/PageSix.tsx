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
  }, [list]);

  React.useEffect(() => {
    setSectionResponses(prevHandler("priorities"));
  }, []);

  const getChecked = (opt) => {
    const answer = sectionResponses.filter(({ answer }) => answer == opt);
    return answer.length > 0 && answer[0].answer;
  };

  const submitHandler = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    const data = JSON.parse(localStorage.getItem("data"));
    const userData = JSON.parse(localStorage.getItem("userData"));
    const dp = JSON.parse(localStorage.getItem("dp"));

    if (!data) {
      setLoading(false);
      setMessage("No answers provided!");
      setShow(true);
      setTimeout(() => {
        history.push("/info/personal");
      }, 1000);
      return;
    } else if (!userData) {
      setLoading(false);
      setMessage("No user data found!");
      setShow(true);
      setTimeout(() => {
        history.push("/info/personal");
      }, 1000);
      return;
    } else {
      const answerData = [...data, ...response];
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
                        checked={opt == getChecked(opt) ? true : null}
                        required={
                          items.type == "checkbox"
                            ? false
                            : JSON.parse(items.required)
                        }
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
        <div className={styles.nav__buttons} style={{ bottom: "-10px" }}>
          <button className={styles.nobackground__button} onClick={handleOpen}>
            Cancel
          </button>
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
