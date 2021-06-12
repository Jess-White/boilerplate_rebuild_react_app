import React, { useMemo, useState } from "react";
import { useTable } from "react-table";
import "./CategoriesTable.css";
import formatDate from "../../Helpers/formatDate";

//fontawesome
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCurrentOrganizationContext } from "../../Contexts/currentOrganizationContext";

library.add(faTrashAlt);
library.add(faEdit);

export default function CategoriesTable(props) {
  const [showCategoryEdit, setShowCategoryEdit] = useState(false);
  const handleClose = () => {
    setShowCategoryEdit(false);
  };

  const columns = useMemo(
    () => [
      { Header: "Name", accessor: "name" },
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

  const categories = useMemo(() => props.categories, [props.categories]);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: categories });

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
          const renderedCell = (() => {
            return cell.render("Cell");
          })();

          return <td {...cell.getCellProps()}>{renderedCell}</td>;
        })}
        <td>
          <FontAwesomeIcon
            icon={faEdit}
            style={{
              color: "black",
              fontSize: "1.5rem",
            }}
            onClick={() => props.onShowEditCategory(row.original)}
          />
          <FontAwesomeIcon
            icon={faTrashAlt}
            style={{
              color: "black",
              fontSize: "1.5rem",
            }}
            onClick={() => props.onDeleteCategory(row.original)}
          />
        </td>
      </tr>
    );
  });

  return (
    <table {...getTableProps()} className="CategoriesTable">
      <thead>{header}</thead>
      <tbody {...getTableBodyProps()}>{body}</tbody>
    </table>
  );
}
