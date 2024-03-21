import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import style from "./Parallax.module.scss";

export const Parallax = observer(() => {
   const [value, setValue] = useState(0);
   useEffect(() => {
      const handleScroll = () => {
         setValue(scrollY);
      };

      window.addEventListener("scroll", handleScroll);

      return () => {
         window.removeEventListener("scroll", handleScroll);
      };
   }, []);

   return (
      <div className={style.parallax}>
         <div
            style={{
               left: value * -0.3 + `px`,
               top: value * -0.5 + `px`,
            }}
            className={style.parallax__top_left_object}
         />
         <div
            style={{
               right: value * -0.3 + `px`,
               top: value * -0.5 + `px`,
            }}
            className={style.parallax__top_right_object}
         />
         <div
            style={{
               marginTop: value * 0.5 + `px`,
            }}
            className={style.parallax__title}
         >
            <h1>Main</h1>
         </div>
         <div
            style={{
               bottom: value * 0.13 + `px`,
            }}
            className={style.parallax__bottom_middle_object}
         />
         <div
            style={{
               bottom: value * 0.17 + `px`,
            }}
            className={style.parallax__bottom_front_object}
         />
         <div className={style.parallax__bottom_front_static_object} />
         <div className={style.parallax__overlay} />
      </div>
   );
});
