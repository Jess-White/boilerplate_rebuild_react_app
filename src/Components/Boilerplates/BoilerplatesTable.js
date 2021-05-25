import { format as formatDate, parseISO } from "date-fns";
import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { useTable } from "react-table";
import useBuildOrganizationsLink from "../../Hooks/useBuildOrganizationsLink";
import './BoilerplatesTable.css'

const renderDateColumn = (dateString) => formatDate(parseISO(dateString), 'PP');

export default function BoilerplatesTable(props) {
  const columns = useMemo(
    () => [
      { Header: "Title", accessor: "title" },
      { Header: "Category", accessor: "category_name" },
      { Header: "Word Count", accessor: "wordcount" },
      { Header: "Date Created", accessor: (row) => renderDateColumn(row.created_at) },
      { Header: "Last Modified", accessor: (row) => renderDateColumn(row.updated_at) },
    ],
    [],
  );
  const boilerplates = useMemo(() => props.boilerplates, [props.boilerplates]);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable({ columns, data: boilerplates });
  const buildOrganizationsLink = useBuildOrganizationsLink();

  const header = headerGroups.map((headerGroup) => (
    <tr {...headerGroup.getHeaderGroupProps()}>
      {headerGroup.headers.map((column) => (
        <th {...column.getHeaderProps()}>
          {column.render("Header")}
        </th>
      ))}
    </tr>
  ));
  const body = rows.map((row) => {
    prepareRow(row);

    const { id, markedOnCategory, markedOnMaxWordCount } = row.original;
    const boilerplateLink = buildOrganizationsLink(`/boilerplates/${id}`);

    return (
      <tr {...row.getRowProps()}>
        {row.cells.map((cell) => {
          const renderedCell = (() => {
            if (cell.column.Header === 'Title') {
              return <Link to={boilerplateLink}>{cell.render("Cell")}</Link>;
            } else if (
              (cell.column.Header === 'Category' && markedOnCategory) ||
              (cell.column.Header === 'Word Count' && markedOnMaxWordCount)
            ) {
              return <mark>{cell.render("Cell")}</mark>;
            }
            return cell.render("Cell");
          })();

          return (
            <td {...cell.getCellProps()}>
              {renderedCell}
            </td>
          );
        })}
      </tr>
    );
  });

  return (
    <table {...getTableProps()} className="BoilerplatesTable">
      <thead>{header}</thead>
      <tbody {...getTableBodyProps()}>{body}</tbody>
    </table>
  );
}
