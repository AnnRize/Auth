import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { observer } from "mobx-react-lite";
import { MyButton, MyInput } from "interface";
import { UserService } from "api";
import { useStore } from "hooks";
import { IUpdateUser } from "types";
import style from "./ProfileSettings.module.scss";

const ProfileSettings = observer(() => {
   const queryClient = useQueryClient();
   const nav = useNavigate();
   const {
      userStore: { user, setUser },
   } = useStore();

   // hook form
   const { handleSubmit, reset, register } = useForm({
      mode: "onBlur",
   });

   // user data update
   const { mutate } = useMutation(
      ["update_user"],
      async (data: IUpdateUser) => {
         const res = await UserService.UpdateUser(user!.id, data);
         setUser(res.data);
      },
      {
         onSuccess: async () => {
            queryClient.invalidateQueries();
            queryClient.removeQueries(["profile"]);
            reset();
         },
      },
   );

   // user mutate
   const updateUser = (data: Partial<IUpdateUser>) => {
      const tempUser = {
         name: !data.name ? user!.name : data.name,
         dateOfBirth: !data.dateOfBirth ? user!.dateOfBirth : data.dateOfBirth,
         email: !data.email ? user!.email : data.email,
      };
      mutate(tempUser);
   };

   return (
      <>
         <Helmet>
            <title>Настройки</title>
         </Helmet>
         <div className={style.settings}>
            <div className={style.settings__form}>
               <form action="" onSubmit={handleSubmit(updateUser)}>
                  <MyInput
                     type="text"
                     {...register("name", { required: false })}
                     maxLength={50}
                     placeholder="Имя"
                  />

                  <MyInput
                     className={style.date}
                     type="date"
                     {...register("dateOfBirth", {
                        required: false,
                     })}
                     placeholder="Имя"
                     color="red"
                  />

                  <MyInput
                     type="email"
                     {...register("email", { required: false })}
                     maxLength={50}
                     placeholder="Почта"
                  />

                  <div className={style.form__buttons}>
                     <MyButton type="submit">Сохранить</MyButton>
                     <MyButton
                        type="button"
                        onClick={() => {
                           reset();
                           nav(`/profile`);
                        }}
                     >
                        В профиль
                     </MyButton>
                  </div>
               </form>
            </div>
         </div>
      </>
   );
});
export default ProfileSettings;
