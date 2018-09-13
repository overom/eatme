import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import registerServiceWorker from "./registerServiceWorker";
import { MuiThemeProvider } from "@material-ui/core/styles";
import theme from "./material/theme";
import "./assets/index.css";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </MuiThemeProvider>,
  document.getElementById("root")
);
registerServiceWorker();
