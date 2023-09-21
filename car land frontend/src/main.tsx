import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { persistor, store } from "./redux/store/store.ts";

const clientId: string = import.meta.env.VITE_GOOGLE_CLIENT_ID;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
    <GoogleOAuthProvider clientId={clientId}>
      <App />
    </GoogleOAuthProvider>
    </PersistGate>
    </Provider>
  </React.StrictMode>
);
