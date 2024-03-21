/* eslint-disable mobx/missing-observer */
import { ReactNode, createContext, useEffect, useState } from "react";

interface ThemeContextProps {
   isDark: boolean;
   themeSwap: () => void;
}

interface ThemeProviderProps {
   children: ReactNode;
}

export const ThemeContext = createContext<ThemeContextProps | null>(null);

const ThemeProvider = ({ children }: ThemeProviderProps) => {
   const [isDark, setIsDark] = useState(true);

   const theme = localStorage.getItem("theme");

   const themeSwap = () => {
      if (isDark) {
         localStorage.setItem("theme", "light");
         document.body.classList.add("light-theme");
         setIsDark(false);
      } else {
         localStorage.setItem("theme", "dark");
         document.body.classList.remove("light-theme");
         setIsDark(true);
      }
   };

   useEffect(() => {
      if (!theme) {
         if (window.matchMedia("(prefers-color-scheme:dark").matches) {
            localStorage.setItem("theme", "dark");
            setIsDark(true);
         } else {
            localStorage.setItem("theme", "light");
            setIsDark(false);
         }
         return;
      }
      if (theme === "dark") {
         document.body.classList.remove("light-theme");
         setIsDark(true);
         return;
      } else {
         document.body.classList.add("light-theme");
         setIsDark(false);
         return;
      }
   }, [theme]);

   return (
      <ThemeContext.Provider value={{ isDark, themeSwap }}>
         {children}
      </ThemeContext.Provider>
   );
};
export default ThemeProvider;
