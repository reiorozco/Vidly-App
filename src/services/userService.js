import http from "./httpServices";

export function register(user) {
  return http.post("/api/users", {
    name: user.name,
    email: user.email,
    password: user.password,
  });
}
