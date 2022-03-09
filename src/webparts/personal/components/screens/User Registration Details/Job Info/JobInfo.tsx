import * as React from "react";
import { Link } from "react-router-dom";
import { Header } from "../../../Containers";
import styles from "../userRegistration.module.scss";

type Props = {};

const JobInfo = (props: Props) => {
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
              <select name="" id="">
                <option value="">1</option>
                <option value="">2</option>
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
                <input type="radio" name="hello" />
                <div>Job Level 2</div>
              </div>
              <div className={styles.input__details}>
                <input type="radio" name="hello" />
                <div> Job Level 4</div>
              </div>
              <div className={styles.input__details}>
                <input type="radio" name="hello" />
                <div> Job Level 3</div>
              </div>
              <div className={styles.input__details}>
                <input type="radio" name="hello" />
                <div> Job Level 5/6</div>
              </div>
              <div className={styles.input__details}>
                <input type="radio" name="hello" />
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
            <input type="radio" name="jobinfo" id="hq" value="HQ" />
            <div>
              HQ (MTN plaza, MTN Penthouse, Y'ellodrome Annex and Akin Adesola)
            </div>
          </div>

          <div className={styles.input__details}>
            <div>
              <input type="radio" name="jobinfo" value="LSW" />
            </div>
            <div>
              LSW (Aromire, Matari, ojota, Opebi/MM2, Allen, Apapa, Switch, VGC,
              Y'ello City, Ibadan), Benin, Abeokuta
            </div>
          </div>
          <div className={styles.input__details}>
            <div>
              <input type="radio" name="jobinfo" value="eastern region" />
            </div>
            <div>Eastern Region</div>
          </div>
          <div className={styles.input__details}>
            <input type="radio" name="jobinfo" value="nothern region" />
            <div>Nothern Region</div>
          </div>
        </div>
      </form>
      <div className={styles.nav__buttons}>
        <button className={styles.nobackground__button}>
          <Link to="/info/personal">Previous</Link>
        </button>
        <button className={styles.filled__button}>
          <Link to="/info/page2">Next</Link>
        </button>
      </div>
    </div>
  );
};

export default JobInfo;
