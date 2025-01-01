import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { SidebarProvider } from "./context/SidebarContext.jsx";
import React from "react";
import "./index.css";
import { store } from "./store";
import { Provider } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import "primereact/resources/themes/saga-blue/theme.css"; // ou un autre thème de votre choix
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { PrimeReactProvider } from "primereact/api"; // Assurez-vous d'importer PrimeReactProvider

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <ThemeProvider>
      <SidebarProvider>
        <PrimeReactProvider>
          <App />
        </PrimeReactProvider>
      </SidebarProvider>
    </ThemeProvider>
  </Provider>
);
