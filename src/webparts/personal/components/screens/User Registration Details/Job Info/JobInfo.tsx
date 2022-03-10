import * as React from "react";
import { Link } from "react-router-dom";
import { Header } from "../../../Containers";
import styles from "../userRegistration.module.scss";

type Props = {};

const JobInfo = (props: Props) => {
  const [yearsofWork, setSetYearsofWork] = React.useState("");
  const [yelloladder, setYelloladder] = React.useState("");
  const [yelloVerse, setYelloVerse] = React.useState("");

  const helloChangeHandler = (e: any) => {
    setYelloladder(e.target.value);
  };

  const yelloVerseHandler = (e: any) => {
    setYelloVerse(e.target.value);
  };

  const onNextHandler = () => {
    localStorage.setItem(
      "data",
      JSON.stringify({
        ...JSON.parse(localStorage.getItem("data")),
        yearsofWork,
        yelloladder,
      })
    );
  };
  return (
    <div className={styles.screen2__container}>
      <Header />
      <form className={styles.job__form}>
        <div
          style={{
            display: "grid",
            width: "100%",
            height: "60%",
            gridTemplateColumns: "1fr",
          }}
        >
          <div>
            <label className={styles.job__label} htmlFor="">
              How many years have you been in the world of work? Both in and
              outside MTN
            </label>
            <div className={styles.select}>
              <select
                name=""
                id=""
                onChange={(e) => {
                  setSetYearsofWork(e.target.value);
                }}
              >
                <option>Select...</option>
                <option value="0-2 Years">0 - 2 Years</option>
                <option value="3-5 Years">3 - 5 Years</option>
                <option value="6-10 Years">6 - 10 Years</option>
                <option value="11-20 Years">11 - 20 Years</option>
                <option value="Over 30 Years">Over 30 Years</option>
              </select>
              <span className={styles.focus}></span>
            </div>
          </div>
          <div style={{ margin: "10px 0px" }}>
            <label
              className={styles.job__label}
              htmlFor=""
              style={{ marginBottom: "10px" }}
            >
              Where are you on the Y'ello ladder?
            </label>
            <div className={styles.job__info}>
              <div className={styles.input__details}>
                <input
                  type="radio"
                  name="hello"
                  value="level 2"
                  onChange={helloChangeHandler}
                />
                <div>Job Level 2</div>
              </div>
              <div className={styles.input__details}>
                <input
                  type="radio"
                  name="hello"
                  value="level 4"
                  onChange={helloChangeHandler}
                />
                <div> Job Level 4</div>
              </div>
              <div className={styles.input__details}>
                <input
                  type="radio"
                  name="hello"
                  value="level 3"
                  onChange={helloChangeHandler}
                />
                <div> Job Level 3</div>
              </div>
              <div className={styles.input__details}>
                <input
                  type="radio"
                  name="hello"
                  value="level 5/6"
                  onChange={helloChangeHandler}
                />
                <div> Job Level 5/6</div>
              </div>
              <div className={styles.input__details}>
                <input
                  type="radio"
                  name="hello"
                  value="level 3H"
                  onChange={helloChangeHandler}
                />
                <div> Job Level 3H</div>
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            display: "grid",
            width: "100%",
            height: "60%",
            gridTemplateColumns: "1fr",
          }}
        >
          <label className={styles.job__label} htmlFor="">
            Where in our Y'elloverse are you?
          </label>
          <div className={styles.input__details}>
            <input
              type="radio"
              name="jobinfo"
              id="hq"
              value="HQ (MTN Plaza, MTN Penthouse, Y’ellodrome Annex and Akin
              Adesola)"
              onChange={yelloVerseHandler}
            />
            <div>
              HQ (MTN Plaza, MTN Penthouse, Y’ellodrome Annex and Akin Adesola)
            </div>
          </div>

          <div className={styles.input__details}>
            <div>
              <input
                type="radio"
                name="jobinfo"
                value="LSW (Aromire, Matari, ojota, Opebi/MM2, Allen, Apapa, Switch, VGC,
              Y'ello City, Ibadan, Benin, Abeokuta)"
                onChange={yelloVerseHandler}
              />
            </div>
            <div>
              LSW (Aromire, Matari, ojota, Opebi/MM2, Allen, Apapa, Switch, VGC,
              Y'ello City, Ibadan, Benin, Abeokuta)
            </div>
          </div>
          <div className={styles.input__details}>
            <div>
              <input
                type="radio"
                name="jobinfo"
                value="Eastern Region (All locations in the Eastern Region)"
                onChange={yelloVerseHandler}
              />
            </div>
            <div>Eastern Region (All locations in the Eastern Region)</div>
          </div>
          <div className={styles.input__details}>
            <input
              type="radio"
              name="jobinfo"
              value="Nothern Region (All locations in the Nothern Region)"
              onChange={yelloVerseHandler}
            />
            <div>Nothern Region (All locations in the Nothern Region)</div>
          </div>
        </div>
      </form>
      <div className={styles.nav__buttons}>
        <button className={styles.nobackground__button}>
          <Link to="/info/personal">Previous</Link>
        </button>
        <button className={styles.filled__button} onClick={onNextHandler}>
          <Link to="/info/page2">Next</Link>
        </button>
      </div>
    </div>
  );
};

export default JobInfo;
