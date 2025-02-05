import { createContext, useState } from 'react'

export type ThemeContextType = {
  prefersDarkMode: () => boolean | null | string;
  addDarkClass: () => void;
  hasDarkClass: () => boolean;
  toggleDarkClass: () => void;
  isDarkMode: boolean;
};

export const ThemeContext = createContext<ThemeContextType>({
     prefersDarkMode: () => null,
     addDarkClass: ()=> {},
     hasDarkClass: () => false,
     toggleDarkClass: () => { },
     isDarkMode: false
});

const ThemeProvider = ({ children }: {children: React.ReactNode}) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Check if the user prefers dark mode
  const prefersDarkMode = () => {
    return (
      localStorage.getItem("prefersDarkmode") &&
      localStorage.getItem("prefersDarkmode") === "true" &&
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    );
  };

  // Add a dark class to html
  const addDarkClass = () => {
    document.documentElement.classList.add("dark");
    setIsDarkMode(true);
  };

  // Check if the html has a dark class
  const hasDarkClass = () => {
    return document.documentElement.classList.contains("dark");
  };

  // toggle dark class on html
  const toggleDarkClass = () => {
    const prefersDark = localStorage.getItem("prefersDarkmode") === "true";
    document.documentElement.classList.toggle("dark");
    if (prefersDark) {
      localStorage.setItem("prefersDarkmode", "false");
    } else {
      localStorage.setItem("prefersDarkmode", "true");
    }
    setIsDarkMode(hasDarkClass());
  };

  return (
    <ThemeContext.Provider
      value={{
        prefersDarkMode,
        addDarkClass,
        hasDarkClass,
        toggleDarkClass,
        isDarkMode,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider