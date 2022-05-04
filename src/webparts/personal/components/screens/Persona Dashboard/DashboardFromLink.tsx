import * as React from "react";
import styles from "./dashboard.module.scss";
import { AccountCircle, ShareSharp, Cancel } from "@material-ui/icons";
import CancelIcon from "@material-ui/icons/Cancel";
import { useParams, useHistory } from "react-router-dom";
import { sp } from "@pnp/sp";
import { CommentModal } from "../EXPERIENCETEAM/View Reports/StaffView";

type Params = {
  name: any;
  email: any;
};

const DashboardFromLink = () => {
  const user = useParams() as Params;
  const [open, setOpen] = React.useState(false);
  const foundUser = React.useRef(user);
  const [userName, setUserName] = React.useState("");
  const [userEmail, setUserEmail] = React.useState("");
  const [list, setList] = React.useState([]);
  const [dp, setDp] = React.useState("");
  const [avatar, setAvatar] = React.useState([]);
  const [id, setId] = React.useState("");
  const [staffImg, setStaffImg] = React.useState("");
  const [rejected, setRejected] = React.useState(false);

  const history = useHistory();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getDp = (arr1: any, arr2: any) => {
    for (let i = 0; i < arr2.length; i++) {
      for (let j = 0; j < arr1.length; j++) {
        if (arr2[i] == arr1[j].Section) {
          setDp(JSON.parse(arr1[j].Avatar).serverRelativeUrl);
          return;
        }
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
          <ul key={index} style={{ fontSize: "small" }}>
            <li>{answer}</li>
          </ul>
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
          <ul key={index} style={{ fontSize: "small" }}>
            <li>{answer}</li>
          </ul>
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
          <ul key={index} style={{ fontSize: "small" }}>
            <li>{answer}</li>
          </ul>
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
          <ul key={index} style={{ fontSize: "small" }}>
            <li>{answer}</li>
          </ul>
        );
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
    setUserName(user.name);
    setUserEmail(user.email);
    sp.web.lists
      .getByTitle("personal")
      .items.get()
      .then((res) => {
        setList(
          res.filter(({ name, email }) => {
            return name === `${userName}` && email === `${userEmail}`;
          })
        );
      });
  }, [userName, userEmail, list, user]);

  React.useEffect(() => {
    if (list.length > 0) {
      setId(list[0].ID);
      list[0].EXApprovalStatus === "No" && setRejected(true);
      setStaffImg(list[0].dp);
    }
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

  return (
    <div className={styles.dashboard__container}>
      <div className={styles.dashboard__header}>
        <div>
          <img src={staffImg} alt="" />
        </div>
        <div>
          <h1>{userName}</h1>
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
      {rejected ? (
        <button className={styles.rejectBtn} disabled>
          <Cancel />
        </button>
      ) : (
        <button className={styles.rejectBtn} onClick={handleOpen}>
          <Cancel />
        </button>
      )}
      <CommentModal
        open={open}
        handleClose={handleClose}
        id={id}
        history={history}
      />
    </div>
  );
};

export default DashboardFromLink;
