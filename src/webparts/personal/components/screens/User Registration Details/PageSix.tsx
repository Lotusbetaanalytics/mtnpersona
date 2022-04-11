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

type Props = {};

const PageSix = (props: Props) => {
  const history = useHistory();
  const [open, setOpen] = React.useState(false);
  const [show, setShow] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [list, setList] = React.useState([]);
  const [response, setResponse] = React.useState([]);
  const [count, setCount] = React.useState(
    0 || JSON.parse(localStorage.getItem("count"))
  );
  const [questions, setQuestions] = React.useState(0);

  const [total, setTotal] = React.useState(0);

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
          console.log(res);
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

  const data = JSON.parse(localStorage.getItem("data"));
  const userData = JSON.parse(localStorage.getItem("userData"));
  const dp = JSON.parse(localStorage.getItem("dp"));

  const submitHandler = async (e: any) => {
    e.preventDefault();
    if (response.length >= questions) {
      setLoading(true);
      if (!data && !userData) {
        setLoading(false);
        setMessage("No answers provided!");
        setShow(true);
        setTimeout(() => {
          history.push("/info/personal");
        }, 1000);
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
            dp,
          })
          .then(() => {
            setLoading(false);
            localStorage.removeItem("userData");
            localStorage.removeItem("data");
            setMessage("Answers Submitted! 😊");
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
    }
  };

  return (
    <div className={styles.screen2__container}>
      <Header />
      <div>
        {count}out of {total} | Whoops!! You got to the last page 👍... Please
        tell us about your priorities
      </div>
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
                          value={opt ? opt : ""}
                          onChange={(e: any) => {
                            setResponse([
                              ...response,
                              {
                                answer: e.target.value,
                                id: items.GUID,
                                section: items.section,
                              },
                            ]);
                          }}
                        />
                        <div className={styles.input__options}>
                          <div>{opt ? opt : ""}</div>
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
                          id: items.GUID,
                          section: items.section,
                        },
                      ]);
                    }}
                  >
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
      <div className={styles.nav__buttons} style={{ bottom: "-10px" }}>
        <button className={styles.nobackground__button} onClick={handleOpen}>
          Cancel
        </button>
        {loading ? (
          <button className={styles.filled__button}>Submitting...</button>
        ) : (
          <button className={styles.filled__button} onClick={submitHandler}>
            Submit
          </button>
        )}
      </div>
      <MyModal open={open} handleClose={handleClose} />
      <Toast show={show} setShow={setShow} message={message} />
    </div>
  );
};

export default PageSix;
