import { useMutation, useQueryClient } from "react-query";
import { Navigate, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { observer } from "mobx-react-lite";
import { MyButton, MyInput } from "interface";
import { UserService } from "api";
import { useStore } from "hooks";
import { IRegUser } from "types";
import style from "./Registration.module.scss";

const Registration = observer(() => {
   const queryClient = useQueryClient();
   const navigate = useNavigate();
   const {
      userStore: { user },
   } = useStore();

   // hook form
   const {
      handleSubmit,
      reset,
      register,
      formState: { errors },
      setError,
   } = useForm({
      mode: "onBlur",
      shouldFocusError: true,
      defaultValues: { name: "", email: "", password: "" },
   });

   // user registration
   const { mutate, isLoading } = useMutation(
      ["registration"],
      async (data: IRegUser) => {
         await UserService.RegUser(data);
      },
      {
         onSuccess: () => {
            reset();
            queryClient.invalidateQueries();
            toast.success("Вы успешно зарегистрировались!");
         },
         onError: () => {
            reset({ email: "" });
            setError("email", {
               type: "custom",
               message: "Этот почтовый адрес уже используется!",
            });
         },
      },
   );

   // user mutate
   const createUser = async (data: IRegUser) => {
      mutate(data);
   };

   if (user) {
      return <Navigate to="/" replace />;
   }

   return (
      <>
         <Helmet>
            <title>Регистрация</title>
         </Helmet>
         <div className={style.wrapper}>
            <div className={style.form}>
               <h1 className={style.form__title}>Регистрация</h1>
               <form action="" onSubmit={handleSubmit(createUser)}>
                  {errors?.name && (
                     <p className={style.form__error}>
                        {errors.name.message || "Error!"}
                     </p>
                  )}
                  <MyInput
                     className={style.form__input}
                     type="text"
                     {...register("name", {
                        required: "* Обязательно к заполнению",
                        minLength: {
                           value: 3,
                           message: "* Минимум 3 символа",
                        },
                     })}
                     maxLength={50}
                     placeholder="Имя"
                  />

                  {errors?.email && (
                     <p className={style.form__error}>
                        {errors.email.message || "Error!"}
                     </p>
                  )}
                  <MyInput
                     className={style.form__input}
                     type="text"
                     {...register("email", {
                        required: "* Обязательно к заполнению",
                        pattern: {
                           value: /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i,
                           message: "* Почта введена неправильно",
                        },
                     })}
                     maxLength={50}
                     placeholder="Почта"
                  />

                  {errors?.password && (
                     <p className={style.form__error}>
                        {errors.password.message || "Error!"}
                     </p>
                  )}
                  <MyInput
                     className={style.form__input}
                     type="password"
                     {...register("password", {
                        required: "* Обязательно к заполнению",
                     })}
                     maxLength={50}
                     placeholder="Пароль"
                     autoComplete="new-password"
                  />
                  <MyButton
                     type="submit"
                     className={style.form__button}
                     disabled={isLoading}
                  >
                     Создать
                  </MyButton>
                  <MyButton
                     className={style.form__button}
                     type="button"
                     onClick={() => navigate("/login")}
                  >
                     Войти
                  </MyButton>
               </form>
            </div>
         </div>
      </>
   );
});

export default Registration;
