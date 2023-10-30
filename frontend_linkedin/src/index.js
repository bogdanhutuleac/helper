import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./components/App";
import Store from "./store";
import "./index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="975215730359-q2bppoft7gs14e4606pe0hmtgb7ecoa3.apps.googleusercontent.com">
      <Provider store={Store}>
        <App />
      </Provider>
    </GoogleOAuthProvider>
  </React.StrictMode>
  // document.getElementById("root")
);
