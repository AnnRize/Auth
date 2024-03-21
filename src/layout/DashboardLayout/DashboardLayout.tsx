import { Helmet } from "react-helmet-async";
import { observer } from "mobx-react-lite";
import { DashboardContent, DashboardNavBar } from ".";
import style from "./DashboardLayout.module.scss";

const DashboardLayout = observer(() => {
   return (
      <>
         <Helmet>
            <title>Панель управления</title>
         </Helmet>
         <div className={style.dashboard}>
            <DashboardNavBar />
            <DashboardContent />
         </div>
      </>
   );
});
export default DashboardLayout;
