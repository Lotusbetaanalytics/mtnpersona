import * as React from "react";
import { Link } from "react-router-dom";
import { spfi, SPFx, spGet, spPost } from "@pnp/sp";
import { default as pnp, ItemAddResult } from "sp-pnp-js";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import styles from "../userRegistration.module.scss";
import { Header } from "../../../Containers";

type Props = {};

const PageTwo = (props: Props) => {
  const [list, setList] = React.useState([]);
  const [response, setResponse] = React.useState([]);

  const onNextHandler = () => {
    localStorage.setItem(
      "data",
      JSON.stringify([...JSON.parse(localStorage.getItem("data")), ...response])
    );
  };

  React.useEffect(() => {
    try {
      pnp.sp.web.lists
        .getByTitle("Questions")
        .items.get()
        .then((res) => {
          console.log(res);

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
  return (
    <div className={styles.screen2__container}>
      <Header />
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
      <div className={styles.nav__buttons}>
        <button className={styles.nobackground__button}>
          <Link to="/info/page1">Previous</Link>
        </button>
        <button className={styles.filled__button} onClick={onNextHandler}>
          <Link to="/info/page3">Next</Link>
        </button>
      </div>
    </div>
  );
};

export default PageTwo;
