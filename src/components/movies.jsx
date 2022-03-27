import React, { Component } from "react";

import { Box, Button, Grid, Link, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { toast } from "react-toastify";
import _ from "lodash";

import { getMovies, deleteMovies } from "../services/movieService";
import { paginate } from "../utils/paginate";
import { getGenres } from "../services/genreService";
import Pagination from "./common/pagination";
import ListGroup from "./common/listGroup";
import MoviesTable from "./moviesTable";
import SearchBox from "./searchBox";
import PropTypes from "prop-types";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    searchQuery: "",
    selectedGenre: null,
    sortColumn: { path: "title", order: "asc" },
  };

  async componentDidMount() {
    const { data } = await getGenres();
    const genres = [{ _id: "", name: "All Genres" }, ...data];

    const { data: movies } = await getMovies();
    this.setState({ movies, genres });
  }

  handleDelete = async (movie) => {
    const originalMovies = this.state.movies;
    const movies = originalMovies.filter((m) => m._id !== movie._id);
    this.setState({
      movies,
    });

    try {
      await deleteMovies(movie._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("This movie has already been deleted.");

      this.setState({
        movies: originalMovies,
      });
    }
  };

  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;

    this.setState({ movies });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, searchQuery: "", currentPage: 1 });
  };

  handleSearch = (query) => {
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  getPageData = () => {
    const {
      pageSize,
      currentPage,
      selectedGenre,
      sortColumn,
      searchQuery,
      movies: allMovies,
    } = this.state;

    const filtered = searchQuery
      ? allMovies.filter((m) =>
          m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
        )
      : selectedGenre && selectedGenre._id
      ? allMovies.filter((m) => m.genre._id === selectedGenre._id)
      : allMovies;
    const { length: count } = filtered;

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const movies = paginate(sorted, currentPage, pageSize);

    return { totalCount: count, data: movies };
  };

  render() {
    const {
      pageSize,
      currentPage,
      genres,
      selectedGenre,
      sortColumn,
      searchQuery,
      movies: allMovies,
    } = this.state;

    const { user } = this.props;

    const { data: movies, totalCount } = this.getPageData();

    const infoText =
      totalCount === 0
        ? "There are no movies in the database"
        : `Showing ${totalCount} movies in the database`;

    return (
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={2}>
            <ListGroup
              items={genres}
              selectedItem={selectedGenre}
              onItemSelect={this.handleGenreSelect}
            />
          </Grid>

          <Grid item xs={10}>
            {user && (
              <Link
                color={"inherit"}
                underline={"none"}
                component={RouterLink}
                to={"/movies/new"}
              >
                <Button sx={{ marginBottom: 2 }} variant="contained">
                  New Movie
                </Button>
              </Link>
            )}

            <Typography textAlign={"initial"} mb={2}>
              {infoText}
            </Typography>

            <SearchBox
              value={searchQuery}
              options={allMovies}
              onChange={this.handleSearch}
            />

            <MoviesTable
              movies={movies}
              sortColumn={sortColumn}
              onDelete={this.handleDelete}
              onLike={this.handleLike}
              onSort={this.handleSort}
            />

            <Pagination
              itemsCount={totalCount}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={this.handlePageChange}
            />
          </Grid>
        </Grid>
      </Box>
    );
  }
}

Movies.propTypes = {
  user: PropTypes.object,
};

export default Movies;
