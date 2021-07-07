import React from "react";
import Component from "./Table";

export default {
  title: "Design/Table",
  component: Component,
  argTypes: {},
};

export const Table = (props) => (
  <Component
    {...props}
    columns={[
      { Header: "Status", accessor: "status" },
      { Header: "Number", accessor: "number" },
      { Header: "Title", accessor: "title" },
    ]}
    data={[
      {
        status: "Draft",
        title: "Good Place Neighborhood Grant",
        number: 3331.296,
      },
      {
        status: "Submitted",
        title: "Bad Place Neighborhood Grant",
        number: 1012.997,
      },
      {
        status: "Archived",
        title: "Medium Place Neighborhood Grant",
        number: 3079.296,
      },
    ]}
  />
);
