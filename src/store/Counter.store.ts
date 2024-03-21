import { makeAutoObservable } from "mobx";

//Локальное хранилище
export class Counter {
   count = 0;

   constructor() {
      makeAutoObservable(this, {}, { autoBind: true });
   }
   get doubleCount() {
      return this.count * 2;
   }
   increment() {
      this.count++;
      this.count++;
      this.count++;
   }
   decrement() {
      this.count--;
   }
   reset() {
      this.count = 0;
   }
}

// export const counterStore = new Counter();
