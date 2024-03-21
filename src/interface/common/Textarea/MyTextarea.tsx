import { TextareaHTMLAttributes, forwardRef } from "react";
import style from "./MyTextarea.module.scss";

export const MyTextarea = forwardRef<
   HTMLTextAreaElement,
   TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...rest }, ref) => {
   return (
      <textarea
         className={`${style.myTextarea} ${className}`}
         ref={ref}
         {...rest}
      />
   );
});
