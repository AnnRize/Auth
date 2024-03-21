import { observer } from "mobx-react-lite";
import { useState } from "react";
import { Counter } from "store/Counter.store";

export const CounterFC = observer(() => {
   // const { count, doubleCount, increment, decrement, reset } =
   //    useLocalObservable(Counter);
   // функция - работает

   // const { count, doubleCount, increment, decrement, reset } =
   //    useLocalObservable(() => new Counter());
   // класс  - работает

   const [store] = useState(() => new Counter());
   // класс  - работает

   return (
      <>
         <div>Count: {store.count}</div>
         <div>Count: {store.doubleCount}</div>
         <button onClick={store.increment}>Плюс</button>
         <button onClick={store.decrement}>Минус</button>
         <button onClick={store.reset}>Сброс</button>
      </>
   );
});
