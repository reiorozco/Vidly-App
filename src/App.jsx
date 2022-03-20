import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import "./App.css";
// import Counter from "./components/counter";
import Movies from "./components/movies";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/notFound";
import Navbar from "./components/Navbar";
import MovieForm from "./components/movieForm";
import LoginForm from "./components/loginForm";

function App() {
  return (
    <div className="App">
      {/*<Counter />*/}
      <Navbar />

      <Routes>
        <Route index element={<Navigate to={"/movies"} />} />
        <Route path={"login"} element={<LoginForm />} />
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
