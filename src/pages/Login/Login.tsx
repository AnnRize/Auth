import { Navigate, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { observer } from "mobx-react-lite";
import { Helmet } from "react-helmet-async";
import { MyButton, MyInput } from "interface";
import { UserService } from "api";
import { useStore } from "hooks";
import { ILoginUser } from "types";
import style from "./Login.module.scss";

const Login = observer(() => {
   const navigate = useNavigate();
   const {
      userStore: { user, login },
   } = useStore();

   // hook form
   const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
      setError,
   } = useForm({
      mode: "onBlur",
      shouldFocusError: true,
      defaultValues: { email: "", password: "" },
   });

   // user login
   const { mutate, isLoading } = useMutation(
      ["login"],
      async (data: ILoginUser) => {
         const userData = await UserService.LoginUser(data);
         login(userData);
      },
      {
         onError: () => {
            reset();
            setError("email", {
               type: "custom",
               message: "* Пароль или почта введены неправильно",
            });
         },
      },
   );

   // user mutate
   const getUser = async (data: ILoginUser) => {
      mutate(data);
   };

   if (user) {
      return <Navigate to="/" replace />;
   }

   return (
      <>
         <Helmet>
            <title>Вход</title>
         </Helmet>
         <div className={style.wrapper}>
            <div className={style.form}>
               <h1 className={style.form__title}>Авторизация</h1>
               <form onSubmit={handleSubmit(getUser)}>
                  {errors?.email && (
                     <p className={style.form_error}>
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
                  />

                  <MyButton
                     className={style.form__button}
                     disabled={isLoading}
                     type="submit"
                  >
                     Войти
                  </MyButton>

                  <MyButton
                     className={style.form__button}
                     onClick={() => navigate("/registration")}
                     type="button"
                  >
                     Создать аккаунт
                  </MyButton>
               </form>
            </div>
         </div>
      </>
   );
});
export default Login;
