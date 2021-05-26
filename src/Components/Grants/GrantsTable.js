import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { useTable } from "react-table";
import useBuildOrganizationsLink from "../../Hooks/useBuildOrganizationsLink";
import formatDateColumn from "../../Helpers/formatDateColumn";
import formatGrantStatus from "../../Helpers/formatGrantStatus";
import "./GrantsTable.css";

export default function GrantsTable(props) {
  const columns = useMemo(
    () => [
      {
        Header: "Status",
        accessor: (row) => formatGrantStatus(row),
      },
      {
        Header: "Deadline",
        accessor: (row) => formatDateColumn(row.deadline),
      },
      { Header: "Title", accessor: "title" },
      { Header: "Funding Org", accessor: "funding_org_name" },
      { Header: "Purpose", accessor: "purpose" },
      {
        Header: "Date Created",
        accessor: (row) => formatDateColumn(row.created_at),
      },
      {
        Header: "Last Modified",
        accessor: (row) => formatDateColumn(row.updated_at),
      },
    ],
    []
  );
  const grants = useMemo(() => props.grants, [props.grants]);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: grants });
  const buildOrganizationsLink = useBuildOrganizationsLink();

  const header = headerGroups.map((headerGroup) => (
    <tr {...headerGroup.getHeaderGroupProps()}>
      {headerGroup.headers.map((column) => (
        <th {...column.getHeaderProps()}>{column.render("Header")}</th>
      ))}
    </tr>
  ));
  const body = rows.map((row) => {
    prepareRow(row);

    const { id, markedOnPurpose, markedOnTitle, markedOnFundingOrg } =
      row.original;
    const grantLink = buildOrganizationsLink(`/grants/${id}`);

    return (
      <tr {...row.getRowProps()}>
        {row.cells.map((cell) => {
          const renderedCell = (() => {
            if (cell.column.Header === "Title") {
              return <Link to={grantLink}>{cell.render("Cell")}</Link>;
            } else if (
              (cell.column.Header === "Category" && markedOnPurpose) ||
              (cell.column.Header === "Word Count" && markedOnTitle)
            ) {
              return <mark>{cell.render("Cell")}</mark>;
            }
            return cell.render("Cell");
          })();

          return <td {...cell.getCellProps()}>{renderedCell}</td>;
        })}
      </tr>
    );
  });

  return (
    <table {...getTableProps()} className="GrantsTable">
      <thead>{header}</thead>
      <tbody {...getTableBodyProps()}>{body}</tbody>
    </table>
  );
}
