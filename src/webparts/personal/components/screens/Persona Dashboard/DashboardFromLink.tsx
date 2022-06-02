import * as React from "react";
import styles from "./dashboard.module.scss";
import { AccountCircle, ShareSharp, Cancel } from "@material-ui/icons";
import CancelIcon from "@material-ui/icons/Cancel";
import { useParams, useHistory } from "react-router-dom";
import { sp } from "@pnp/sp";
import { CommentModal } from "../EXPERIENCETEAM/View Reports/StaffView";
import { AiFillFileImage, AiFillFilePdf } from "react-icons/ai";
import { Tooltip } from "@material-ui/core";
import { toPng } from "html-to-image";
import swal from "sweetalert";

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
  const [avatarName, setAvatarName] = React.useState("");
  const [avatarDp, setAvatarDp] = React.useState("");
  const [avatarDescription, setAvatarDescription] = React.useState("");
  const [division, setDivision] = React.useState("");
  const [unassaignedAvatar, setUnassignedAvatar] = React.useState([]);
  const [interestGroup, setInterestGroup] = React.useState([]);
  const [attributesGroup, setAttributesGroup] = React.useState([]);
  const [total, setTotal] = React.useState([]);

  const [loading, setLoading] = React.useState(false);

  const ref = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    if (loading) {
      swal({
        icon: "info",
        buttons: [false],
        closeOnClickOutside: false,
        closeOnEsc: false,
        text: "generating image...",
      });
    }
  }, [loading]);

  const onButtonClick = React.useCallback(() => {
    setLoading(true);

    if (ref.current === null) {
      return;
    }

    toPng(ref.current, { cacheBust: true })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "staff-persona.png";
        link.href = dataUrl;
        link.click();
        setLoading(false);
        swal("", "Image downloaded successfully", "success");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        swal(
          "",
          "An error occurred while generating the image. Please try again!",
          "error"
        );
      });
  }, [ref]);

  const history = useHistory();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
  const getNumberofAttributes = () => {
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
                return section == "attributes";
              })
              .flat();
          });
        setAttributesGroup(foundDivisions.flat(1));
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
    getNumberofAttributes();
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
  //calculate number of attributes group
  const calculateAttributes = (param) => {
    const count = attributesGroup.filter(({ answer }) => {
      return answer == param;
    });
    return count.length;
  };

  const getDp = (arr1: any, arr2: any, arr3: any) => {
    let check: boolean;
    for (let i = 0; i < arr2.length; i++) {
      for (let {
        SuperPower,
        Avatar,
        AvatarName,
        Definition,
        Interests,
        Evp,
        Adjective,
      } of arr1) {
        for (let i = 0; i < arr2.length; i++) {
          if (
            SuperPower.includes(arr2[i]) ||
            (Interests && Interests.includes(arr2[i])) ||
            (Evp && Evp.includes(arr2[i])) ||
            (Adjective && Adjective.includes(arr2[i]))
          ) {
            setAvatarDp(JSON.parse(Avatar).serverRelativeUrl); //set dp
            setAvatarName(AvatarName); //set avatar name
            setAvatarDescription(Definition); //set description
            check = true;
            return;
          }
        }
      }
    }

    if (!check) {
      for (let i = 0; i < arr2.length; i++) {
        for (let {
          Avatar,
          AvatarName,
          Definition,
          Interests,
          Evp,
          Adjective,
        } of arr3) {
          if (
            (Interests && Interests.includes(arr2[i])) ||
            (Evp && Evp.includes(arr2[i])) ||
            (Adjective && Adjective.includes(arr2[i]))
          ) {
            setAvatarDp(JSON.parse(Avatar).serverRelativeUrl); //set dp
            setAvatarName(AvatarName); //set avatar name
            setAvatarDescription(Definition); //set description
            return;
          }
        }
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
            <div
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
            </div>
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
            <div
              key={index}
              style={{
                fontSize: "12px",
                fontWeight: 600,
                display: "flex",
                flexDirection: "column",
                color: "rgba(0, 0, 0, 0.53)",
              }}
            >
              <div> {answer}</div>
              <div style={{ width: "100%" }}>
                <progress
                  value={calculateAttributes(answer)}
                  max={total.length}
                  style={{ width: "100%" }}
                ></progress>
              </div>
            </div>
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
      list[0].EXApprovalStatus === "Declined" && setRejected(true);
      setStaffImg(list[0].dp);
    }
  }, [list]);

  React.useEffect(() => {
    sp.web.lists
      .getByTitle("UnassignedAvatars")
      .items.get()
      .then((res) => {
        setUnassignedAvatar(res);
      });
  }, []);

  //Assign avatar to interest group
  React.useEffect(() => {
    const arr2 = list.map(({ responses }) => {
      return JSON.parse(responses).filter(({ section }) => {
        return (
          section === "attributes" ||
          section === "interests" ||
          section === "motivator"
        );
      });
    });

    const newArrOfAnswers = [];

    for (let { section, answer } of arr2.flat()) {
      newArrOfAnswers.push(answer);
    }

    getDp(avatar, newArrOfAnswers, unassaignedAvatar);
  }, [list]);

  return (
    <>
      <Tooltip
        title="Download as Image"
        aria-label="Download as Image"
        placement="top"
      >
        <button
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            borderRadius: "100%",
            height: "70px",
            width: "70px",
            backgroundColor: "#ffc423",
            color: "#fff",
            fontSize: "30px",
            border: "none",
            boxShadow: "0px 0px 10px #000",
            zIndex: "9999",
            cursor: "pointer",
          }}
          onClick={onButtonClick}
        >
          <AiFillFileImage />
        </button>
      </Tooltip>
      <div className={styles.dashboard__container}>
        <div className={styles.dashboard__header}>
          <div className={styles.personalImage}>
            <img src={staffImg} alt="" />
          </div>
          <div className={styles.personaName}>
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
                <div style={{ display: "flex", alignItems: "center" }}>
                  <img
                    src="https://lotusbetaanalytics.com/mtn/Vector-1.svg"
                    alt=""
                  />
                  <img
                    src="https://lotusbetaanalytics.com/mtn/Vector-2.svg"
                    alt=""
                  />
                </div>
              </div>
              <div>
                <h5>Career Goal</h5>
              </div>
              <div>{goals}</div>
            </div>
            <div className={styles.card__right__second}>
              <div className={styles.card__circle}>
                <img
                  src="https://lotusbetaanalytics.com/mtn/Vector.svg"
                  alt=""
                />
              </div>
              <div>
                <h5>Interests</h5>
              </div>
              <div className={styles.itemsDisplay}>{interests}</div>
            </div>
            <div className={styles.card__right__third}>
              <div className={styles.right__heading}>
                <h5>Key Attributes</h5>
              </div>
              <div className={styles.itemsDisplay}>{attributes}</div>
            </div>
          </div>
        </div>
        {/* {rejected ? (
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
      /> */}
      </div>
    </>
  );
};

export default DashboardFromLink;
