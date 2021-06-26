import React from "react";
import "../stylesheets/workLine.css";

const WorkLine = ({ jobTitle, companyName, duration }: any) => {
  return (
    <div className="work-line">
      <div className="company-name">{companyName}</div>
      <div className="work-details">
        <div>{jobTitle}</div>
        <div>{duration}</div>
      </div>
    </div>
  );
};

export default WorkLine;
