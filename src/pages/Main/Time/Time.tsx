import { useEffect, useRef, useState } from "react";
import { observer } from "mobx-react-lite";
import style from "./Time.module.scss";

export const Time = observer(() => {
   const [time, setTime] = useState(new Date().toLocaleTimeString());
   const ref = useRef<HTMLHeadingElement>(null);

   const observer = new IntersectionObserver(
      (entries, observer) => {
         if (entries[0].isIntersecting) {
            ref.current?.classList.add(style.active);
            observer.unobserve(ref.current!);
         }
      },
      { threshold: 1 },
   );

   useEffect(() => {
      observer.observe(ref.current!);
      const timeID = setInterval(() => {
         setTime(new Date().toLocaleTimeString());
      }, 1000);
      return () => {
         observer.disconnect();
         clearInterval(timeID);
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   return (
      <div className={style.time_container}>
         <h1 ref={ref} className={`${style.time}`}>
            {time}
         </h1>
      </div>
   );
});
