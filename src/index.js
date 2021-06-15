import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import axios from "axios";
import { CurrentUserProvider } from "./Contexts/currentUserContext";
import { CurrentOrganizationProvider } from "./Contexts/currentOrganizationContext";
import "./Components/design/theme.css";

axios.defaults.baseURL =
  process.env.NODE_ENV === "development" ? "http://localhost:3000" : "/";

ReactDOM.render(
  <React.StrictMode>
    <CurrentUserProvider>
      <CurrentOrganizationProvider>
        <App />
      </CurrentOrganizationProvider>
    </CurrentUserProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorker.unregister();
