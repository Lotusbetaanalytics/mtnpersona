import * as React from "react";
import "./styles.scss";
import { IPersonalProps } from "./IPersonalProps";
import { escape } from "@microsoft/sp-lodash-subset";
import { sp } from "@pnp/sp";
import {
  SPHttpClient,
  SPHttpClientConfiguration,
  SPHttpClientResponse,
} from "@microsoft/sp-http";
import swal from "sweetalert";
import { Spinner } from "office-ui-fabric-react";
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
import StaffView from "./screens/EXPERIENCETEAM/View Reports/StaffView";
import RejectedStaff from "./screens/EXPERIENCETEAM/View Reports/RejectedStaff";

export default class Personal extends React.Component<
  IPersonalProps,
  {
    allSurvey: any[];
    isAuth: boolean;
    checkStatus: boolean;
    notFound: boolean;
    name: string;
    email: string;
  }
> {
  constructor(props: IPersonalProps) {
    super(props);
    this.state = {
      allSurvey: [],
      isAuth: false,
      checkStatus: false,
      notFound: false,
      name: "",
      email: "",
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
      });

    this.props.context.spHttpClient
      .get(
        `https://lotusbetaanalytics.sharepoint.com/sites/business_solutions/_api/lists/GetByTitle('CURRENT HCM STAFF LIST-test')/items?$filter=field_8 eq '${this.state.email}'`,
        SPHttpClient.configurations.v1
      )
      .then((response: SPHttpClientResponse) => {
        response.json().then((responseJSON: any) => {
          if (responseJSON.value.length === 0) {
            swal({
              title: "You are not authorized to access this application.",
              text: "Please contact your manager",
              icon: "error",
              closeOnClickOutside: false,
              closeOnEsc: false,
              buttons: [false],
            });
            this.setState({ notFound: true });
            return;
          }

          const findPermanentStaff = responseJSON.value.filter(
            ({ field_20 }) => {
              return (
                field_20 === "Permanent Employee" || field_20 === "Permanent"
              ); //find all permanent employees
            }
          );
          //search the array to find a matching record
          for (let { field_4, field_8 } of findPermanentStaff) {
            if (field_4 != this.state.name && field_8 != this.state.email) {
              swal({
                title: "You are not authorized to access this application.",
                text: "Please contact your manager",
                icon: "error",
                closeOnClickOutside: false,
                closeOnEsc: false,
                buttons: [false],
              });
              this.setState({ notFound: true });
              return;
            } else {
              this.setState({ checkStatus: true });
              return;
            }
          }
        });
      })
      .catch((error) => {
        console.log(error);
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
        {this.state.checkStatus ? (
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
              <Route
                exact
                path="/experienceteam/report"
                component={ViewReport}
              />
              <Route
                exact
                path="/experienceteam/report/:id"
                component={StaffView}
              />
              <Route
                exact
                path="/experienceteam/rejected/:id"
                component={RejectedStaff}
              />
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
        ) : (
          <div>
            {this.state.notFound ? (
              <h1>
                Sorry! You are not authorized to access this application. Please
                contact your administrator.
              </h1>
            ) : (
              <h1>
                <Spinner />
                Checking if you have the right permissions...
              </h1>
            )}
          </div>
        )}
      </Context.Provider>
    );
  }
}

export const Context = React.createContext({
  spHttpClient: null,
  allSurvey: null,
});
