import React from "react";
import ReactDOM from "react-dom";
import data from "./data";
import App from "./components/App";
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <App characters={data.characters} />
  </React.StrictMode>,
  document.getElementById("root")
);
