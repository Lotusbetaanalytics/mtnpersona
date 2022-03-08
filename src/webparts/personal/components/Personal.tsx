import * as React from "react";
import "./styles.scss";
import { IPersonalProps } from "./IPersonalProps";
import { escape } from "@microsoft/sp-lodash-subset";
import * as jQuery from "jquery";
import { HashRouter, Switch, Route } from "react-router-dom";
import { Landing, Screen1 } from "./screens";
import JobInfo from "./screens/User Registration Details/Job Info/JobInfo";

export default class Personal extends React.Component<IPersonalProps, {}> {
  public render(): React.ReactElement<IPersonalProps> {
    jQuery("#workbenchPageContent").prop("style", "max-width: none");
    jQuery(".SPCanvas-canvas").prop("style", "max-width: none");
    jQuery(".CanvasZone").prop("style", "max-width: none");
    return (
      <>
        <HashRouter>
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/info/personal" component={Screen1} />
            <Route exact path="/info/job" component={JobInfo} />
          </Switch>
        </HashRouter>
      </>
    );
  }
}
