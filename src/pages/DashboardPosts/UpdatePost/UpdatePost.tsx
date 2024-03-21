import { useMutation, useQueryClient } from "react-query";
import { observer } from "mobx-react-lite";
import { useForm } from "react-hook-form";
import { Dispatch } from "react";
import { MyButton, MyInput, MyTextarea } from "interface";
import { PostService } from "api";
import { useStore } from "hooks";
import { ICreatePostNoTime } from "types";
import { toastMessage } from "utils";
import style from "./UpdatePost.module.scss";

interface UpdatePostProps {
   setModalActive: Dispatch<boolean>;
}

export const UpdatePost = observer(({ setModalActive }: UpdatePostProps) => {
   const queryClient = useQueryClient();
   const {
      dashboardDataStore: { postData, fullReset },
   } = useStore();

   // hook form
   const { handleSubmit, reset, register } = useForm({
      mode: "onChange",
      defaultValues: {
         smimg: postData?.smimg || "",
         laimg: postData?.laimg || "",
         header: postData?.header || "",
         description: postData?.description || "",
      },
   });

   // post update
   const { mutate } = useMutation(
      ["update_post"],
      async (data: ICreatePostNoTime) => {
         await PostService.updatePostById(postData!.id, data);
      },
      {
         onSuccess: () => {
            queryClient.invalidateQueries();
            toastMessage("update");
            fullReset();
            setModalActive(false);
         },
         onError: () => {
            toastMessage("error");
            reset();
         },
      },
   );

   // post mutate
   const updatePost = (post: ICreatePostNoTime) => {
      const tempPost: ICreatePostNoTime = {
         smimg: !post.smimg ? postData!.smimg : post.smimg,
         laimg: !post.laimg ? postData!.laimg : post.laimg,
         header: !post.header ? postData!.header : post.header,
         description: !post.description
            ? postData!.description
            : post.description,
      };
      mutate(tempPost);
   };

   return (
      <form className={style.update} onSubmit={handleSubmit(updatePost)}>
         <h2 className={style.update__title}>Редактировать пост</h2>
         <MyInput
            className={style.update__input}
            {...register("smimg", { required: false })}
            type="text"
            placeholder="Ссылка на картинку 500w"
         />
         <MyInput
            className={style.update__input}
            {...register("laimg", { required: false })}
            type="text"
            placeholder="Ссылка на картинку 1000w"
         />
         <MyInput
            className={style.update__input}
            {...register("header", { required: false })}
            type="text"
            placeholder="Заголовок"
         />
         <MyTextarea
            className={style.update__textarea}
            {...register("description", {
               required: false,
            })}
            placeholder="Описание"
            rows={5}
         />

         <div className={style.update__buttons}>
            <MyButton type="submit">Изменить</MyButton>
            <MyButton onClick={() => setModalActive(false)}>Отмена</MyButton>
         </div>
      </form>
   );
});
