import http from "./httpServices";

export function getGenres() {
  return http.get("/api/genres");
}
