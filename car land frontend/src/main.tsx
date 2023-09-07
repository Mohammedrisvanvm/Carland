import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";

import { GoogleOAuthProvider } from "@react-oauth/google";
import { Store, persistor } from "./redux/store/store.ts";
import { PersistGate } from "redux-persist/integration/react";

const GOOGLE_CLIENT_ID =
  "198622255417-c11hpmsp56010plhdb80gda35sacanlb.apps.googleusercontent.com";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={Store}>
      <PersistGate persistor={persistor}>
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
          <App />
        </GoogleOAuthProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
