import { useMutation, useQueryClient } from "react-query";
import { useForm } from "react-hook-form";
import { Dispatch, useState } from "react";
import { observer } from "mobx-react-lite";
import Select from "react-select";
import { MyButton, MyInput } from "interface";
import { customSelect, toastMessage } from "utils";
import { UserService } from "api";
import { ICreateUser, IRegUser, IUserRoleOption } from "types";
import style from "./CreateUser.module.scss";

const options: IUserRoleOption[] = [
   { value: "user", label: "User" },
   { value: "admin", label: "Admin" },
];

interface AddUserProps {
   setModalActive: Dispatch<boolean>;
}

export const AddUser = observer(({ setModalActive }: AddUserProps) => {
   const queryClient = useQueryClient();
   const [role, setRole] = useState("user");

   // hook form
   const {
      handleSubmit,
      register,
      reset,
      formState: { errors },
      setError,
   } = useForm({
      mode: "onBlur",
      shouldFocusError: true,
      defaultValues: { name: "", email: "", password: "" },
   });

   // user create
   const { mutate, isLoading } = useMutation(
      ["create_user"],
      async (data: ICreateUser) => {
         await UserService.createUser(data);
      },
      {
         onSuccess: () => {
            queryClient.invalidateQueries();
            toastMessage("success");
            reset();
         },
         onError: () => {
            reset({ email: "" });
            setError("email", {
               type: "custom",
               message: "Этот почтовый адрес уже используется!",
            });
            toastMessage("error");
         },
      },
   );

   // user mutate
   const addUser = async (data: IRegUser) => {
      mutate({ ...data, role: role });
   };

   return (
      <form className={style.add} onSubmit={handleSubmit(addUser)}>
         <h2 className={style.add__title}>Добавить пользователя</h2>

         {errors?.name && (
            <p className={style.add__error}>
               {errors?.name?.message || "Error!"}
            </p>
         )}
         <MyInput
            className={style.add__input}
            {...register("name", {
               required: "* Обязательно к заполнению",
               minLength: {
                  value: 3,
                  message: "* Минимум 3 символа",
               },
            })}
            placeholder="Имя"
         />

         {errors?.email && (
            <p className={style.add__error}>
               {errors?.email?.message || "Error!"}
            </p>
         )}
         <MyInput
            className={style.add__input}
            type="email"
            {...register("email", {
               required: "* Обязательно к заполнению",
            })}
            placeholder="Почта"
         />

         {errors?.password && (
            <p className={style.add__error}>
               {errors?.password?.message || "Error!"}
            </p>
         )}
         <MyInput
            className={style.add__input}
            type="text"
            {...register("password", {
               required: "* Обязательно к заполнению",
            })}
            placeholder="Пароль"
         />

         <Select
            isSearchable={false}
            options={options}
            defaultValue={options[0]}
            styles={{
               ...customSelect,
               container: (baseStyles) => ({
                  ...baseStyles,
                  marginBottom: "20px",
               }),
            }}
            onChange={(e) => setRole(e!.value)}
            isMulti={false}
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
