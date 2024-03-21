import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useQueryClient } from "react-query";
import { observer } from "mobx-react-lite";
import { MyButton } from "interface";
import { useStore } from "hooks";
import style from "./UserMenu.module.scss";

export const UserMenu = observer(() => {
   const [isMenu, setIsMenu] = useState(false);
   const queryClient = useQueryClient();
   const {
      userStore: { user, logout },
   } = useStore();

   const nav = useNavigate();
   const ref = useRef<HTMLDivElement>(null);
   const location = useLocation();

   useEffect(() => {
      const isOutsideClick = (e: MouseEvent) => {
         if (
            isMenu &&
            ref.current &&
            !ref.current.contains(e.target as HTMLElement)
         ) {
            setIsMenu(false);
         }
      };

      document.addEventListener("mousedown", isOutsideClick);

      return () => {
         document.removeEventListener("mousedown", isOutsideClick);
      };
   }, [isMenu]);

   useEffect(() => {
      setIsMenu(false);
   }, [location.pathname]);

   return !user ? (
      <div className={style.login}>
         <Link className={style.login__link} to={"/login"}>
            Войти
         </Link>
      </div>
   ) : (
      <>
         <div className={style.profile} ref={ref}>
            <div
               className={style.profile__icon}
               style={{
                  backgroundImage: `url(${user.image})`,
               }}
               onClick={() => setIsMenu((e) => !e)}
            />
            <div
               className={`${style.profile__menu} ${
                  isMenu && `${style.profile__menu_visibility}`
               }`}
            >
               <Link className={style.menu__link} to={`/profile`}>
                  Профиль
               </Link>
               <Link className={style.menu__link} to={`/profile/settings`}>
                  Настройки
               </Link>
               <MyButton
                  className={style.menu__link}
                  onClick={() => {
                     logout();
                     queryClient.invalidateQueries();
                     nav("/");
                  }}
               >
                  Выйти
               </MyButton>
            </div>
         </div>
      </>
   );
});
