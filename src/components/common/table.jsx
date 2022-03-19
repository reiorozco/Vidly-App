import React from "react";
import { Paper, TableContainer } from "@mui/material";
import TableMUI from "@mui/material/Table";

import TableHeader from "./tableHeader";
import TableBody from "./tableBody";
import PropTypes from "prop-types";

function Table({ columns, data, onSort, sortColumn }) {
  return (
    <TableContainer sx={{ width: "75%", marginBottom: 2 }} component={Paper}>
      <TableMUI sx={{ minWidth: 450 }} aria-label="simple table">
        <TableHeader
          columns={columns}
          sortColumn={sortColumn}
          onSort={onSort}
        />

        <TableBody data={data} columns={columns} />
      </TableMUI>
    </TableContainer>
  );
}

Table.propTypes = {
  data: PropTypes.array,
  columns: PropTypes.array,
  sortColumn: PropTypes.object,
  onSort: PropTypes.func,
};

export default Table;
