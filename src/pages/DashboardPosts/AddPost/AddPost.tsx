import { useMutation, useQueryClient } from "react-query";
import { useForm } from "react-hook-form";
import { Dispatch } from "react";
import { observer } from "mobx-react-lite";
import { MyButton, MyInput, MyTextarea } from "interface";
import { PostService } from "api";
import { getTimeNow, toastMessage } from "utils";
import { ICreatePost, ICreatePostNoTime } from "types";
import style from "./AddPost.module.scss";

interface AddPostProps {
   setModalActive: Dispatch<boolean>;
}

export const AddPost = observer(({ setModalActive }: AddPostProps) => {
   const queryClient = useQueryClient();

   //hook form
   const {
      handleSubmit,
      register,

      formState: { errors },
   } = useForm({
      mode: "onBlur",
      shouldFocusError: true,
      defaultValues: { smimg: "", laimg: "", header: "", description: "" },
   });

   // post create
   const { mutate, isLoading } = useMutation(
      ["create_post"],
      async (data: ICreatePost) => {
         await PostService.createPost(data);
      },
      {
         onSuccess: () => {
            queryClient.invalidateQueries();
            toastMessage("success");
            setModalActive(false);
         },
         onError: () => {
            toastMessage("error");
         },
      },
   );

   // post mutate
   const addPost = (data: ICreatePostNoTime) => {
      const time = getTimeNow();
      mutate({ ...data, time });
   };

   return (
      <form className={style.add} onSubmit={handleSubmit(addPost)}>
         <h2 className={style.add__title}>Добавить пост</h2>

         {errors?.smimg && (
            <p className={style.add__error}>
               {errors?.smimg?.message || "Error!"}
            </p>
         )}
         <MyInput
            className={style.add__input}
            type="text"
            {...register("smimg", { required: "* Обязательно к заполнению" })}
            placeholder="Ссылка на картинку 500w"
         />

         {errors?.laimg && (
            <p className={style.add__error}>
               {errors?.laimg?.message || "Error!"}
            </p>
         )}
         <MyInput
            className={style.add__input}
            type="text"
            {...register("laimg", { required: "* Обязательно к заполнению" })}
            placeholder="Ссылка на картинку 1000w"
         />

         {errors?.header && (
            <p className={style.add__error}>
               {errors?.header?.message || "Error!"}
            </p>
         )}

         <MyInput
            className={style.add__input}
            type="text"
            {...register("header", { required: "* Обязательно к заполнению" })}
            placeholder="Заголовок"
         />

         {errors?.description && (
            <p className={style.add__error}>
               {errors?.description?.message || "Error!"}
            </p>
         )}
         <MyTextarea
            className={style.add__textarea}
            {...register("description", {
               required: "* Обязательно к заполнению",
            })}
            placeholder="Описание"
            rows={5}
         />
         <div className={style.add__buttons}>
            <MyButton disabled={isLoading} type="submit">
               Добавить
            </MyButton>
            <MyButton onClick={() => setModalActive(false)}>Отмена</MyButton>
         </div>
      </form>
   );
});
