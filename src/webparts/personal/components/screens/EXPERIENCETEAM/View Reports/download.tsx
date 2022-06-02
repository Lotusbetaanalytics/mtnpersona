import * as React from "react";
import { sp } from "@pnp/sp";
import { forwardRef } from "react";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import MaterialTable from "material-table";
import { useHistory } from "react-router-dom";

const DownloadReport = ({ responses: userResponses, setFindingData }) => {
  const [res, setRes] = React.useState([]);
  const [questionsArr, setQuestions] = React.useState([]);
  const getResponse = () => {
    const res = [];
    if (userResponses.length > 0) {
      let { email, responses, division, name } = userResponses[0];
      responses = JSON.parse(responses);
      for (let { question, answer, id, section } of responses) {
        for (let { questions, ID: questionID } of questionsArr) {
          if (question == questions || id == questionID) {
            res.push({
              name,
              email,
              question: questions,
              answer,
              division,
              section,
            });
          }
        }
      }
    }
    return res;
  };

  React.useEffect(() => {
    sp.web.lists
      .getByTitle("Questions")
      .items.get()
      .then((items) => {
        setQuestions(items);
      });
  }, []);

  const history = useHistory();

  const seeReport = () => {
    // window.location.reload();
    setFindingData([]);
  };

  return (
    <div>
      <>
        <button
          style={{
            width: "100px",
            height: "40px",
            padding: "10px",
            borderRadius: "10px",
            border: "none",
            outline: "none",
            backgroundColor: "#000",
            color: "white",
            margin: "10px 30px",
          }}
          onClick={seeReport}
        >
          Go back
        </button>
        <DownloadEmployeeReport responses={getResponse()} />
      </>
    </div>
  );
};

export default DownloadReport;

export const DownloadEmployeeReport = ({ responses }) => {
  const [questionsArr, setQuestions] = React.useState([]);

  const [test, setTest] = React.useState([]);

  React.useEffect(() => {
    sp.web.lists
      .getByTitle("Questions")
      .items.select("questions,ID")
      .get()
      .then((items) => {
        setQuestions(items);
        setTest(
          items.map((item) => {
            let { questions, ID } = item;
            return questions;
          })
        );
      });
  }, []);

  function getFields() {
    return test.map((item) => {
      return { title: item, field: item };
    });
  }

  console.log(getFields());

  const columnss = [
    { title: "Name", field: "name" },
    { title: "Email", field: "email" },
    { title: "Division", field: "division" },
    { title: "Section", field: "section" },
    {
      title: "Question",
      field: "question",
      lookup: test,
    },
    { title: "Answer", field: "answer" },
  ];

  const columns = [
    {
      title: "Employee Name",
      field: "name",
      type: "string" as const,
      searchable: true,
    },
    {
      title: "Email",
      field: "email",
      type: "string" as const,
      searchable: true,
    },

    {
      title: "Division",
      field: "division",
      type: "string" as const,
      searchable: true,
    },
    {
      title: "Section",
      field: "section",
      type: "string" as const,
      searchable: true,
    },
    {
      title: "Question",
      field: "question",
      type: "string" as const,
      searchable: true,
    },
    {
      title: "Answer",
      field: "answer",
      type: "string" as const,
      searchable: true,
      export: true,
    },
  ];

  return (
    <MaterialTable
      icons={{
        Add: forwardRef((props: any, ref: any) => (
          <AddBox {...props} ref={ref} />
        )),
        Check: forwardRef((props: any, ref: any) => (
          <Check {...props} ref={ref} />
        )),
        Clear: forwardRef((props: any, ref: any) => (
          <Clear {...props} ref={ref} />
        )),
        Delete: forwardRef((props: any, ref: any) => (
          <DeleteOutline {...props} ref={ref} />
        )),
        DetailPanel: forwardRef((props: any, ref: any) => (
          <ChevronRight {...props} ref={ref} />
        )),
        Edit: forwardRef((props: any, ref: any) => (
          <Edit {...props} ref={ref} />
        )),
        Export: forwardRef((props: any, ref: any) => (
          <SaveAlt {...props} ref={ref} />
        )),
        Filter: forwardRef((props: any, ref: any) => (
          <FilterList {...props} ref={ref} />
        )),
        FirstPage: forwardRef((props: any, ref: any) => (
          <FirstPage {...props} ref={ref} />
        )),
        LastPage: forwardRef((props: any, ref: any) => (
          <LastPage {...props} ref={ref} />
        )),
        NextPage: forwardRef((props: any, ref: any) => (
          <ChevronRight {...props} ref={ref} />
        )),
        PreviousPage: forwardRef((props: any, ref: any) => (
          <ChevronLeft {...props} ref={ref} />
        )),
        ResetSearch: forwardRef((props: any, ref: any) => (
          <Clear {...props} ref={ref} />
        )),
        Search: forwardRef((props: any, ref: any) => (
          <Search {...props} ref={ref} />
        )),
        SortArrow: forwardRef((props: any, ref: any) => (
          <ArrowDownward {...props} ref={ref} />
        )),
        ThirdStateCheck: forwardRef((props: any, ref: any) => (
          <Remove {...props} ref={ref} />
        )),
        ViewColumn: forwardRef((props: any, ref: any) => (
          <ViewColumn {...props} ref={ref} />
        )),
      }}
      title=""
      columns={columns}
      data={responses}
      options={{
        exportButton: true,
        actionsCellStyle: {
          color: "#FF00dd",
        },
        actionsColumnIndex: -1,
        pageSize: 2,
        pageSizeOptions: [2, 4, 5, 10, 20],
        exportAllData: true,
        exportFileName: "Question-Answer Report",

        headerStyle: {
          backgroundColor: "rgba(196, 196, 196, 0.32)",
          color: "black",
        },
      }}
      style={{
        boxShadow: "none",
        width: "80%",
        boxSizing: "border-box",
        paddingLeft: "30px",
      }}
    />
  );
};
