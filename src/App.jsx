import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import auth from "./services/authService";

import Movies from "./components/movies";
import RegisterForm from "./components/registerForm";
import LoginForm from "./components/loginForm";
import MovieForm from "./components/movieForm";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/notFound";
import Navbar from "./components/Navbar";
import Logout from "./components/logout";
import ProtectedRoute from "./components/common/protectedRoute";

import "./App.css";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = auth.getCurrentUser();
    setUser(currentUser);
  }, []);

  return (
    <div className="App">
      <ToastContainer />

      <Navbar user={user} />

      <Routes>
        <Route index element={<Navigate to={"/movies"} />} />
        <Route path={"login"} element={<LoginForm />} />
        <Route path={"logout"} element={<Logout />} />
        <Route path={"register"} element={<RegisterForm />} />
        <Route path={"movies"} element={<Movies user={user} />} />
        <Route
          path={"movies/:id"}
          element={
            <ProtectedRoute>
              <MovieForm />
            </ProtectedRoute>
          }
        />
        <Route path={"customers"} element={<Customers />} />
        <Route path={"rentals"} element={<Rentals />} />
        <Route path={"*"} element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
