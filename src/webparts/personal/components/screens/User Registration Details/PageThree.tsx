import * as React from "react";
import { Link, useHistory } from "react-router-dom";
import { Header } from "../../Containers";
import { sp, spGet, spPost } from "@pnp/sp";
import { default as pnp, ItemAddResult } from "sp-pnp-js";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import styles from "./userRegistration.module.scss";

type Props = {};

const PageThree = (props: Props) => {
  const [list, setList] = React.useState([]);
  const [response, setResponse] = React.useState([]);
  const [count, setCount] = React.useState(0);
  const [questions, setQuestions] = React.useState(0);

  const [total, setTotal] = React.useState(0);

  const history = useHistory();

  const onNextHandler = () => {
    if (response.length >= questions) {
      history.push("/info/page4");
      localStorage.setItem("count", JSON.stringify(count));
      localStorage.setItem(
        "data",
        JSON.stringify([
          ...JSON.parse(localStorage.getItem("data")),
          ...response,
        ])
      );
    }
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
  return (
    <div className={styles.screen2__container}>
      <Header />
      {count} out of {total} | We'd like to know about your goals and mode of
      communication
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
