import toast from "react-hot-toast";

export const toastMessage = (
   toastMessage: "success" | "update" | "delete" | "error",
) => {
   switch (toastMessage) {
      case "success":
         toast.success("Запись успешно добавлена!");
         break;
      case "update":
         toast.success("Запись успешно изменена!");
         break;
      case "delete":
         toast.success("Запись успешно удалена!");
         break;
      case "error":
         toast.error("Не удалось подключится к серверу! Попробуйте позже.");
         break;
   }
};
