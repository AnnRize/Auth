export const getAgeString = (age: number) => {
   
   if (age >= 5 && age <= 20) {
      return age + " лет";
   } else {
      const mod = age % 10;
      if (mod === 1) {
         return age + " год";
      }
      if (mod >= 2 && mod <= 4) {
         return age + " года";
      } else {
         return age + " лет";
      }
   }
};
