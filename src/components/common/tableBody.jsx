import React, { Component } from "react";
import { TableCell, TableRow } from "@mui/material";
import TableBodyMUI from "@mui/material/TableBody";
import PropTypes from "prop-types";
import _ from "lodash";

class TableBody extends Component {
  renderCell = (item, column) => {
    if (column.content) return column.content(item);

    return _.get(item, column.path);
  };

  createKey = (item, column) => {
    return item._id + (column.path || column.key);
  };

  render() {
    const { data, columns } = this.props;

    return (
      <TableBodyMUI>
        {data.map((item) => (
          <TableRow
            key={item._id}
            sx={{
              "&:last-child td, &:last-child th": { border: 0 },
            }}
          >
            {columns.map((column) => (
              <TableCell key={this.createKey(item, column)} align="center">
                {this.renderCell(item, column)}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBodyMUI>
    );
  }
}

TableBody.propTypes = {
  data: PropTypes.array,
  columns: PropTypes.array,
};

export default TableBody;
