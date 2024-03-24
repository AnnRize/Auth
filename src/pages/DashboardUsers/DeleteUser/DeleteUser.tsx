import { useMutation, useQueryClient } from "react-query";
import { Dispatch } from "react";
import { observer } from "mobx-react-lite";
import { MyButton } from "interface";
import { UserService } from "api";
import { useStore } from "hooks";
import { toastMessage } from "utils";
import style from "./DeleteUser.module.scss";

interface DeleteUserProps {
   setModalActive: Dispatch<boolean>;
}

export const DeleteUser = observer(({ setModalActive }: DeleteUserProps) => {
   const queryClient = useQueryClient();
   const {
      dashboardDataStore: { getUser, fullReset },
   } = useStore();

   // user delete
   const { mutate } = useMutation(
      ["delete_post"],
      async (id: number) => {
         await UserService.deleteUser(id);
      },
      {
         onSuccess: async () => {
            queryClient.invalidateQueries();
            toastMessage("delete");
            setModalActive(false);
            fullReset();
         },
         onError: () => {
            toastMessage("error");
         },
      },
   );

   // user mutate
   const deletePost = async () => {
      mutate(getUser!.id);
   };

   return (
      <div className={style.delete}>
         <h2 className={style.delete__title}>
            <strong>
               Вы уверены, что хотите удалить аккаунт пользователя?
            </strong>
         </h2>
         <div className={style.delete__buttons}>
            <MyButton onClick={deletePost}>Удалить</MyButton>
            <MyButton onClick={() => setModalActive(false)}>Отмена</MyButton>
         </div>
      </div>
   );
});
