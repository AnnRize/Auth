import { Dispatch } from "react";
import { Link, NavLink } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { MenuIcon, MyButton } from "interface";
import { useStore } from "hooks";
import { SearchBar } from "..";
import style from "./SideMenu.module.scss";

interface ActivePageProps {
   isActive: boolean;
}

const isActivePage = ({ isActive }: ActivePageProps) => {
   return `${style.nav__link} ${isActive ? style.nav__link_active : ""}`;
};

interface SideMenuProps {
   isOpen: boolean;
   setIsOpen: Dispatch<boolean>;
   search: string;
   setSearch: Dispatch<string>;
}

export const SideMenu = observer(
   ({ isOpen, setIsOpen, search, setSearch }: SideMenuProps) => {
      const {
         userStore: { user },
      } = useStore();

      return (
         <div className={style["side-menu"]}>
            <nav
               className={`${style["side-menu__nav"]} ${
                  isOpen && style["side-menu__nav_open"]
               }`}
            >
               <MyButton
                  onClick={() => setIsOpen(false)}
                  className={style.nav__button}
               >
                  <MenuIcon />
               </MyButton>
               <NavLink to={"/"} className={isActivePage}>
                  Главная
               </NavLink>
               <NavLink to={"/posts"} className={isActivePage}>
                  Новости
               </NavLink>
               <NavLink to={"/users"} className={isActivePage}>
                  Пользователи
               </NavLink>
               {user?.role === "admin" && (
                  <Link
                     to={"/dashboard/posts"}
                     className={`${style.nav__link} ${
                        location.pathname.includes("/dashboard") &&
                        style.nav__link_active
                     }`}
                  >
                     Панель управления
                  </Link>
               )}
               <SearchBar
                  search={search}
                  setSearch={setSearch}
                  className={style["nav__search-bar_hidden"]}
               />
            </nav>
            <div
               onClick={() => setIsOpen(false)}
               className={`${isOpen && style["side-menu__background"]}`}
            />
         </div>
      );
   },
);
