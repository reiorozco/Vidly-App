import React from "react";
import Joi from "joi";

import {
  Avatar,
  Box,
  Container,
  CssBaseline,
  Grid,
  Typography,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AddCircle } from "@mui/icons-material";
import { Navigate } from "react-router-dom";

import { getGenres } from "../services/genreService";
import { getMovie, saveMovie } from "../services/movieService";
import withRouter from "../utils/withRouter";
import Copyright from "./common/copyright";
import Form from "./common/form";

class MovieForm extends Form {
  state = {
    data: {
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: "",
    },
    genres: [],
    redirect: false,
    errors: {},
  };

  theme = createTheme();

  schema = Joi.object({
    _id: Joi.string(),
    title: Joi.string().label("Title").required(),
    genreId: Joi.string().label("Genre").required(),
    numberInStock: Joi.number().min(0).max(100).label("Number in Stock"),
    dailyRentalRate: Joi.number().min(0).max(10).label("Daily Rental Rate"),
  });

  async populateGenres() {
    const { data: genres } = await getGenres();
    this.setState({ genres });
  }

  async populateMovie() {
    try {
      const { id: movieId } = this.props.router.params;
      console.log(movieId);
      if (movieId === "new") return;

      const { data: movie } = await getMovie(movieId);
      console.log(movie);
      this.setState({ data: this.mapToViewModel(movie[0]) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.setState({ redirect: true });
    }
  }

  async componentDidMount() {
    await this.populateGenres();
    await this.populateMovie();
  }

  mapToViewModel(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock.toString(),
      dailyRentalRate: movie.dailyRentalRate.toString(),
    };
  }

  doSubmit = async () => {
    const { navigate } = this.props.router;

    await saveMovie(this.state.data);

    navigate("/");
  };

  render() {
    if (this.state.redirect)
      return <Navigate to={"/not-found"} replace={true} />;

    return (
      <ThemeProvider theme={this.theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />

          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <AddCircle />
            </Avatar>

            <Typography component="h1" variant="h5">
              Movie Form
            </Typography>

            <Box
              component="form"
              noValidate
              onSubmit={this.handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid item xs={12}>
                {this.renderInput("title", "Title", "text", {
                  autoFocus: true,
                })}
              </Grid>

              <Grid item xs={12}>
                {this.renderSelect("genreId", "Genre", this.state.genres)}
              </Grid>

              <Grid item xs={12}>
                {this.renderInput(
                  "numberInStock",
                  "Number In Stock",
                  "number",
                  {
                    inputProps: {
                      step: 1,
                      min: 0,
                      max: 100,
                    },
                  }
                )}
              </Grid>

              <Grid item xs={12}>
                {this.renderInput("dailyRentalRate", "Rate", "number", {
                  inputProps: {
                    step: 0.5,
                    min: 0,
                    max: 10,
                  },
                })}
              </Grid>

              {this.renderButton("Save")}
            </Box>
          </Box>

          <Copyright sx={{ mt: 5 }} />
        </Container>
      </ThemeProvider>
    );
  }
}

export default withRouter(MovieForm);
