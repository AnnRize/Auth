import { InputHTMLAttributes, forwardRef } from "react";
import style from "./MyInput.module.scss";

export const MyInput = forwardRef<
   HTMLInputElement,
   InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => {
   return (
      <input className={`${style.myInput} ${className}`} ref={ref} {...props} />
   );
});
