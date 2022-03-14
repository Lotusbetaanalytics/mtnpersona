import * as React from "react";
import { Link } from "react-router-dom";
import { Header } from "../../Containers";
import styles from "./userRegistration.module.scss";

type Props = {};

const PageThree = (props: Props) => {
  const [sport, setsport] = React.useState({});
  const [hobby, sethobby] = React.useState("");

  const sportHandler = (e: any) => {
    setsport(e.target.value);
  };

  const hobbyHandler = (e: any) => {
    sethobby(e.target.value);
  };

  const sportHandler1 = (e: any) => {
    setsport({ ...sport, sport1: e.target.value });
  };
  const sportHandler2 = (e: any) => {
    setsport({ ...sport, sport2: e.target.value });
  };

  const onNextHandler = () => {
    localStorage.setItem(
      "data",
      JSON.stringify({
        ...JSON.parse(localStorage.getItem("data")),
        sport,

        hobby,
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
              Which sport do you personally engage in? <br /> (1-2)
            </label>
            <div className={styles.space__gap}>
              <div className={styles.input__details}>
                <input type="checkbox" name="" id="" onChange={sportHandler1} />
                <div>Eastern Region</div>
              </div>
              <div className={styles.input__details}>
                <input type="checkbox" name="" id="" onChange={sportHandler2} />
                <div>Eastern Region</div>
              </div>
            </div>
          </div>
          <div style={{ margin: "10px 0px" }}>
            <label
              className={styles.job__label}
              htmlFor=""
              style={{ marginBottom: "10px" }}
            >
              What’s Your Highest ITK (I too Know) Level?
            </label>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gridGap: "10px",
              }}
            >
              <div className={styles.input__details}>
                <input type="radio" name="hello" value="Doctorate/Ph.D" />
                <div>HND/Bachelor's Degree</div>
              </div>
              <div className={styles.input__details}>
                <input type="radio" name="hello" value="Master's Degree" />
                <div>Master's Degree</div>
              </div>
              <div className={styles.input__details}>
                <input type="radio" name="hello" value="level 3" />
                <div> Diploma</div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div>
            <label className={styles.job__label} htmlFor="">
              Excluding sports, what 1 - 2 things take your excitement level
              from 0-100 in seconds
            </label>
            <div className={styles.space__gap}>
              <div className={styles.input__details}>
                <input type="text" name="hobby" id="" onChange={hobbyHandler} />
                {/* <div>Male</div> */}
              </div>
              {/* <div className={styles.input__details}>
                <input type="radio" name="hobby" id="" />
                <div>Female</div>
              </div> */}
            </div>
          </div>
        </div>
      </form>
      <div className={styles.nav__buttons}>
        <button className={styles.nobackground__button}>
          <Link to="/info/page2">Previous</Link>
        </button>
        <button className={styles.filled__button} onClick={onNextHandler}>
          <Link to="/info/page4">Next</Link>
        </button>
      </div>
    </div>
  );
};

export default PageThree;
