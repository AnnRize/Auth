import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { MyButton } from "interface";
import style from "./CookieNotification.module.scss";

export const CookieNotification = observer(() => {
   const [open, setOpen] = useState(false);
   const isCookieConsent = localStorage.getItem("cookieConsent");

   const cookieConsent = () => {
      localStorage.setItem("cookieConsent", "true");
      setOpen(false);
   };

   useEffect(() => {
      if (!isCookieConsent) {
         setOpen(true);
      }
   }, [isCookieConsent]);

   return (
      !!open && (
         <div className={style.container}>
            <div className={style.modal}>
               <div className={style.cookie}>
                  <strong>Данный сайт использует Cookie!</strong>
               </div>
               <MyButton onClick={cookieConsent}>Принять</MyButton>
            </div>
         </div>
      )
   );
});
