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
import ViewRoles, {
  EditRoles,
} from "./screens/EXPERIENCETEAM/Configure Roles/ViewRoles";
import HrbpDashboard from "./screens/HRBP/HRBP Dashboard/HRBPDashboard";
import HrbpViewReport from "./screens/HRBP/HRBP View Reports/HRBPViewReport";
import StaffView from "./screens/EXPERIENCETEAM/View Reports/StaffView";
import RejectedStaff from "./screens/EXPERIENCETEAM/View Reports/RejectedStaff";
import StaffPersona from "./screens/Persona Dashboard/StaffPersona";
import PageNotFound from "./screens/PageNotFound";
import { ToastProvider } from "react-toast-notifications";
import AnalyticsReport from "./screens/EXPERIENCETEAM/View Reports/Analytics";
import DivisionAnalyticsReport from "./screens/EXPERIENCETEAM/View Reports/DivisionsAnalytics";
import QuestionCategories from "./screens/EXPERIENCETEAM/View Reports/Categories";
import Regions from "./screens/EXPERIENCETEAM/View Reports/Regions";
import DownloadReport from "./screens/EXPERIENCETEAM/View Reports/download";
import ConfigureDate from "./screens/EXPERIENCETEAM/Configure Date/ConfigureDate";
import ViewDates from "./screens/EXPERIENCETEAM/Configure Date/ViewDates";
import EditPageSix from "./screens/Persona Dashboard/Edit Persona/EditPageSix";
import EditPageFive from "./screens/Persona Dashboard/Edit Persona/EditPageFive";
import EditPageFour from "./screens/Persona Dashboard/Edit Persona/EditPageFour";
import EditPageThree from "./screens/Persona Dashboard/Edit Persona/EditPageThree";
import EditPageTwo from "./screens/Persona Dashboard/Edit Persona/EditPageTwo/EditPageTwo";
import EditJobInfo from "./screens/Persona Dashboard/Edit Persona/EditJobInfo/EditJobInfo";
import EditScreen1 from "./screens/Persona Dashboard/Edit Persona";
import EditDate from "./screens/EXPERIENCETEAM/Configure Date/EditDate";

export default class Personal extends React.Component<
  IPersonalProps,
  {
    allSurvey: any[];
    isAuth: boolean;
    checkStatus: boolean;
    notFound: boolean;
    name: string;
    email: string;
    lineManager: string;
    surveyId: string;
    rejectedSurvey: any[];
    allQuestions: any[];
    numberOfStaff: number;
    confirmedStaff: any[];
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
      lineManager: "",
      surveyId: "",
      rejectedSurvey: [],
      allQuestions: [],
      numberOfStaff: 0,
      confirmedStaff: [],
    };
  }

  componentDidMount(): void {
    try {
      this.props.context.spHttpClient
        .get(
          `https://lotusbetaanalytics.sharepoint.com/sites/business_solutions/_api/lists/GetByTitle('CURRENT HCM STAFF LIST-test')/items?$filter=field_20 eq 'Permanent Employee'&$count=true`,
          SPHttpClient.configurations.v1
        )
        .then((response: SPHttpClientResponse) => {
          response.json().then((responseJSON: any) => {
            this.setState({
              numberOfStaff: responseJSON.value.length,
              confirmedStaff: responseJSON.value,
            });
          });
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }

    try {
      sp.profiles.myProperties.get().then(({ Email }) => {
        // Email = Email.toLowerCase();
        this.props.context.spHttpClient
          .get(
            `https://lotusbetaanalytics.sharepoint.com/sites/business_solutions/_api/lists/GetByTitle('CURRENT HCM STAFF LIST-test')/items?$filter=field_8 eq '${Email}'`,
            SPHttpClient.configurations.v1
          )
          .then((response: SPHttpClientResponse) => {
            response.json().then((responseJSON: any) => {
              this.setState({ lineManager: responseJSON.value[0].field_18 });

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
                    field_20 === "Permanent Employee" ||
                    field_20 === "Permanent"
                  ); //find all permanent employees
                }
              );

              if (findPermanentStaff.length < 1) {
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
              //search the array to find a matching record
              for (let { field_8 } of findPermanentStaff) {
                if (field_8 != Email) {
                  swal({
                    title: "You are not authorized to access this application.",
                    text: "Please contact your Manager",
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
            this.setState({ notFound: true });
            return;
          });
      });
    } catch (error) {
      console.log(error);
      swal("Error", "An error occured. Try again", "error");
    }

    sp.web.lists
      .getByTitle("personal")
      .items.get()
      .then((items: any) => {
        this.setState({
          allSurvey: items,
        });
      });
    sp.web.lists
      .getByTitle("RejectedSurveys")
      .items.get()
      .then((items: any) => {
        this.setState({
          rejectedSurvey: items,
        });
      });
    sp.web.lists
      .getByTitle("Questions")
      .items.get()
      .then((items: any) => {
        this.setState({
          allQuestions: items,
        });
      });
  }

  public render(): React.ReactElement<IPersonalProps> {
    jQuery("#workbenchPageContent").prop("style", "max-width: none");
    jQuery(".SPCanvas-canvas").prop("style", "max-width: none");
    jQuery(".CanvasZone").prop("style", "max-width: none");

    return (
      <ToastProvider>
        <Context.Provider
          value={{
            spHttpClient: this.props.context.spHttpClient,
            allSurvey: this.state.allSurvey,
            lineManager: this.state.lineManager,
            surveyId: this.state.surveyId,
            setState: this.setState,
            rejectedSurvey: this.state.rejectedSurvey,
            allQuestions: this.state.allQuestions,
            numberOfStaff: this.state.numberOfStaff,
            confirmedStaff: this.state.confirmedStaff,
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
                {/* <Route exact path="/hr/page7" component={HrPageSeven} /> */}
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
                <Route
                  exact
                  path="/hrbp/staff/:name/:email"
                  component={StaffPersona}
                />

                {/* Edit Persona Links */}
                <Route
                  exact
                  path="/dashboard/edit/page6"
                  component={EditPageSix}
                />
                <Route
                  exact
                  path="/dashboard/edit/page5"
                  component={EditPageFive}
                />
                <Route
                  exact
                  path="/dashboard/edit/page4"
                  component={EditPageFour}
                />
                <Route
                  exact
                  path="/dashboard/edit/page3"
                  component={EditPageThree}
                />
                <Route
                  exact
                  path="/dashboard/edit/page2"
                  component={EditPageTwo}
                />
                <Route
                  exact
                  path="/dashboard/edit/page1"
                  component={EditJobInfo}
                />
                <Route
                  exact
                  path="/dashboard/edit/start"
                  component={EditScreen1}
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
                  path="/experienceteam/configure/edit/:id"
                  component={EditRoles}
                />
                <Route
                  exact
                  path="/experienceteam/viewroles"
                  component={ViewRoles}
                />
                <Route
                  exact
                  path="/experienceteam/analytics"
                  component={AnalyticsReport}
                />
                <Route
                  exact
                  path="/experienceteam/division/analytics"
                  component={DivisionAnalyticsReport}
                />
                <Route
                  exact
                  path="/experienceteam/regions/analytics"
                  component={Regions}
                />
                <Route
                  exact
                  path="/experienceteam/division/categories"
                  component={QuestionCategories}
                />
                <Route
                  exact
                  path="/experienceteam/report"
                  component={ViewReport}
                />
                <Route
                  exact
                  path="/experienceteam/date"
                  component={ConfigureDate}
                />
                <Route
                  exact
                  path="/experienceteam/date/edit/:id"
                  component={EditDate}
                />
                <Route
                  exact
                  path="/experienceteam/date/view"
                  component={ViewDates}
                />
                <Route
                  exact
                  path="/experienceteam/report/:id"
                  component={StaffView}
                />
                {/* <Route
                  exact
                  path="/experienceteam/rejected/:id"
                  component={RejectedStaff}
                />
                <Route
                  exact
                  path="/experienceteam/rejected"
                  component={RejectedSurvey}
                /> */}

                {/* HRBP Team Links */}
                <Route exact path="/hrbp/dashboard" component={HrbpDashboard} />
                <Route exact path="/hrbp/report" component={HrbpViewReport} />

                <Route path="*" component={PageNotFound} />
              </Switch>
            </HashRouter>
          ) : (
            <div>
              {this.state.notFound ? (
                <h1>
                  Sorry! You are not authorized to access this application.
                  Please contact your administrator.
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
      </ToastProvider>
    );
  }
}

export const Context = React.createContext({
  spHttpClient: null,
  allSurvey: null,
  lineManager: "",
  surveyId: null,
  setState: null,
  rejectedSurvey: null,
  allQuestions: null,
  numberOfStaff: null,
  confirmedStaff: null,
});
