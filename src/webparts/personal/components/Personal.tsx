import * as React from "react";
import "./styles.scss";
import { IPersonalProps } from "./IPersonalProps";
import { escape } from "@microsoft/sp-lodash-subset";
import * as jQuery from "jquery";
import { HashRouter, Switch, Route } from "react-router-dom";
import { Landing, Screen1 } from "./screens";
import JobInfo from "./screens/User Registration Details/Job Info/JobInfo";
import PageTwo from "./screens/User Registration Details/PageTwo/PageTwo";
import PageThree from "./screens/User Registration Details/PageThree";
import PageFour from "./screens/User Registration Details/PageFour";
import PageFive from "./screens/User Registration Details/PageFive";
import PageSix from "./screens/User Registration Details/PageSix";

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
            <Route exact path="/info/page2" component={PageTwo} />
            <Route exact path="/info/page3" component={PageThree} />
            <Route exact path="/info/page4" component={PageFour} />
            <Route exact path="/info/page5" component={PageFive} />
            <Route exact path="/info/page6" component={PageSix} />
          </Switch>
        </HashRouter>
      </>
    );
  }
}
