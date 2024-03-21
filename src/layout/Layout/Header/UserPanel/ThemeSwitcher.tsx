import { observer } from "mobx-react-lite";
import { DarkIcon, LightIcon, MyButton } from "interface";
import { useStore } from "hooks";
import style from "./ThemeSwitcher.module.scss";

export const ThemeSwitcher = observer(() => {
   const { themeStore } = useStore();

   return (
      <div className={style.theme}>
         <MyButton
            className={style.theme__switcher}
            onClick={themeStore.toggleTheme}
            aria-label="Theme"
         >
            {themeStore.isDark ? <DarkIcon /> : <LightIcon />}
         </MyButton>
      </div>
   );
});
