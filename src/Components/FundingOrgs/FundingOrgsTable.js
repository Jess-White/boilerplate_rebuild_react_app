import React, { useMemo, useState } from "react";
import { useTable } from "react-table";
import "./FundingOrgsTable.css";
import formatDate from "../../Helpers/formatDate";

//fontawesome
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCurrentOrganizationContext } from "../../Contexts/currentOrganizationContext";

library.add(faTrashAlt);
library.add(faEdit);

export default function FundingOrgsTable(props) {
  const [showFundingOrgEdit, setShowFundingOrgEdit] = useState(false);
  const handleClose = () => {
    setShowFundingOrgEdit(false);
  };

  const columns = useMemo(
    () => [
      { Header: "Name", accessor: "name" },
      { Header: "Website", accessor: "website" },
      {
        Header: "Date Created",
        accessor: (row) => formatDate(row.created_at),
      },
      {
        Header: "Last Modified",
        accessor: (row) => formatDate(row.updated_at),
      },
    ],
    []
  );

  const funding_orgs = useMemo(() => props.funding_orgs, [props.funding_orgs]);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: funding_orgs });

  const header = headerGroups.map((headerGroup) => (
    <tr {...headerGroup.getHeaderGroupProps()}>
      {headerGroup.headers.map((column) => (
        <th {...column.getHeaderProps()}>{column.render("Header")}</th>
      ))}
    </tr>
  ));

  const body = rows.map((row) => {
    prepareRow(row);

    return (
      <tr {...row.getRowProps()}>
        {row.cells.map((cell) => {
          return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
        })}
        <td>
          <FontAwesomeIcon
            icon={faEdit}
            style={{
              color: "black",
              fontSize: "1.5rem",
            }}
            onClick={() => props.onShowEditFundingOrg(row.original)}
          />
          <FontAwesomeIcon
            icon={faTrashAlt}
            style={{
              color: "black",
              fontSize: "1.5rem",
            }}
            onClick={() => props.onDeleteFundingOrg(row.original)}
          />
        </td>
      </tr>
    );
  });

  return (
    <table {...getTableProps()} className="FundingOrgsTable">
      <thead>{header}</thead>
      <tbody {...getTableBodyProps()}>{body}</tbody>
    </table>
  );
}
