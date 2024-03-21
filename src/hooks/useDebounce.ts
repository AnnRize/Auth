import { useEffect, useState } from "react";

type useDebounceType<T> = (value: T, delay: number) => T;

export const useDebounce: useDebounceType<unknown> = (value, delay) => {
   const [newValue, setNewValue] = useState(value);

   useEffect(() => {
      const timer = setTimeout(() => {
         setNewValue(value);
      }, delay);

      return () => {
         clearTimeout(timer);
      };
   });

   return newValue;
};
