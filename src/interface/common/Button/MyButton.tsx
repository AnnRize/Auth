import { ButtonHTMLAttributes, forwardRef } from "react";
import style from "./MyButton.module.scss";

interface MyButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
   size?: "s" | "m" | "l";
}

export const MyButton = forwardRef<HTMLButtonElement, MyButtonProps>(
   ({ children, className, size = "m", ...props }, ref) => {
      return (
         <button
            className={`${style.myButton} ${style[size]} ${className}`}
            {...props}
            ref={ref}
         >
            {children}
         </button>
      );
   },
);
