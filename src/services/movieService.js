import http from "./httpServices";

export function getMovies() {
  return http.get("/api/movies");
}

export function getMovie(movieId) {
  return http.get(`/api/movies/${movieId}`);
}

export function saveMovie(movie) {
  if (movie._id) {
    const body = { ...movie };
    delete body._id;
    return http.put(`/api/movies/${movie._id}`, body);
  }

  return http.post("/api/movies", movie);
}

export function deleteMovies(movieId) {
  return http.delete(`/api/movies/${movieId}`);
}
