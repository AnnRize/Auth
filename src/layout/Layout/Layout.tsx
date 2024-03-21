import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import { observer } from "mobx-react-lite";
import { LoadSpinner } from "components";
import { CookieNotification, Footer, Header } from ".";
import style from "./Layout.module.scss";

export const Layout = observer(() => {
   return (
      <div className={style.container}>
         <header className={style.header}>
            <Header />
         </header>

         <main className={style.main}>
            <Suspense fallback={<LoadSpinner />}>
               <Outlet />
            </Suspense>
         </main>

         <footer className={style.footer}>
            <Footer />
         </footer>

         <CookieNotification />
      </div>
   );
});
