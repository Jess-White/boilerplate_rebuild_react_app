import React from "react";
import countSectionWords from "../Helpers/countSectionWords";
import "./SectionsShow.css";

export default function SectionsShow(props) {
  const { section } = props;

  return (
    <>
      <div className="Section__Header">
        <h1 className="Section__Title">{section.title}</h1>
        <p>Word count: {countSectionWords(section)}</p>
      </div>
      <div dangerouslySetInnerHTML={{ __html: section.text }}></div>
    </>
  );
}
