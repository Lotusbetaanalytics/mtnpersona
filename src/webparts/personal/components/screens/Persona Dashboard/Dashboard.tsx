import * as React from "react";
import { default as pnp, ItemAddResult } from "sp-pnp-js";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import styles from "./dashboard.module.scss";
import { AccountCircle } from "@material-ui/icons";

const Dashboard = () => {
  const [list, setList] = React.useState([]);
  const [userName, setUserName] = React.useState("");

  const bio = list.map(({ responses }) => {
    return JSON.parse(responses)
      .filter(({ section }) => {
        return section === "bio";
      })
      .map(({ answer }, index: any) => {
        return (
          <ul key={index} style={{ fontSize: "small" }}>
            <li>{answer}</li>
          </ul>
        );
      });
  });
  const learning = list.map(({ responses }) => {
    return JSON.parse(responses)
      .filter(({ section }) => {
        return section === "learning";
      })
      .map(({ answer }, index: any) => {
        return (
          <div key={index} style={{ fontSize: "small" }}>
            <>{answer}</>
          </div>
        );
      });
  });

  const goals = list.map(({ responses }) => {
    return JSON.parse(responses)
      .filter(({ section }) => {
        return section === "goals" || section === "priorities";
      })
      .map(({ answer }) => {
        return <div>{answer}</div>;
      });
  });

  React.useEffect(() => {
    pnp.sp.profiles.myProperties.get().then((response) => {
      setUserName(response.DisplayName);
      pnp.sp.web.lists
        .getByTitle("personal")
        .items.get()
        .then((res) => {
          setList(
            res.filter(({ name, email }) => {
              return (
                name === `${response.DisplayName}` &&
                email === `${response.Email}`
              );
            })
          );
        });
    });
  }, []);

  return (
    <div className={styles.dashboard__container}>
      <div className={styles.dashboard__header}>
        <div></div>
        <div>
          <h1>{userName}</h1>
        </div>
        <div>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit.
          Reprehenderit perferendis ducimus aspernatur iusto nesciunt eaque
          consequuntur veniam, ipsum eum itaque.
        </div>
      </div>
      <div className={styles.dashboard__cards}>
        <div className={styles.dashboard__cards__left}>
          <div className={styles.card__big}>
            <div className={styles.card__big__heading}>
              <h5>Short Bio</h5>
              <div style={{ justifySelf: "flex-end" }}>
                <AccountCircle />
              </div>
            </div>
            <div
              style={{
                padding: "15px",
                height: "100%",
                fontSize: "medium",
              }}
            >
              {bio}
            </div>
          </div>
          <div className={styles.left__card__2}>
            <div className={styles.single__card}>
              <div>
                <h5>Learning Preference</h5>
                <div
                  style={{
                    padding: "10px",
                    height: "100%",
                    fontSize: "small",
                  }}
                >
                  {learning}
                </div>
              </div>
            </div>
            <div className={styles.single__card}>
              <div>
                <h5>Communication Preference</h5>
              </div>
            </div>
          </div>
          <div className={styles.left__card__3}>
            <div className={styles.single__card__bg}>
              <div>
                <h5>Motivators</h5>
              </div>
            </div>
            <div className={styles.single__card__bg}>
              <div>
                <h5>Worries</h5>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.dashboard__cards__right}>
          <div className={styles.card__right__first}>
            <div><h3>Career Goal</h3></div>
          </div>
          <div className={styles.card__right__second}>
            <div><h3>Interests</h3></div>
          </div>
          <div className={styles.card__right__third}>
            <div className={styles.card__big__heading}>
              <h5>Key Attributes</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
