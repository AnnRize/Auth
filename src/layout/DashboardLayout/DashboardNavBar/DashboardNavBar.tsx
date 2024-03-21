import { NavLink } from "react-router-dom";
import { observer } from "mobx-react-lite";
import style from "./DashboardNavBar.module.scss";

interface isActivePageProps {
   isActive: boolean;
}

const isActivePage = ({ isActive }: isActivePageProps) => {
   return `${style.nav__link} ${isActive ? style.nav__link_active : ""}`;
};

export const DashboardNavBar = observer(() => {
   return (
      <aside className={style.nav}>
         <ul>
            <li>
               <NavLink to="posts" className={isActivePage}>
                  Посты
               </NavLink>
            </li>
            <li>
               <NavLink to="users" className={isActivePage}>
                  Пользователи
               </NavLink>
            </li>
         </ul>
      </aside>
   );
});
