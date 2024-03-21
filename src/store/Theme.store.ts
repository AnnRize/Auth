/* eslint-disable mobx/missing-observer */
import { makeAutoObservable } from "mobx";

//Глобальное хранилище
export const Theme = () => {
   const isTheme = localStorage.getItem("theme"); // Наличие темы в хранилище
   let themeIsDark;

   if (!isTheme) {
      // Если тема отсутствует, создаём новую учитывая предпочтения браузера и добавляем в хранилище
      if (window.matchMedia("(prefers-color-scheme:dark").matches) {
         localStorage.setItem("theme", "dark");
         themeIsDark = true;
      } else {
         localStorage.setItem("theme", "light");
         document.documentElement.setAttribute("data-theme", "light");
         themeIsDark = false;
      }
   } else {
      // Иначе включаем тему из хранилища
      if (isTheme === "light") {
         document.documentElement.setAttribute("data-theme", "light");
         themeIsDark = false;
      } else {
         localStorage.setItem("theme", "dark");
         document.documentElement.setAttribute("data-theme", "dark");
         themeIsDark = true;
      }
   }

   return makeAutoObservable(
      {
         isDark: themeIsDark,
         toggleTheme() {
            //Меняем тему
            if (this.isDark) {
               localStorage.setItem("theme", "light");
               document.documentElement.setAttribute("data-theme", "light");
               this.isDark = false;
            } else {
               localStorage.setItem("theme", "dark");
               document.documentElement.setAttribute("data-theme", "dark");
               this.isDark = true;
            }
         },
      },
      {},
      { autoBind: true },
   );
};
