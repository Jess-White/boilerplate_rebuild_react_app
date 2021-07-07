import React, { useMemo } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { useTable } from "react-table";
import "./Table.css";

export default function Table(props) {
  const columns = useMemo(() => props.columns, [props.columns]);
  const data = useMemo(() => props.data, [props.data]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  const renderHeaderGroup = (headerGroup) => {
    return (
      <tr {...headerGroup.getHeaderGroupProps()}>
        {headerGroup.headers.map(renderHeader)}
      </tr>
    );
  };

  const renderHeader = (column) => {
    const isNumber = typeof column.accessor(data[0]) === "number";

    return (
      <th
        {...column.getHeaderProps()}
        className={clsx("table__header", isNumber && "table__header--number")}
      >
        {column.render("Header")}
      </th>
    );
  };

  const renderRow = (row) => {
    prepareRow(row);

    return <tr {...row.getRowProps()}>{row.cells.map(renderCell)}</tr>;
  };

  const renderCell = (cell) => {
    const isNumber = typeof cell.value === "number";

    return (
      <td
        {...cell.getCellProps()}
        className={clsx("table__cell", isNumber && "table__cell--number")}
      >
        {cell.render("Cell")}
      </td>
    );
  };

  return (
    <table {...getTableProps()} className={clsx(props.className, "table")}>
      <thead>{headerGroups.map(renderHeaderGroup)}</thead>
      <tbody {...getTableBodyProps()}>{rows.map(renderRow)}</tbody>
    </table>
  );
}

Table.propTypes = {
  className: PropTypes.string,
};

Table.defaultProps = {};
