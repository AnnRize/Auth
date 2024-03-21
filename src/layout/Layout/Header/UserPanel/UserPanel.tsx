import { observer } from "mobx-react-lite";
import { ThemeSwitcher, UserMenu } from ".";
import style from "./UserPanel.module.scss";

export const UserPanel = observer(() => {
   return (
      <div className={style.user_panel}>
         <ThemeSwitcher />
         <UserMenu />
      </div>
   );
});
