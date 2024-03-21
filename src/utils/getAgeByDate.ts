export function getAgeByDate(birthDate: string) {
   const currentTime = new Date();
   const dateOfBirth = new Date(birthDate);

   let years = currentTime.getFullYear() - dateOfBirth.getFullYear();

   if (currentTime.getMonth() < dateOfBirth.getMonth()) {
      years--;
   } else if (currentTime.getMonth() === dateOfBirth.getMonth()) {
      if (currentTime.getDate() < dateOfBirth.getDate()) {
         years = years - 1;
      }
   }
   return years;
}
