import * as React from "react";
import { default as pnp, ItemAddResult } from "sp-pnp-js";
import { sp, spGet, spPost } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import styles from "./dashboard.module.scss";
import { AccountCircle, ShareSharp } from "@material-ui/icons";
import * as _ from "lodash";

const Dashboard = () => {
  const [list, setList] = React.useState([]);
  const [userName, setUserName] = React.useState("");
  const [dp, setDp] = React.useState("");
  const [avatar, setAvatar] = React.useState([]);
  const [myInterests, setMyInterests] = React.useState([]);
  const [division, setDivision] = React.useState("");
  const [length, setLength] = React.useState(0);
  const [interestGroup, setInterestGroup] = React.useState([]);
  const [total, setTotal] = React.useState([]);
  const [staffDp, setStaffDp] = React.useState("");
  const [avatarName, setAvatarName] = React.useState("");
  const [avatarDp, setAvatarDp] = React.useState("");
  const [avatarDescription, setAvatarDescription] = React.useState("");

  const getNumberofInterests = () => {
    return sp.web.lists
      .getByTitle("personal")
      .items.get()
      .then((items) => {
        let foundDivisions = items
          .filter((item) => {
            return item.division == division;
          })
          .map(({ responses }) => {
            return JSON.parse(responses)
              .filter(({ section }) => {
                return section == "interests";
              })
              .flat();
          });
        setInterestGroup(foundDivisions.flat(1));
      });
  };

  //helper function to get employees in same division
  const getNumberofEmployees = () => {
    return sp.web.lists
      .getByTitle("personal")
      .items.get()
      .then((items) => {
        let foundDivisions = items.filter((item) => {
          return item.division == division;
        });

        setTotal(foundDivisions.flat(1));
      });
  };

  //get interest group
  React.useEffect(() => {
    getNumberofInterests();
  }, [division]);

  //Number of employees in staff division
  React.useEffect(() => {
    getNumberofEmployees();
  }, [division]);

  //calculate number of interest group
  const calculateLength = (param) => {
    const count = interestGroup.filter(({ answer }) => {
      return answer == param;
    });
    return count.length;
  };

  //get the avatar for a specific super power
  const getDp = (arr1: any, arr2: any) => {
    const foundAttributes = [];
    for (let i = 0; i < arr2.length; i++) {
      for (let { SuperPower } of arr1) {
        let superPowerArray = SuperPower.split(";");
        if (superPowerArray.includes(arr2[i])) {
          foundAttributes.push(arr2[i]);
        }
      }
    }
    for (let { SuperPower, Avatar, AvatarName, Definition } of arr1) {
      const superPowerArray = SuperPower.split(";");
      if (_.isEqual(foundAttributes, superPowerArray)) {
        setAvatarDp(JSON.parse(Avatar).serverRelativeUrl); //set dp
        setAvatarName(AvatarName); //set avatar name
        setAvatarDescription(Definition); //set description
        return;
      }
    }
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
          <ul key={index} style={{ fontSize: "small" }}>
            <li>{answer}</li>
          </ul>
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
          <ul key={index} style={{ fontSize: "small" }}>
            <li>{answer}</li>
          </ul>
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
          <>
            <li
              key={index}
              style={{
                fontSize: "11px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "5px",
                width: "100%",
              }}
            >
              <span style={{ flex: "1.5" }}> {answer}</span>
              <progress
                style={{ flex: "0.5", color: "#ffc423" }}
                value={calculateLength(answer)}
                max={total.length}
              ></progress>
            </li>
          </>
        );
      });
  });

  const goals = list.map(({ responses }) => {
    return JSON.parse(responses)
      .filter(({ section }) => {
        return section === "goals" || section === "priorities";
      })
      .map(({ answer }, index: any) => {
        return (
          <ul key={index} style={{ fontSize: "small" }}>
            <li>{answer}</li>
          </ul>
        );
      });
  });
  const attributes = list.map(({ responses }) => {
    return JSON.parse(responses)
      .filter(({ section }) => {
        return section === "attributes";
      })
      .map(({ answer }, index: any) => {
        return (
          <>
            <li key={index} style={{ fontSize: "11px" }}>
              {answer}
            </li>
          </>
        );
      });
  });
  const communication = list.map(({ responses }) => {
    return JSON.parse(responses)
      .filter(({ section }) => {
        return section === "communication";
      })
      .map(({ answer }, index: any) => {
        return (
          <li key={index} style={{ fontSize: "11px" }}>
            {answer}
          </li>
        );
      });
  });
  const worries = list.map(({ responses }) => {
    return JSON.parse(responses)
      .filter(({ section }) => {
        return section === "worries";
      })
      .map(({ answer }, index: any) => {
        return (
          <li key={index} style={{ fontSize: "11px" }}>
            {answer}
          </li>
        );
      });
  });

  //get a list of avatar
  React.useEffect(() => {
    sp.web.lists
      .getByTitle("Avatars")
      .items.get()
      .then((res) => {
        console.log(res);
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

  //Assign avatar to interest group
  React.useEffect(() => {
    const arr2 = list.map(({ responses }) => {
      return JSON.parse(responses).filter(({ section }) => {
        return section === "attributes";
      });
    });

    const newArrOfAnswers = [];

    for (let item of arr2.flat()) {
      newArrOfAnswers.push(item.answer);
    }

    getDp(avatar, newArrOfAnswers);
  }, [list]);

  //set staff division
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
          let foundStaff = res.filter(({ name, email }) => {
            return (
              name === `${response.DisplayName}` &&
              email === `${response.Email}`
            );
          });

          setDivision(foundStaff[0].division);
          setStaffDp(foundStaff[0].dp);
        });
    });
  }, []);

  return (
    <div className={styles.dashboard__container}>
      <div className={styles.dashboard__header}>
        <div className={styles.personalImage}>
          <img src={staffDp} alt="" />
        </div>
        <div>
          <h1>{userName}</h1>
        </div>
        <div className={styles.avatarSection}>
          <img src={avatarDp} alt="" />
          <div>{avatarDescription}</div>
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
            <ul>{interests}</ul>
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
