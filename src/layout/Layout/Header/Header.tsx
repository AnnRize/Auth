import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { NavBar, SearchBar, SideMenu, UserPanel } from ".";
import style from "./Header.module.scss";

export const Header = observer(() => {
   const [search, setSearch] = useState("");
   const [isOpen, setIsOpen] = useState(false);
   const location = useLocation();

   useEffect(() => {
      if (search) {
         setSearch("");
      }
      setIsOpen(false);
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [location.pathname]);

   return (
      <>
         <div className={style.nav}>
            <NavBar setIsOpen={setIsOpen} />
            <SearchBar search={search} setSearch={setSearch} />
            <UserPanel />
         </div>
         <SideMenu
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            search={search}
            setSearch={setSearch}
         />
      </>
   );
});
