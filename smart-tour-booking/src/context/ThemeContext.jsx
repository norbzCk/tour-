import { createContext, useContext, useState, useEffect } from "react";

/* eslint-disable react-refresh/only-export-components */
const ThemeContext = createContext({
  theme: "light",
  isDark: false,
  toggleTheme: () => {},
});

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("theme");
    if (saved) return saved;

    if (typeof window !== "undefined" && window.matchMedia) {
      const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      return systemDark ? "dark" : "light";
    }

    return "light";
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
      root.style.colorScheme = "dark";
    } else {
      root.classList.remove("dark");
      root.style.colorScheme = "light";
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Sync with system preference changes
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return undefined;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e) => {
      if (!localStorage.getItem("theme")) {
        setTheme(e.matches ? "dark" : "light");
      }
    };
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const isDark = theme === "dark";

  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
