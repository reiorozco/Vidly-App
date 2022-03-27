import React, { Component } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Button, Link } from "@mui/material";
import PropTypes from "prop-types";

import Like from "./common/like";
import Table from "./common/table";
import auth from "../services/authService";

class MoviesTable extends Component {
  columns = [
    {
      path: "title",
      label: "Title",
      content: (movie) => (
        <Link
          underline={"hover"}
          component={RouterLink}
          to={`/movies/${movie._id}`}
        >
          {movie.title}
        </Link>
      ),
    },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "like",
      content: (movie) => (
        <Like liked={movie.liked} onClick={() => this.props.onLike(movie)} />
      ),
    },
  ];

  deleteColumn = {
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
  };

  constructor(props) {
    super(props);
    const user = auth.getCurrentUser();
    if (user && user.isAdmin) this.columns.push(this.deleteColumn);
  }

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
