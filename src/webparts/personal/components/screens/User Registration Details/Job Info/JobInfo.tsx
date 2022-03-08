import * as React from "react";
import { Header } from "../../../Containers";
import styles from "../userRegistration.module.scss";

type Props = {};

const JobInfo = (props: Props) => {
  return (
    <div className={styles.screen1__container}>
      <Header />
      <form className={styles.job__form}>
        <div>
          <label className={styles.job__label} htmlFor="">
            How many years have you been in the world of work? Both in and
            outside MTN
          </label>
          <select name="" id="">
            <option value="">1</option>
            <option value="">2</option>
          </select>
        </div>
        <div>
          <label className={styles.job__label} htmlFor="">
            Where in our Y'elloverse are you?
          </label>
          <div>
            <input type="radio" name="" id="hq" value="HQ" />
            <div>
              HQ (MTN plaza, MTN Penthouse, Y'ellodrome Annex and Akin Adesola)
            </div>
          </div>

          <div>
            <input type="radio" name="" id="hq" value="LSW" />
            <div>
              LSW (Aromire, Matari, ojota, Opebi/MM2, Allen, Apapa, Switch, VGC,
              Y'ello City, Ibadan), Benin, Abeokuta
            </div>
          </div>
          <div>
            <input type="radio" name="" id="hq" value="eastern region" />
            <label htmlFor="eastern region">Eastern Region</label>
          </div>
          <div>
            <input type="radio" name="" id="hq" value="nothern region" />
            <label htmlFor="nothern region">Nothern Region</label>
          </div>
        </div>
      </form>
    </div>
  );
};

export default JobInfo;
