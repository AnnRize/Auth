export function getTimeNow() {
   return new Date()
      .toLocaleDateString("ru-RU", { hour: "numeric", minute: "numeric" })
      .replace(",", "");
}
