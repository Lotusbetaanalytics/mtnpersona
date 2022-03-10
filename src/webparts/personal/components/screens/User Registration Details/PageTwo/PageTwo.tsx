import * as React from "react";
import { Link } from "react-router-dom";
import { Header } from "../../../Containers";
import styles from "../userRegistration.module.scss";

type Props = {};

const PageTwo = (props: Props) => {
  const [gender, setGender] = React.useState("");
  const [evp, setEvp] = React.useState({});
  const [motivation, setMotivation] = React.useState("");

  const genderHandler = (e: any) => {
    setGender(e.target.value);
  };

  const motivationHandler = (e: any) => {
    setMotivation(e.target.value);
  };

  const evpHandler1 = (e: any) => {
    setEvp({ ...evp, evp1: e.target.value });
  };
  const evpHandler2 = (e: any) => {
    setEvp({ ...evp, evp2: e.target.value });
  };

  const onNextHandler = () => {
    localStorage.setItem(
      "data",
      JSON.stringify({
        ...JSON.parse(localStorage.getItem("data")),
        gender,
        evp,
        motivation,
      })
    );
  };
  return (
    <div className={styles.screen3__container}>
      <Header />
      <form className={styles.job__form}>
        <div className={styles.gridItem}>
          <div>
            <label className={styles.job__label} htmlFor="">
              Gender
            </label>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                marginTop: "20px",
                marginBottom: "20px",
                padding: "5px 15px",
              }}
            >
              <div className={styles.input__details}>
                <input
                  type="radio"
                  name="gender"
                  id=""
                  value="male"
                  onChange={genderHandler}
                />
                <div>Male</div>
              </div>
              <div className={styles.input__details}>
                <input
                  type="radio"
                  name="gender"
                  id=""
                  value="female"
                  onChange={genderHandler}
                />
                <div>Female</div>
              </div>
            </div>
          </div>
          <div>
            <label className={styles.job__label} htmlFor="">
              What 1 project below is guaranteed to turn your frown upside down
              and just generally make the MTN world a happier place for you?
            </label>
            <div className={styles.space__gap}>
              <div className={styles.input__details}>
                <input
                  type="radio"
                  name="motivation"
                  id=""
                  value="Project 1"
                  onChange={motivationHandler}
                />
                <div>Project 1</div>
              </div>
              <div className={styles.input__details}>
                <input
                  type="radio"
                  name="motivation"
                  id=""
                  value="Project 2"
                  onChange={motivationHandler}
                />
                <div>Project 2</div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div>
            <label className={styles.job__label} htmlFor="">
              Which EVP resonates the most with you?
            </label>
            <div className={styles.space__gap}>
              <div className={styles.input__details}>
                <input
                  type="checkbox"
                  name="eastern1"
                  id=""
                  value="eastern"
                  onChange={evpHandler1}
                />
                <div>Eastern Region</div>
              </div>
              <div className={styles.input__details}>
                <input
                  type="checkbox"
                  name="eastern 2"
                  id=""
                  value="eastern1"
                  onChange={evpHandler2}
                />
                <div>Eastern Region</div>
              </div>
            </div>
          </div>
        </div>
      </form>
      <div className={styles.nav__buttons}>
        <button className={styles.nobackground__button}>
          <Link to="/info/job">Previous</Link>
        </button>
        <button className={styles.filled__button} onClick={onNextHandler}>
          <Link to="/info/page3">Next</Link>
        </button>
      </div>
    </div>
  );
};

export default PageTwo;
