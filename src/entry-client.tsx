import "./index.css";
import { StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import ThemeProvider from "./context/ThemeContext";
import App from "./App";
import AuthProvider from "./context/AuthContext";
import { PaymentProvider } from "./context/PaymentContext";

hydrateRoot(
  document.getElementById("root") as HTMLElement,
  <StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <AuthProvider>
          <PaymentProvider>
            <App />
          </PaymentProvider>
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
);
