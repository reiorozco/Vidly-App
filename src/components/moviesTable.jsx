import React, { Component } from "react";
import { Button } from "@mui/material";
import PropTypes from "prop-types";

import Like from "./common/like";
import Table from "./common/table";

class MoviesTable extends Component {
  columns = [
    { path: "title", label: "Title" },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "like",
      content: (movie) => (
        <Like liked={movie.liked} onClick={() => this.props.onLike(movie)} />
      ),
    },
    {
      key: "delete",
      content: (movie) => (
        <Button
          variant="outlined"
          color={"error"}
          onClick={() => this.props.onDelete(movie)}
        >
          Delete
        </Button>
      ),
    },
  ];

  render() {
    let { movies, onSort, sortColumn } = this.props;

    return (
      <Table
        columns={this.columns}
        data={movies}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

MoviesTable.propTypes = {
  movies: PropTypes.array,
  sortColumn: PropTypes.object,
  onDelete: PropTypes.func,
  onLike: PropTypes.func,
  onSort: PropTypes.func,
};

export default MoviesTable;
