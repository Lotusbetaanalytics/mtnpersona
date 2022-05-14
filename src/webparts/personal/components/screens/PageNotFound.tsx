import * as React from "react";

const PageNotFound = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <h1>Page Not Found!</h1>
      <div>
        Check the url and try again or &nbsp;&nbsp;
        <a href="https://lotusbetaanalytics.sharepoint.com/sites/Persona#/">
          Go Home
        </a>
      </div>
    </div>
  );
};

export default PageNotFound;
