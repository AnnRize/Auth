import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import { observer } from "mobx-react-lite";
import { LoadSpinner } from "components";
import style from "./DashboardContent.module.scss";

export const DashboardContent = observer(() => {
   return (
      <section className={style.content}>
         <Suspense fallback={<LoadSpinner />}>
            <Outlet />
         </Suspense>
      </section>
   );
});
