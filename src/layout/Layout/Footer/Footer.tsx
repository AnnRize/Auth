import { observer } from "mobx-react-lite";
import style from "./Footer.module.scss";

export const Footer = observer(() => {
   return <div className={style.footer}>&copy; 2024 - Copyright.</div>;
});
