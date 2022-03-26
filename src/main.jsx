import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import logger from "./services/logService";
import "./index.css";
import App from "./App";

logger.init();

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
