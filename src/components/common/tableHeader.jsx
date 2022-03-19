import React, { Component } from "react";
import { TableCell, TableHead, TableRow, TableSortLabel } from "@mui/material";
import PropTypes from "prop-types";
// import { ArrowDropUp, ArrowDropDown } from "@mui/icons-material";

class TableHeader extends Component {
  raiseSort = (path) => {
    const sortColumn = { ...this.props.sortColumn };
    if (sortColumn.path === path)
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }

    this.props.onSort(sortColumn);
  };

  sortLabelActive = (column) => {
    const { sortColumn } = this.props;

    return !column.path ? false : column.path === sortColumn.path;
  };

  // renderSortIcon = (column) => {
  //   const { sortColumn } = this.props;
  //
  //   if (column.path !== sortColumn.path) return null;
  //   if (sortColumn.order === "asc") return <ArrowDropUp />;
  //   return <ArrowDropDown />;
  // };

  render() {
    const { columns, sortColumn } = this.props;

    const sortLabelDirection = sortColumn.order === "asc" ? "asc" : "desc";

    return (
      <TableHead>
        <TableRow>
          {columns.map((column) => (
            <TableCell
              key={column.path || column.key}
              align="center"
              onClick={() => this.raiseSort(column.path)}
            >
              {/*{column.label} {this.renderSortIcon(column)}*/}
              <TableSortLabel
                direction={sortLabelDirection}
                active={this.sortLabelActive(column)}
              >
                {column.label}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }
}

TableHeader.propTypes = {
  columns: PropTypes.array,
  sortColumn: PropTypes.object,
  onSort: PropTypes.func,
};

export default TableHeader;
