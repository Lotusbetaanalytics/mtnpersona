import * as React from "react";
import { default as pnp, ItemAddResult } from "sp-pnp-js";
import { sp, spGet, spPost } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import styles from "./dashboard.module.scss";
import { AccountCircle, ShareSharp } from "@material-ui/icons";

const Dashboard = () => {
  const [list, setList] = React.useState([]);
  const [userName, setUserName] = React.useState("");
  const [dp, setDp] = React.useState("");
  const [avatar, setAvatar] = React.useState([]);
  const [myInterests, setMyInterests] = React.useState([]);

  const getDp = (arr1: any, arr2: any) => {
    for (let i = 0; i < arr1.length; i++) {
      if (arr2.includes(arr1[i].Section)) {
        setDp(JSON.parse(arr1[i].Avatar).serverRelativeUrl);
        return;
      }
    }
    return [];
  };

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

  const motivator = list.map(({ responses }) => {
    return JSON.parse(responses)
      .filter(({ section }) => {
        return section === "motivator";
      })
      .map(({ answer }, index: any) => {
        return (
          <div key={index} style={{ fontSize: "small" }}>
            <>{answer}</>
          </div>
        );
      });
  });
  const interests = list.map(({ responses }) => {
    return JSON.parse(responses)
      .filter(({ section }) => {
        return section === "interests";
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
  const attributes = list.map(({ responses }) => {
    return JSON.parse(responses)
      .filter(({ section }) => {
        return section === "attributes";
      })
      .map(({ answer }) => {
        return <div>{answer}</div>;
      });
  });
  const communication = list.map(({ responses }) => {
    return JSON.parse(responses)
      .filter(({ section }) => {
        return section === "communication";
      })
      .map(({ answer }) => {
        return <div>{answer}</div>;
      });
  });
  const worries = list.map(({ responses }) => {
    return JSON.parse(responses)
      .filter(({ section }) => {
        return section === "worries";
      })
      .map(({ answer }) => {
        return <div>{answer}</div>;
      });
  });

  React.useEffect(() => {
    sp.web.lists
      .getByTitle("Avatars")
      .items.get()
      .then((res) => {
        setAvatar(res);
      });
  }, []);

  React.useEffect(() => {
    setMyInterests(
      list.map(({ responses }) => {
        return JSON.parse(responses).filter(({ section }) => {
          return section === "interests";
        });
      })
    );
  }, [list]);

  React.useEffect(() => {
    const arr2 = list.map(({ responses }) => {
      return JSON.parse(responses).filter(({ section }) => {
        return section === "interests";
      });
    });

    const newArr = [];

    for (let item of arr2.flat()) {
      newArr.push(item.answer);
    }

    getDp(avatar, newArr);
  }, [list]);

  React.useEffect(() => {
    sp.profiles.myProperties.get().then((response) => {
      setUserName(response.DisplayName);
      sp.web.lists
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
        <div>
          <img src={dp} alt="" />
        </div>
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
              <div>{communication}</div>
            </div>
          </div>
          <div className={styles.left__card__3}>
            <div className={styles.single__card__bg}>
              <div>
                <h5>Motivators</h5>
              </div>
              <div>{motivator}</div>
            </div>
            <div className={styles.single__card__bg}>
              <div>
                <h5>Worries</h5>
              </div>
              <div>{worries}</div>
            </div>
          </div>
        </div>
        <div className={styles.dashboard__cards__right}>
          <div className={styles.card__right__first}>
            <div className={styles.card__circle}>
              <ShareSharp />
            </div>
            <div>
              <h5>Career Goal</h5>
            </div>
            <div>{goals}</div>
          </div>
          <div className={styles.card__right__second}>
            <div className={styles.card__circle}>
              <ShareSharp />
            </div>
            <div>
              <h5>Interests</h5>
            </div>
            <div>{interests}</div>
          </div>
          <div className={styles.card__right__third}>
            <div className={styles.right__heading}>
              <h5>Key Attributes</h5>
            </div>
            <div>{attributes}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
