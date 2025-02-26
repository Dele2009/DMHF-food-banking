import { useEffect } from "react";
import { Router } from "./routes";
import { useTheme } from "./hooks/useTheme";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "./hooks/useAuth";

function App() {
  // const { prefersDarkMode, isDarkMode, addDarkClass } = useTheme();
  // // check user prefered theme for system / browser first load
  // // then set the theme accordingly
  // useEffect(() => {
  //   if (prefersDarkMode()) {
  //     addDarkClass();
  //     localStorage.setItem("prefersDarkmode", "true");
  //   }
  // }, []);
  const {LogoutModal} = useAuth()

  return (
    <main
      className={`text-gray-900 dark:text-gray-100 yellow-theme-dark`}
    >
      <Router />
      <ToastContainer
        limit={2}
        hideProgressBar
        pauseOnHover
        theme="dark"
      />
      <LogoutModal/>
    </main>
  );
}

export default App;
