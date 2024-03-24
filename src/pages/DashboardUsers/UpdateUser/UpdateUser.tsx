import { useMutation, useQueryClient } from "react-query";
import { useForm } from "react-hook-form";
import { Dispatch, useState } from "react";
import { observer } from "mobx-react-lite";
import Select from "react-select";
import { MyButton } from "interface";
import { customSelect, toastMessage } from "utils";
import { UserService } from "api";
import { useStore } from "hooks";
import { IUpdateRole } from "types";
import style from "./UpdateUser.module.scss";

const options = [
   { value: "user", label: "User" },
   { value: "admin", label: "Admin" },
];

interface UpdateUserProps {
   setModalActive: Dispatch<boolean>;
}

export const UpdateUser = observer(({ setModalActive }: UpdateUserProps) => {
   const queryClient = useQueryClient();
   const [role, setRole] = useState("user");
   const {
      dashboardDataStore: { getUser },
   } = useStore();

   // hook form
   const { handleSubmit, reset } = useForm({
      mode: "onChange",
   });

   // user update
   const { mutate, isLoading } = useMutation(
      ["update_user"],
      async (data: IUpdateRole) => {
         await UserService.updateRole(getUser!.id, data);
      },
      {
         onSuccess: () => {
            queryClient.invalidateQueries();
            toastMessage("update");
            reset();
         },
         onError: () => {
            toastMessage("error");
            reset();
         },
      },
   );

   // user mutate
   const updatePost = async () => {
      mutate({
         role: role,
      });
   };

   return (
      <form className={style.update} onSubmit={handleSubmit(updatePost)}>
         <h2 className={style.update__title}>Изменить роль пользователя</h2>
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

         <div className={style.update__buttons}>
            <MyButton disabled={isLoading} type="submit">
               Изменить
            </MyButton>
            <MyButton onClick={() => setModalActive(false)}>Отмена</MyButton>
         </div>
      </form>
   );
});
