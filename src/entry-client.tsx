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
      <AuthProvider>
        <PaymentProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </PaymentProvider>
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>
);
