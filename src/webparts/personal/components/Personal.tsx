import * as React from "react";
import "./styles.scss";
import { IPersonalProps } from "./IPersonalProps";
import { escape } from "@microsoft/sp-lodash-subset";
import { sp } from "@pnp/sp";
import * as jQuery from "jquery";
import { HashRouter, Switch, Route } from "react-router-dom";
import { Landing, Screen1 } from "./screens";
import JobInfo from "./screens/User Registration Details/Job Info/JobInfo";
import PageTwo from "./screens/User Registration Details/PageTwo/PageTwo";
import PageThree from "./screens/User Registration Details/PageThree";
import PageFour from "./screens/User Registration Details/PageFour";
import PageFive from "./screens/User Registration Details/PageFive";
import PageSix from "./screens/User Registration Details/PageSix";
import HrPageOne from "./screens/HR/HrPageOne";
import HrPageTwo from "./screens/HR/HrPageTwo";
import HrPageThree from "./screens/HR/HrPageThree";
import HrPageFour from "./screens/HR/HrPageFour";
import HrPageFive from "./screens/HR/HrPageFive";
import HrPageSeven from "./screens/HR/HrPageSeven";
import HrPageSix from "./screens/HR/HrPageSix";
import Dashboard from "./screens/Persona Dashboard/Dashboard";
import DashboardFromLink from "./screens/Persona Dashboard/DashboardFromLink";
import ExperienceTeamDashboard from "./screens/EXPERIENCETEAM/Experience Team Dashboard/ExperienceTeamDashboard";
import ConfigureRoles from "./screens/EXPERIENCETEAM/Configure Roles/ConfigureRoles";
import ViewReport from "./screens/EXPERIENCETEAM/View Reports/ViewReport";
import RejectedSurvey from "./screens/EXPERIENCETEAM/View Reports/RejectedSurveys";
import ViewRoles from "./screens/EXPERIENCETEAM/Configure Roles/ViewRoles";
import HrbpDashboard from "./screens/HRBP/HRBP Dashboard/HRBPDashboard";
import HrbpViewReport from "./screens/HRBP/HRBP View Reports/HRBPViewReport";

export default class Personal extends React.Component<
  IPersonalProps,
  {
    allSurvey: any[];
  }
> {
  constructor(props: IPersonalProps) {
    super(props);
    this.state = {
      allSurvey: [],
    };
  }

  componentDidMount(): void {
    sp.web.lists
      .getByTitle("personal")
      .items.get()
      .then((items: any) => {
        this.setState({
          allSurvey: items,
        });
        console.log(items);
      });
  }

  public render(): React.ReactElement<IPersonalProps> {
    jQuery("#workbenchPageContent").prop("style", "max-width: none");
    jQuery(".SPCanvas-canvas").prop("style", "max-width: none");
    jQuery(".CanvasZone").prop("style", "max-width: none");

    return (
      <Context.Provider
        value={{
          spHttpClient: this.props.context.spHttpClient,
          allSurvey: this.state.allSurvey,
        }}
      >
        <HashRouter>
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/hr/page1" component={HrPageOne} />
            <Route exact path="/hr/page2" component={HrPageTwo} />
            <Route exact path="/hr/page3" component={HrPageThree} />
            <Route exact path="/hr/page4" component={HrPageFour} />
            <Route exact path="/hr/page5" component={HrPageFive} />
            <Route exact path="/hr/page6" component={HrPageSix} />
            <Route exact path="/hr/page7" component={HrPageSeven} />
            <Route exact path="/info/personal" component={Screen1} />
            <Route exact path="/info/page1" component={JobInfo} />
            <Route exact path="/info/page2" component={PageTwo} />
            <Route exact path="/info/page3" component={PageThree} />
            <Route exact path="/info/page4" component={PageFour} />
            <Route exact path="/info/page5" component={PageFive} />
            <Route exact path="/info/page6" component={PageSix} />
            <Route exact path="/info/dashboard" component={Dashboard} />
            <Route
              exact
              path="/info/dashboard/:name/:email"
              component={DashboardFromLink}
            />

            {/* Experience Team Links */}
            <Route
              exact
              path="/experienceteam/dashboard"
              component={ExperienceTeamDashboard}
            />
            <Route
              exact
              path="/experienceteam/configure"
              component={ConfigureRoles}
            />
            <Route
              exact
              path="/experienceteam/viewroles"
              component={ViewRoles}
            />
            <Route exact path="/experienceteam/report" component={ViewReport} />
            <Route
              exact
              path="/experienceteam/rejected"
              component={RejectedSurvey}
            />

            {/* HRBP Team Links */}
            <Route exact path="/hrbp/dashboard" component={HrbpDashboard} />
            <Route exact path="/hrbp/report" component={HrbpViewReport} />
          </Switch>
        </HashRouter>
      </Context.Provider>
    );
  }
}

export const Context = React.createContext({
  spHttpClient: null,
  allSurvey: null,
});
