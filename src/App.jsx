import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import "./App.css";
import Movies from "./components/movies";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/notFound";
import Navbar from "./components/Navbar";
import MovieForm from "./components/movieForm";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Navbar />

      <Routes>
        <Route index element={<Navigate to={"/movies"} />} />
        <Route path={"login"} element={<LoginForm />} />
        <Route path={"register"} element={<RegisterForm />} />
        <Route path={"movies"} element={<Movies />} />
        <Route path={"movies/:id"} element={<MovieForm />} />
        <Route path={"customers"} element={<Customers />} />
        <Route path={"rentals"} element={<Rentals />} />
        <Route path={"*"} element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
