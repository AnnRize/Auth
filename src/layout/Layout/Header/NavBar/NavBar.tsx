import { Link, NavLink, useLocation } from "react-router-dom";
import { Dispatch, SetStateAction } from "react";
import { observer } from "mobx-react-lite";
import { MenuIcon, MyButton } from "interface";
import { useStore } from "hooks";
import style from "./NavBar.module.scss";

interface ActivePageProps {
   isActive: boolean;
}

const isActivePage = ({ isActive }: ActivePageProps) => {
   return `${style.nav__link} ${isActive ? style.nav__link_active : ""}`;
};

interface NavBarProps {
   setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const NavBar = observer(({ setIsOpen }: NavBarProps) => {
   const {
      userStore: { user },
   } = useStore();
   const location = useLocation();

   return (
      <nav className={style.nav}>
         <MyButton
            onClick={() => setIsOpen((e) => !e)}
            className={style.side_menu_button}
         >
            <MenuIcon />
         </MyButton>
         <NavLink to={"/"} className={isActivePage}>
            Главная
         </NavLink>
         <NavLink to={"/posts"} className={isActivePage}>
            Посты
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
      </nav>
   );
});
