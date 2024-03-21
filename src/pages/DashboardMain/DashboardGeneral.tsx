import { observer } from "mobx-react-lite";
import style from "./DashboardGeneral.module.scss";

const DashboardGeneral = observer(() => {
   return (
      <section className={style.container}>
         <h1>Главная</h1>
      </section>
   );
});

export default DashboardGeneral;
