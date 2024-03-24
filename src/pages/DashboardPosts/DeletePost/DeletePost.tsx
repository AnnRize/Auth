import { useMutation, useQueryClient } from "react-query";
import { Dispatch } from "react";
import { observer } from "mobx-react-lite";
import { PostService } from "api";
import { useStore } from "hooks";
import { MyButton } from "interface";
import { toastMessage } from "utils";
import style from "./DeletePost.module.scss";

interface DeletePostProps {
   setModalActive: Dispatch<boolean>;
}

export const DeletePost = observer(({ setModalActive }: DeletePostProps) => {
   const queryClient = useQueryClient();
   const {
      dashboardDataStore: { getPost, fullReset },
   } = useStore();

   // post delete
   const { mutate } = useMutation(
      ["delete_post"],
      async (id: number) => {
         await PostService.deletePostById(id);
      },
      {
         onSuccess: async () => {
            queryClient.invalidateQueries();
            setModalActive(false);
            fullReset();
            toastMessage("delete");
         },
         onError: () => {
            toastMessage("error");
         },
      },
   );

   // post mutate
   const deletePost = async () => {
      mutate(getPost!.id);
   };

   return (
      <div className={style.delete}>
         <h2 className={style.delete__title}>
            <strong>Вы уверены, что хотите удалить этот пост?</strong>
         </h2>
         <div className={style.delete__buttons}>
            <MyButton onClick={deletePost}>Удалить</MyButton>
            <MyButton
               onClick={() => {
                  setModalActive(false);
               }}
            >
               Отмена
            </MyButton>
         </div>
      </div>
   );
});
